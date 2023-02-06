import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'join-meeting-page',
  templateUrl: './join-meeting-page.component.html',
  styleUrls: ['./join-meeting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinMeetingPage {

  isCreated: boolean = true;
  showPreview: boolean = false;

  constructor() {}
  
  joinMeeting() {
    this.showPreview = true;
    this.isCreated = false;
  }

  createNewMeeting() {
    this.showPreview = true;
  }
}
