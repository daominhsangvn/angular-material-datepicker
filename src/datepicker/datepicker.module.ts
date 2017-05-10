import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { DatePickerComponent } from './datepicker.component';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';

@NgModule({
  declarations: [
    DatePickerComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot()
  ],
  exports: [
    DatePickerComponent
  ],
  providers: [
    CalendarService
  ],
  entryComponents: [
    CalendarComponent
  ]
})
export class DatePickerModule { }
