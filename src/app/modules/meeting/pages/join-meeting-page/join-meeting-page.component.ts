import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { reaction } from 'mobx';
import { MeetingViewModel } from '../../viewmodels/meeting.viewmodel';
import { TestViewModel } from '../../viewmodels/test.viewmodel';

@Component({
	selector: 'join-meeting-page',
	templateUrl: './join-meeting-page.component.html',
	styleUrls: ['./join-meeting-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinMeetingPage implements OnInit {
	isCreated: boolean = true;
	showPreview: boolean = false;

	constructor(public meetingViewModel: MeetingViewModel) {}

	ngOnInit(): void {
		reaction(
			() => this.meetingViewModel.isLoadingSuccess,
			(isLoadingSuccess) => {
				if (isLoadingSuccess) {
					Promise.resolve().then(() => {
						this.meetingViewModel.localVideo.start(this.meetingViewModel.PREVIEW_VIDEO_ELEMENT);
					});
				}
			}
		);
	}

	joinMeeting() {
		this.meetingViewModel.setup();
		this.showPreview = true;
		this.isCreated = false;
	}

	createNewMeeting() {
		this.meetingViewModel.setup();
		this.showPreview = true;
	}
}
