import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
	selector: 'spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
	constructor(public spinnerService: SpinnerService) {}
}
