import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { MeetingViewModel } from '../../viewmodels/meeting.viewmodel';

@Component({
	selector: 'meeting-page',
	templateUrl: './meeting-page.component.html',
	styleUrls: ['./meeting-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingPage {
	constructor(public meetingViewMoel: MeetingViewModel, private themeService: ThemeService) {}
	changeTheme(isToggle: boolean) {
		const active = this.themeService.getActiveTheme();
		if (active.name === 'light') {
			this.themeService.setTheme('dark');
		} else {
			this.themeService.setTheme('light');
		}
	}
}
