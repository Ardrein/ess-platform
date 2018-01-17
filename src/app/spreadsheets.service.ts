import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class SpreadsheetsService {

  constructor(private http:Http) { }

  private spreadsheetUrl = 'api/spreadsheet';

//Envio de la ID de la hoja de calculo a traves de una peticion http
  sendSpreadsheetId(body){
  	let data = JSON.stringify({'id': body});   //datos a ser enviados
  	let headers = new Headers({'Content-Type': 'application/json'});  //cabecera de la peticion
  	let options = new RequestOptions({headers:headers});

  	return this.http.post(this.spreadsheetUrl, data, options)
  					.map((res:Response)=>res.json());
  }


}


