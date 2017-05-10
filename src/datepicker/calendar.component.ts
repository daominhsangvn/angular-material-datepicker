import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, trigger, transition, style, keyframes } from '@angular/animations';

import { CalendarService } from './calendar.service';
import { Month } from './month.model';
import { Weekday } from './weekday.model';
import { LANG_EN } from './lang-en';

@Component({
  selector: 'md-calendar',
  template: `
        <div class="header ng-material-datepicker">
            <div class="year">{{ currentYear }}</div>
            <div class="date">{{ currentDayOfWeek.short }}, {{ currentDay}}. {{ currentMonth.short }}</div>
        </div>
        <div class="nav ng-material-datepicker">
            <button md-icon-button class="left" (click)="onPrevMonth()">
                <md-icon>keyboard_arrow_left</md-icon>
            </button>
            <div class="title">
                <div [@calendarAnimation]="animate">{{ displayMonth.full }} {{ displayYear }}</div>
            </div>
            <button md-icon-button class="right" (click)="onNextMonth()">
                <md-icon>keyboard_arrow_right</md-icon>
            </button>
        </div>
        <div class="content ng-material-datepicker">
            <div class="labels">
                <div class="label" *ngFor="let day of dayNames">
                    {{ day.letter }}
                </div>
            </div>
            <div [@calendarAnimation]="animate" class="month">
                <div *ngFor="let day of displayDays" class="day" (click)="onSelectDate(day)" [ngClass]="getDayBackgroundColor(day)">
                    <span *ngIf="day != 0" [ngClass]="getDayForegroundColor(day)">
                        {{ day.getDate() }}
                      </span>
                </div>
            </div>
        </div>
        <div class="footer ng-material-datepicker">
            <a md-button (click)="onToday()">Today</a>
            <a md-button (click)="onCancel()">Cancel</a>
            <a md-button (click)="onOk()">Ok</a>
        </div>
  `,
  // styleUrls: ['./calendar.component.scss'],
  animations: [
    trigger('calendarAnimation', [
      transition('* => left', [
        animate('0.225s ease-in-out', keyframes([
          style({ transform: 'translateX(105%)', offset: 0.5 }),
          style({ transform: 'translateX(-130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 }),
        ]))
      ]),
      transition('* => right', [
        animate('0.225s ease-in-out', keyframes([
          style({ transform: 'translateX(-105%)', offset: 0.5 }),
          style({ transform: 'translateX(130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class CalendarComponent implements OnInit {

  private readonly calendarService: CalendarService;

  private dateVal: Date;

  @Output()
  dateChange = new EventEmitter<Date>();

  @Input()
  get date(): Date {
    return this.dateVal;
  };
  set date(val: Date) {
    this.dateVal = val;
    this.dateChange.emit(val);
    this.updateDate(val);
  }

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  submit = new EventEmitter<Date>();

  dayNames: Array<Weekday>;
  monthNames: Array<Month>;
  today: Date = new Date();

  currentMonth: Month;
  currentMonthNumber: number;
  currentYear: number;
  currentDay: number;
  currentDayOfWeek: Weekday;

  displayMonth: Month;
  displayMonthNumber: number;
  displayYear: number;
  displayDays: Array<number>;
  animate: string;

  constructor(calendarService: CalendarService) {
    this.calendarService = calendarService;
    this.dayNames = LANG_EN.weekDays;
    this.monthNames = LANG_EN.months;
  }

  ngOnInit() {
    this.date = new Date();
  }

  private updateDate(date: Date) {
    this.currentMonthNumber = date.getMonth();
    this.currentMonth = this.monthNames[this.currentMonthNumber];
    this.currentYear = date.getFullYear();
    this.currentDay = date.getDate();
    this.currentDayOfWeek = this.dayNames[date.getDay()];
    this.updateDisplay(this.currentYear, this.currentMonthNumber);
  }

  private updateDisplay(year: number, month: number) {
    const calendarArray = this.calendarService.monthDays(year, month);
    this.displayDays = [].concat.apply([], calendarArray);
    this.displayMonthNumber = month;
    this.displayMonth = this.monthNames[month];
    this.displayYear = year;
  }

  private equalsDate(date1: Date, date2: Date): boolean {
    try {
      return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    }
    catch (error) {
      return  false;
    }
  }

  getDayBackgroundColor(day: Date) {
    if (this.equalsDate(day, this.date)) {
      return 'day-background-selected';
    } else {
      return 'day-background-normal';
    }
  }

  getDayForegroundColor(day: Date) {
    if (this.equalsDate(day, this.date)) {
      return 'day-foreground-selected';
    } else if (this.equalsDate(day, this.today)) {
      return 'day-foreground-today';
    } else {
      return 'day-foreground-normal';
    }
  }

  onToday() {
    this.date = this.today;
  }

  onPrevMonth() {
    if (this.displayMonthNumber > 0) {
      this.updateDisplay(this.displayYear, this.displayMonthNumber - 1);
    } else {
      this.updateDisplay(this.displayYear - 1, 11);
    }
    this.triggerAnimation('left');
  }

  onNextMonth() {
    if (this.displayMonthNumber < 11) {
      this.updateDisplay(this.displayYear, this.displayMonthNumber + 1);
    } else {
      this.updateDisplay(this.displayYear + 1, 0);
    }
    this.triggerAnimation('right');
  }

  onSelectDate(date: Date) {
    this.date = date;
  }

  onCancel() {
    this.cancel.emit();
  }

  onOk() {
    this.submit.emit(this.date);
  }

  private triggerAnimation(direction: string): void {
    this.animate = direction;
    setTimeout(() => this.animate = 'reset', 230);
  }
}
