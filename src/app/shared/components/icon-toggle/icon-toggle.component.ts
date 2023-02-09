import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'icon-toggle',
	templateUrl: './icon-toggle.component.html',
	styleUrls: ['./icon-toggle.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconToggleComponent implements OnInit {
	isToggle: boolean = false;
	_icon: string;
	_bg: string;
	@Input() icon: string;
	@Input() iconToggle: string;
	@Input() bg: string;
	@Input() bgToggle: string;
	@Output() toggle = new EventEmitter<boolean>();

	constructor() {}

	ngOnInit(): void {
		console.log(this.icon);
		this._bg = this.bg;
		this._icon = this.icon;
	}

	onClick() {
		this.isToggle = !this.isToggle;
		this._icon = this.isToggle ? this.iconToggle : this.icon;
		this._bg = this.isToggle ? this.bgToggle : this.bg;
		this.toggle.emit(this.isToggle);
	}
}
