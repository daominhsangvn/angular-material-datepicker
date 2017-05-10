import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, trigger, transition, style, keyframes } from '@angular/animations';
import { CalendarService } from './calendar.service';
import { LANG_EN } from './lang-en';
var CalendarComponent = (function () {
    function CalendarComponent(calendarService) {
        this.dateChange = new EventEmitter();
        this.cancel = new EventEmitter();
        this.submit = new EventEmitter();
        this.today = new Date();
        this.calendarService = calendarService;
        this.dayNames = LANG_EN.weekDays;
        this.monthNames = LANG_EN.months;
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
                template: "\n        <div class=\"header ng-material-datepicker\">\n            <div class=\"year\">{{ currentYear }}</div>\n            <div class=\"date\">{{ currentDayOfWeek.short }}, {{ currentDay}}. {{ currentMonth.short }}</div>\n        </div>\n        <div class=\"nav ng-material-datepicker\">\n            <button md-icon-button class=\"left\" (click)=\"onPrevMonth()\">\n                <md-icon>keyboard_arrow_left</md-icon>\n            </button>\n            <div class=\"title\">\n                <div [@calendarAnimation]=\"animate\">{{ displayMonth.full }} {{ displayYear }}</div>\n            </div>\n            <button md-icon-button class=\"right\" (click)=\"onNextMonth()\">\n                <md-icon>keyboard_arrow_right</md-icon>\n            </button>\n        </div>\n        <div class=\"content ng-material-datepicker\">\n            <div class=\"labels\">\n                <div class=\"label\" *ngFor=\"let day of dayNames\">\n                    {{ day.letter }}\n                </div>\n            </div>\n            <div [@calendarAnimation]=\"animate\" class=\"month\">\n                <div *ngFor=\"let day of displayDays\" class=\"day\" (click)=\"onSelectDate(day)\" [ngClass]=\"getDayBackgroundColor(day)\">\n                    <span *ngIf=\"day != 0\" [ngClass]=\"getDayForegroundColor(day)\">\n                        {{ day.getDate() }}\n                      </span>\n                </div>\n            </div>\n        </div>\n        <div class=\"footer ng-material-datepicker\">\n            <a md-button (click)=\"onToday()\">Today</a>\n            <a md-button (click)=\"onCancel()\">Cancel</a>\n            <a md-button (click)=\"onOk()\">Ok</a>\n        </div>\n  ",
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
