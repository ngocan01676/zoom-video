import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'meeting-layout',
	templateUrl: './meeting-layout.component.html',
	styleUrls: ['./meeting-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingLayoutComponent {}
