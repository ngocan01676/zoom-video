import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MeetingLayoutComponent } from './components/meeting-layout/meeting-layout.component';
import { MeetingPage } from './pages/meeting-page/meeting-page.component';
import { JoinMeetingPage } from './pages/join-meeting-page/join-meeting-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MeetingViewModel } from './viewmodels/meeting.viewmodel';
import { TestViewModel } from './viewmodels/test.viewmodel';
import { IconToggleComponent } from 'src/app/shared/components/icon-toggle/icon-toggle.component';

const routes: Routes = [
	{
		path: '',
		component: MeetingLayoutComponent,
		children: [
			{
				path: 'join-meeting',
				component: JoinMeetingPage,
			},
			{
				path: 'meeting',
				component: MeetingPage,
			},
		],
	},
];
@NgModule({
	declarations: [MeetingLayoutComponent, MeetingPage, JoinMeetingPage, IconToggleComponent],
	imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MaterialModule],
	exports: [RouterModule],
	providers: [MeetingViewModel, TestViewModel],
})
export class MeetingModule {}
