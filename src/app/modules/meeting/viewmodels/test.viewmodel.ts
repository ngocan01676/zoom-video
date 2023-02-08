import { Injectable } from '@angular/core';
import { makeAutoObservable } from 'mobx';

@Injectable()
export class TestViewModel {
	isTest: boolean = false;
	constructor() {
		makeAutoObservable(this);
	}

	setTest() {
		setTimeout(() => {
			this.isTest = true;
		}, 2000);
	}
}
