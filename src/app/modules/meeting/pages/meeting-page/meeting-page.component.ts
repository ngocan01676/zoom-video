import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'meeting-page',
  templateUrl: './meeting-page.component.html',
  styleUrls: ['./meeting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingPage {

}
