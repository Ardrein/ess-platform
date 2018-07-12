import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquivalencyRoutingModule } from './equivalency-routing.module';
import { CustomFormlyModule } from '../_custom-formly/custom-formly.module';
import { ModelEquivalencyComponent } from '../../components/models/index';
import { VariableEquivalencyComponent } from '../../components/variables/index';
import { EquivalencyService } from '../../_services/index';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

/**
* Module for equivalency utilities.
*/
@NgModule({
	imports: [
	CommonModule,
	EquivalencyRoutingModule,
	CustomFormlyModule,
	],
	declarations: [
	ModelEquivalencyComponent,
	VariableEquivalencyComponent,
	],
	providers: [EquivalencyService]
})

export class EquivalencyModule {
}