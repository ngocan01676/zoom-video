import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { ThemeModule } from './core/theme/theme.module';
import { lightTheme } from './core/theme/light-theme';
import { darkTheme } from './core/theme/dark-theme';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		CoreModule,
		SpinnerModule,
		ThemeModule.forRoot({
			themes: [lightTheme, darkTheme],
			active: 'light',
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
