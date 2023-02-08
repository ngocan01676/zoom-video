export function getExploreName() {
	const { userAgent } = navigator;
	if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
		return 'Opera';
	}
	if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) {
		return 'IE';
	}
	if (userAgent.indexOf('Edge') > -1) {
		return 'Edge';
	}
	if (userAgent.indexOf('Firefox') > -1) {
		return 'Firefox';
	}
	if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
		return 'Safari';
	}
	if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
		return 'Chrome';
	}
	if (!!(window as any).ActiveXObject || 'ActiveXObject' in window) {
		return 'IE>=11';
	}
	return 'Unkonwn';
}

export function isSupportWebCodecs() {
	return typeof (window as any).MediaStreamTrackProcessor === 'function';
}
const isIPad = () => {
	return /MacIntel/i.test(navigator.platform) && navigator?.maxTouchPoints > 2;
};
export const isIOSMobile = () => {
	const { userAgent } = navigator;
	const isIOS = /iPad|iPhone|iPod/i.test(userAgent);
	return isIOS || isIPad();
};

export function isAndroidBrowser() {
	return /android/i.test(navigator.userAgent);
}
export function isAndroidOrIOSBrowser() {
	return isAndroidBrowser() || isIOSMobile();
}
export function isSupportOffscreenCanvas() {
	return typeof (window as any).OffscreenCanvas === 'function';
}
