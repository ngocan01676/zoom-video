import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { makeAutoObservable } from 'mobx';

@Injectable({
	providedIn: 'root',
})
export class SpinnerService {
	isHidden: boolean = true;
	color?: ThemePalette = 'accent';
	value?: number = 50;
	mode: ProgressSpinnerMode = 'indeterminate';
	constructor() {
		makeAutoObservable(this);
	}

	show(color?: ThemePalette, value?: number, mode: ProgressSpinnerMode = 'indeterminate') {
		this.color = color || this.color;
		this.value = value || this.value;
		this.mode = mode;
		this.isHidden = false;
	}

	hide() {
		this.isHidden = true;
	}
}
