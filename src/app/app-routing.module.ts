import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	// { path: 'connection', pathMatch: 'full' },
	{
		path: '',
		redirectTo: '/join-meeting',
		pathMatch: 'full',
	},
	{
		path: '',
		loadChildren: () => import('./modules/meeting/meeting.module').then((m) => m.MeetingModule),
	},
	//{ path: '404', component: Error404Page },
	{ path: '**', redirectTo: '/' + '404' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
