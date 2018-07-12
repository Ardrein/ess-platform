import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { appConfig } from '../app.config';
import 'rxjs/add/operator/map';

/**
* Service used to load and fetch data from a public spreadsheet from the web.
*/
@Injectable()
export class SpreadsheetService {

	/**
	* @ignore
	*/
	constructor(private http: HttpClient) {}

	/**
	* Function used to send a request to the server to read an spreadsheet, based on an ID,
	* and fetch data from it.
	* @param {string} spreadsheetId The spreadsheet's ID.
	* @return An Observable which holds the data.
	*/
	loadSpreadsheet(spreadsheetId: string): Observable<any>{
		return this.http.get(appConfig.apiUrl + '/spreadsheet/' + spreadsheetId);
	}

}
