import { Inject, Injectable } from '@angular/core';
import { makeAutoObservable } from 'mobx';
import { b64DecodeUnicode, generateVideoToken, mountDevices } from 'src/app/helpers/ultil.helper';
import { environment } from 'src/environments/environment';
import { AllDeviceName, IMediaDevice } from '../shared/media-device.model';
import ZoomVideo, { Stream, VideoClient } from '@zoom/videosdk';
import { DOCUMENT } from '@angular/common';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

declare global {
	interface Window {
		webEndpoint: string | undefined;
		zmClient: any | undefined;
		mediaStream: any | undefined;
		crossOriginIsolated: boolean;
		ltClient: any | undefined;
	}
}

@Injectable()
export class MeetingViewModel {
	isLoadingSuccess: boolean = false;
	activeMicrophone: boolean = true;
	activeSpeaker: boolean = true;
	activeCamera: boolean = true;
	micList: IMediaDevice[] = [];
	speakerList: IMediaDevice[] = [];
	cameraList: IMediaDevice[] = [];
	meetingArgs: any = Object.fromEntries(new URLSearchParams(location.search));
	zmClient: typeof VideoClient = ZoomVideo.createClient();
	mediaStream: typeof Stream;
	webEndpoint: any = null;

	selectedCamera: string;
	selectedMic: string;
	selectedSpeaker: string;

	localAudio = ZoomVideo.createLocalAudioTrack();
	localVideo = ZoomVideo.createLocalVideoTrack();

	PREVIEW_VIDEO_ELEMENT: HTMLVideoElement;

	constructor(@Inject(DOCUMENT) private document: Document, private spinnerService: SpinnerService) {
		makeAutoObservable(this);
	}

	defineParam() {
		// Add enforceGalleryView to turn on the gallery view without SharedAddayBuffer
		const devConfig = {
			...environment,
		};
		if (!this.meetingArgs.sdkKey || !this.meetingArgs.topic || !this.meetingArgs.name || !this.meetingArgs.signature) {
			this.meetingArgs = { ...devConfig, ...this.meetingArgs };
			this.meetingArgs.enforceGalleryView = true;
		}

		if (this.meetingArgs?.web) {
			if (this.meetingArgs?.topic) {
				try {
					this.meetingArgs.topic = b64DecodeUnicode(this.meetingArgs.topic);
				} catch (e: any) {
					throw new Error(e.toString());
				}
			} else {
				this.meetingArgs.topic = '';
			}

			if (this.meetingArgs?.name) {
				try {
					this.meetingArgs.name = b64DecodeUnicode(this.meetingArgs.name);
				} catch (e: any) {
					throw new Error(e.toString());
				}
			} else {
				this.meetingArgs.name = '';
			}

			if (this.meetingArgs.password) {
				try {
					this.meetingArgs.password = b64DecodeUnicode(this.meetingArgs.password);
				} catch (e: any) {
					throw new Error(e.toString());
				}
			} else {
				this.meetingArgs.password = '';
			}

			if (this.meetingArgs.sessionKey) {
				try {
					this.meetingArgs.sessionKey = b64DecodeUnicode(this.meetingArgs.sessionKey);
				} catch (e: any) {
					throw new Error(e.toString());
				}
			} else {
				this.meetingArgs.sessionKey = '';
			}

			if (this.meetingArgs.userIdentity) {
				try {
					this.meetingArgs.userIdentity = b64DecodeUnicode(this.meetingArgs.userIdentity);
				} catch (e: any) {
					throw new Error(e.toString());
				}
			} else {
				this.meetingArgs.userIdentity = '';
			}

			if (this.meetingArgs?.role) {
				this.meetingArgs.role = parseInt(this.meetingArgs.role, 10);
			} else {
				this.meetingArgs.role = 1;
			}
		}

		if (!this.meetingArgs?.cloud_recording_option) {
			this.meetingArgs.cloud_recording_option = '0';
		}
		if (!this.meetingArgs?.cloud_recording_election) {
			this.meetingArgs.cloud_recording_election = '';
		}

		if (!this.meetingArgs?.signature && this.meetingArgs?.sdkSecret && this.meetingArgs?.topic) {
			this.meetingArgs.signature = generateVideoToken(
				this.meetingArgs.sdkKey,
				this.meetingArgs.sdkSecret,
				this.meetingArgs.topic,
				this.meetingArgs.password,
				this.meetingArgs.sessionKey,
				this.meetingArgs.userIdentity,
				parseInt(this.meetingArgs.role, 10),
				this.meetingArgs.cloud_recording_option,
				this.meetingArgs.cloud_recording_election
			);
			console.log('=====================================');
			console.log('meetingArgs', JSON.stringify(this.meetingArgs));
			const urlArgs = {
				topic: this.meetingArgs.topic,
				name: this.meetingArgs.name,
				password: this.meetingArgs.password,
				sessionKey: this.meetingArgs.sessionKey,
				userIdentity: this.meetingArgs.userIdentity,
				role: this.meetingArgs.role || 1,
				cloud_recording_option: this.meetingArgs.cloud_recording_option,
				cloud_recording_election: this.meetingArgs.cloud_recording_election,
				web: '1',
			};
			console.log('use url args');
			console.log(window.location.origin + '/?' + new URLSearchParams(urlArgs).toString());
		}
	}

	*setup() {
		this.spinnerService.show();
		this.defineParam();
		const { sdkKey, topic, signature, name, password, webEndpoint: webEndpointArg, enforceGalleryView } = this.meetingArgs;
		const galleryViewWithoutSAB = Number(enforceGalleryView) === 1 && !window.crossOriginIsolated;
		if (webEndpointArg) {
			this.webEndpoint = webEndpointArg;
		} else {
			this.webEndpoint = window?.webEndpoint ?? 'zoom.us';
		}
		const params = {
			...this.webEndpoint,
			enforceMultipleVideos: galleryViewWithoutSAB,
			stayAwake: true,
		};
		//yield this.zmClient.init('en-US',`${window.location.origin}/lib`, params);
		yield this.zmClient.init('en-US', 'Global', params);
		yield this.zmClient.join(topic, signature, name, password).catch((e) => {
			console.log('z111111111111111111111', e);
		});
		this.mediaStream = this.zmClient.getMediaStream();
		const allDevice: Record<AllDeviceName, IMediaDevice[]> = yield mountDevices();
		this.cameraList = allDevice.cameras;
		this.selectedCamera = this.cameraList[0]?.deviceId;
		this.micList = allDevice.mics;
		this.selectedMic = this.micList[0]?.deviceId;
		this.speakerList = allDevice.speakers;
		this.selectedSpeaker = this.speakerList[0]?.deviceId;
		this.isLoadingSuccess = true;
		this.PREVIEW_VIDEO_ELEMENT = this.document.getElementById('js-preview-video') as HTMLVideoElement;
		console.log('this.PREVIEW_VIDEO_ELEMENT this.PREVIEW_VIDEO_ELEMENT ', this.PREVIEW_VIDEO_ELEMENT);
		this.spinnerService.hide();
	}

	toggleLocalVideo() {
		if (this.activeCamera) {
			this.localVideo?.stop();
		} else {
			this.localVideo?.start(this.PREVIEW_VIDEO_ELEMENT);
		}
		this.activeCamera = !this.activeCamera;
	}
}
