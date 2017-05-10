import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, trigger, transition, style, keyframes } from '@angular/animations';
import { CalendarService } from './calendar.service';
import { LANG_DE } from './lang-de';
var CalendarComponent = (function () {
    function CalendarComponent(calendarService) {
        this.dateChange = new EventEmitter();
        this.cancel = new EventEmitter();
        this.submit = new EventEmitter();
        this.today = new Date();
        this.calendarService = calendarService;
        this.dayNames = LANG_DE.weekDays;
        this.monthNames = LANG_DE.months;
    }
    Object.defineProperty(CalendarComponent.prototype, "date", {
        get: function () {
            return this.dateVal;
        },
        set: function (val) {
            this.dateVal = val;
            this.dateChange.emit(val);
            this.updateDate(val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    CalendarComponent.prototype.ngOnInit = function () {
        this.date = new Date();
    };
    CalendarComponent.prototype.updateDate = function (date) {
        this.currentMonthNumber = date.getMonth();
        this.currentMonth = this.monthNames[this.currentMonthNumber];
        this.currentYear = date.getFullYear();
        this.currentDay = date.getDate();
        this.currentDayOfWeek = this.dayNames[date.getDay()];
        this.updateDisplay(this.currentYear, this.currentMonthNumber);
    };
    CalendarComponent.prototype.updateDisplay = function (year, month) {
        var calendarArray = this.calendarService.monthDays(year, month);
        this.displayDays = [].concat.apply([], calendarArray);
        this.displayMonthNumber = month;
        this.displayMonth = this.monthNames[month];
        this.displayYear = year;
    };
    CalendarComponent.prototype.equalsDate = function (date1, date2) {
        try {
            return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
        }
        catch (error) {
            return false;
        }
    };
    CalendarComponent.prototype.getDayBackgroundColor = function (day) {
        if (this.equalsDate(day, this.date)) {
            return 'day-background-selected';
        }
        else {
            return 'day-background-normal';
        }
    };
    CalendarComponent.prototype.getDayForegroundColor = function (day) {
        if (this.equalsDate(day, this.date)) {
            return 'day-foreground-selected';
        }
        else if (this.equalsDate(day, this.today)) {
            return 'day-foreground-today';
        }
        else {
            return 'day-foreground-normal';
        }
    };
    CalendarComponent.prototype.onToday = function () {
        this.date = this.today;
    };
    CalendarComponent.prototype.onPrevMonth = function () {
        if (this.displayMonthNumber > 0) {
            this.updateDisplay(this.displayYear, this.displayMonthNumber - 1);
        }
        else {
            this.updateDisplay(this.displayYear - 1, 11);
        }
        this.triggerAnimation('left');
    };
    CalendarComponent.prototype.onNextMonth = function () {
        if (this.displayMonthNumber < 11) {
            this.updateDisplay(this.displayYear, this.displayMonthNumber + 1);
        }
        else {
            this.updateDisplay(this.displayYear + 1, 0);
        }
        this.triggerAnimation('right');
    };
    CalendarComponent.prototype.onSelectDate = function (date) {
        this.date = date;
    };
    CalendarComponent.prototype.onCancel = function () {
        this.cancel.emit();
    };
    CalendarComponent.prototype.onOk = function () {
        this.submit.emit(this.date);
    };
    CalendarComponent.prototype.triggerAnimation = function (direction) {
        var _this = this;
        this.animate = direction;
        setTimeout(function () { return _this.animate = 'reset'; }, 230);
    };
    return CalendarComponent;
}());
export { CalendarComponent };
CalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'md-calendar',
                templateUrl: './calendar.component.html',
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
            },] },
];
/** @nocollapse */
CalendarComponent.ctorParameters = function () { return [
    { type: CalendarService, },
]; };
CalendarComponent.propDecorators = {
    'dateChange': [{ type: Output },],
    'date': [{ type: Input },],
    'cancel': [{ type: Output },],
    'submit': [{ type: Output },],
};
