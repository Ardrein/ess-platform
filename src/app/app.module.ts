import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//=============================Modules=========================================================
import { CustomFormlyModule } from './modules/_custom-formly/custom-formly.module';

//==============================Components=======================================================
import { AppComponent } from './app.component';

//AdminLte
import { AppfooterComponent, AppheaderComponent, AppmenuComponent, AppsettingsComponent } from './components/adminLte/index';

//spreadsheet
import { SpreadsheetLoaderComponent } from './components/spreadsheet-loader/spreadsheet-loader.component';

//helpers
import { RepeatTypeComponent } from './components/_helperForms/index';

//==============================Services=======================================================
import { SpreadsheetService, AlertService, TypeService, ModelService, MathService, ValuationService } from './_services/index';

//==============================Directives=====================================================
import { AlertComponent, ConfirmationDialog } from './_directives/index';

//==============================Helpers========================================================
import { ErrorInterceptorProvider } from './_helpers/index';




/**
* Main module of the application
*/
@NgModule({
  declarations: [
    AppComponent,
    AppfooterComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppsettingsComponent,
    SpreadsheetLoaderComponent,
    AlertComponent,
    ConfirmationDialog,
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    CustomFormlyModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  entryComponents: [ConfirmationDialog]
  ,
  providers: [
    AlertService,
    SpreadsheetService,
    TypeService,
    ModelService,
    MathService,
    ValuationService,
    ErrorInterceptorProvider    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
