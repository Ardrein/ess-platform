import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { VariableComponent } from '../../components/variables/index';
import { IndicatorComponent } from '../../components/indicators/index';


import { FIELD_TYPE_COMPONENTS, CUSTOM_FORMLY_CONFIG } from '../../app.config';

/**
* Module for the custom formly configurations.
*/
@NgModule({
	imports: [
	CommonModule,
	ReactiveFormsModule,
	FormlyBootstrapModule,
	FormlyModule.forRoot(CUSTOM_FORMLY_CONFIG),
	MatStepperModule,
	NgxJsonViewerModule,
	MatTabsModule,
	],
	declarations: [
	VariableComponent,
	IndicatorComponent,
	FIELD_TYPE_COMPONENTS
	],
	exports: [
	ReactiveFormsModule,
	FormlyBootstrapModule,
	FormlyModule,
	MatStepperModule,
	NgxJsonViewerModule,
	MatTabsModule,
	VariableComponent,
	IndicatorComponent,
	]
})

export class CustomFormlyModule {
}