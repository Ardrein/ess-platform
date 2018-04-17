import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {PreviewModelService} from '../preview-model.service';
import {Model} from '../models/model';



import { IndicatorNodeComponent } from '../indicator-node/indicator-node.component';
import { VariableNodeComponent } from '../variable-node/variable-node.component';

@Component({
	selector: 'app-preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.css'],
	providers:[]
})
export class PreviewComponent implements OnInit {

	private model:Model;
	

	constructor(private _previewModelService: PreviewModelService) { 	
		this.model = this._previewModelService.getModel();
		
	}

	ngOnInit() {
	}

	


}
