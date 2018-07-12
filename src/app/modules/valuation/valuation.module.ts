import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuationRoutingModule } from './valuation-routing.module';
import { CustomFormlyModule } from '../_custom-formly/custom-formly.module';

import { ModelValuationComponent } from '../../components/models/index';
import { VariableFormComponent } from '../../components/variables/index';
import { IndicatorViewComponent } from '../../components/indicators/index';
import { ValuationComponent, ValuationEquivalenciesComponent, ValuesComponent } from '../../components/valuation/index';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

/**
* Module for valuation utilities.
*/
@NgModule({
	imports: [
	CommonModule,
	ValuationRoutingModule,
	CustomFormlyModule,
	],
	declarations: [
	ModelValuationComponent,
	VariableFormComponent,
	ValuationComponent,
	IndicatorViewComponent,
	ValuationEquivalenciesComponent,
	ValuesComponent,
	],
	providers: []
})

export class ValuationModule {
}