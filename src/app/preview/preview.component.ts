import { Component, OnInit } from '@angular/core';
import {PreviewModelService} from '../preview-model.service';
import {Model} from '../models/model';

@Component({
	selector: 'app-preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.css'],
	providers:[]
})
export class PreviewComponent implements OnInit {

	private model:Model;

	constructor(private _previewModelService: PreviewModelService) { 	
		this.model = _previewModelService.getModel();
		console.log(this.model);
	}

	ngOnInit() {
	}


}
