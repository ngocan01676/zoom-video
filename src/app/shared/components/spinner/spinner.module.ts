import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MobxAngularModule } from 'mobx-angular';
import { SpinnerComponent } from './spinner.component';
@NgModule({
	declarations: [SpinnerComponent],
	imports: [CommonModule, MatProgressSpinnerModule, MobxAngularModule],
	exports: [SpinnerComponent],
})
export class SpinnerModule {}
