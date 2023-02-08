import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MobxAngularModule } from 'mobx-angular';

@NgModule({
	declarations: [],
	imports: [],
	exports: [CommonModule, MobxAngularModule, FormsModule, ReactiveFormsModule, TranslateModule],
})
export class SharedModule {}
