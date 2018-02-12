import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import { SpreadsheetsService } from './spreadsheets.service';
import { IndicatorsComponent } from './indicators/indicators.component';
import { VariablesComponent } from './variables/variables.component';
import { ModeloComponent } from './modelo/modelo.component';
import { IndicatorTabComponent } from './indicator-tab/indicator-tab.component';
import { PreviewComponent } from './preview/preview.component';
import { PreviewModelService } from './preview-model.service';



@NgModule({
  declarations: [
    AppComponent,
    SpreadsheetComponent,
    IndicatorsComponent,
    VariablesComponent,
    ModeloComponent,
    IndicatorTabComponent,
    PreviewComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [SpreadsheetsService, PreviewModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
