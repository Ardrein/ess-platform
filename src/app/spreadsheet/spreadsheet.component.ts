import { Component, OnInit } from '@angular/core';
import {SpreadsheetsService} from '../spreadsheets.service';


@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {

//ID de la hoja de calculo
	spreadsheetId;
  postResponse;


  constructor(private spreadsheetService: SpreadsheetsService) { }

  ngOnInit() {
    this.spreadsheetId = '';
    this.postResponse = '';
  }

//Envio del Id de la hoja de calculo a traves del servicio spreadsheets.service
// y ejecucion d elos metodos callback al enviar la peticion http
  sendId(){
  	this.spreadsheetService.sendSpreadsheetId(this.spreadsheetId)
            .subscribe(
              data => {this.postResponse = data.message; console.log(data)},
              err => {this.postResponse = err.message; console.log(err)}
              );
  }

}
