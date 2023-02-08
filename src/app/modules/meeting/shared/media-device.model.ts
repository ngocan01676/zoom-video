export interface IMediaDevice {
	label: string;
	deviceId: string;
}

export type AllDeviceName = 'mics' | 'speakers' | 'cameras';

export const PREVIEW_VIDEO_DIMS = {
	Width: 800,
	Height: 450,
};
