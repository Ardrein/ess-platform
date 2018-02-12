import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



//spreadsheet id for test
//1A9nVMHrNBGkR4DN4p3Tg6TU2lOUumCxUiEZIESbQQqU

@Injectable()
export class SpreadsheetsService {


  constructor(private http:Http) { 
  }

  private spreadsheetUrl = 'api/spreadsheet'; //ruta para el envio de datos
  private variables: Array<{name: string, label: string, type:string, value: string}> = [];              //lista de variables
  private indicatorsList:Array<Array<{name: string, label: string, type:string, formula: string}>> = [];      //lista de indicadores por cada hoja del documento


//Envio de la ID de la hoja de calculo a traves de una peticion http
  sendSpreadsheetId(body){
  	let data = JSON.stringify({'id': body});   //datos a ser enviados
  	let headers = new Headers({'Content-Type': 'application/json'});  //cabecera de la peticion
  	let options = new RequestOptions({headers:headers});

  	return this.http.post(this.spreadsheetUrl, data, options)
  					.map((res:Response)=>res.json())
            .catch((error:Response)=>{
              return Observable.throw(error.json() || error);
            });
  }

  //setter para @variables e @indicatorsList
  setIndicatorsModel(indicatorsModel){
    let firstIteration = true;
    this.indicatorsList = [];

    //recorrido del objeto
    Object.keys(indicatorsModel).forEach( key =>{
      if(firstIteration){
        this.variables = indicatorsModel[key];
        
        firstIteration = false;
      }else{
        this.indicatorsList.push(indicatorsModel[key]);
      }
    });
   
  }


  getVariables(){
    return this.variables;
  }

  getIndicatorsList(){
    return this.indicatorsList;
  }


}


