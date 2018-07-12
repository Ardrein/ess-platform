import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptRoutingModule } from './concept-routing.module';
import { IndicatorConceptComponent } from '../../components/indicators/index';
import { VariableConceptComponent } from '../../components/variables/index';
import { ModelConceptComponent } from '../../components/models/index';
import { ConceptService } from '../../_services/index';
import { CustomFormlyModule } from '../_custom-formly/custom-formly.module';


/**
* Module for the conceptual model creation.
*/
@NgModule({
	imports: [
	CommonModule,
	ConceptRoutingModule,
	CustomFormlyModule
	],
	declarations: [
	VariableConceptComponent,
	IndicatorConceptComponent,
	ModelConceptComponent
	],
	providers: [ConceptService]
})

export class ConceptModule {
}
