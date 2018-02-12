import { Injectable } from '@angular/core';
import {Model} from './models/model';

@Injectable()
export class PreviewModelService {

	private model:Model;

  constructor() { 
  	this.model = new Model([],[]);
  }

  setModel(modelToSet: Model):void{
  	this.model = modelToSet;
  }

  getModel():Model{
  	return this.model;
  }

}
