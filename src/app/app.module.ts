import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
  MdRippleModule,
  MdButtonModule,
  MdIconModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {DatePickerModule} from './../datepicker/datepicker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdRippleModule,
    MdButtonModule,
    MdIconModule,
    DatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
