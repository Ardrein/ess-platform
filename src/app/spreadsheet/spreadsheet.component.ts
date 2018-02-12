import { Component, OnInit } from '@angular/core';
import {SpreadsheetsService} from '../spreadsheets.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {


	private spreadsheetId; //ID de la hoja de calculo  
  private postResponse;  //mensaje por parte del servidor recibido al enviar el id 


  constructor(private spreadsheetService: SpreadsheetsService, private router: Router) { }

  ngOnInit() {
    this.spreadsheetId = '';
    this.postResponse = '';
  }

//Envio del Id de la hoja de calculo a traves del servicio spreadsheets.service
// y ejecucion d elos metodos callback al enviar la peticion http
  sendId(){
  	this.spreadsheetService.sendSpreadsheetId(this.spreadsheetId).subscribe(
              data => {
                console.log(data);
                this.spreadsheetService.setIndicatorsModel(data.data);
                this.router.navigate(['/model']);
              },
              err => {
                console.log(err);
                this.postResponse = err.message;
              });
  }

}
