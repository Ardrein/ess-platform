import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import { SpreadsheetsService } from './spreadsheets.service';
import { VariablesComponent } from './variables/variables.component';
import { IndicatorsComponent } from './indicators/indicators.component';


@NgModule({
  declarations: [
    AppComponent,
    SpreadsheetComponent,
    VariablesComponent,
    IndicatorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [SpreadsheetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
