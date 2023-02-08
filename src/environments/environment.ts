// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { getExploreName } from 'src/app/helpers/platform.helper';
import { IEnv } from './environments.model';
export const environment: IEnv = {
	name: 'development',
	sdkKey: 'VHrkFHFc9cDxMSTMyQ3HOTIe0VXsKHrC3Bpa',
	sdkSecret: 'nFMHo3mih81dkOlkyUjI89TgDgtM8Fb4ezN8',
	webEndpoint: 'zoom.us',
	topic: '1234',
	roomName: `${getExploreName()}-${Math.floor(Math.random() * 1000)}`,
	password: '',
	signature: '',
	sessionKey: '',
	userIdentity: '',
	// role = 1 to join as host, 0 to join as attendee. The first user must join as host to start the session
	role: 1,
};
