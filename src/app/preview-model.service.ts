import { Injectable } from '@angular/core';
import {Model} from './models/model';
import {MODELTEST} from './mockModel';

@Injectable()
export class PreviewModelService {

	private model:Model;
  private model2 = MODELTEST;

  constructor() { 
  	this.model = new Model([],[]);

    this.setTestModel();

  }

  setModel(modelToSet: Model):void{
  	this.model = modelToSet;
  }

  getModel():Model{
  	return this.model;
  }

  private setTestModel(){
    this.model.buildWithObject(this.model2);
  }

}
