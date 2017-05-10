import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { CalendarComponent } from './calendar.component';
import { LANG_EN } from './lang-en';
var DatePickerComponent = (function () {
    function DatePickerComponent(dialog) {
        this.dateChange = new EventEmitter();
        this.dialog = dialog;
        this.dayNames = LANG_EN.weekDays;
        this.monthNames = LANG_EN.months;
    }
    Object.defineProperty(DatePickerComponent.prototype, "date", {
        get: function () {
            return this.dateVal;
        },
        set: function (val) {
            this.dateVal = val;
            this.dateChange.emit(val);
            this.formattedDate = this.formatDate(val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    DatePickerComponent.prototype.ngOnInit = function () {
        if (this.date === undefined) {
            this.date = new Date();
        }
    };
    DatePickerComponent.prototype.openDialog = function () {
        var _this = this;
        var ref = this.dialog.open(CalendarComponent);
        // Workaround to update style of dialog which sits outside of the component
        var containerDiv = ref._overlayRef._pane.children[0];
        containerDiv.style['padding'] = '0';
        ref.componentInstance.submit.subscribe(function (result) {
            _this.date = result;
            ref.close();
        });
        ref.componentInstance.cancel.subscribe(function (result) {
            ref.close();
        });
    };
    DatePickerComponent.prototype.formatDate = function (date) {
        if (date === undefined) {
            return;
        }
        var dayOfWeek = this.dayNames[date.getDay()].short;
        var dayOfMonth = date.getDate();
        var month = this.monthNames[date.getMonth()].short;
        var year = date.getFullYear();
        return dayOfWeek + ", " + dayOfMonth + ". " + month + " " + year;
    };
    return DatePickerComponent;
}());
export { DatePickerComponent };
DatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'md-datepicker',
                templateUrl: './datepicker.component.html'
            },] },
];
/** @nocollapse */
DatePickerComponent.ctorParameters = function () { return [
    { type: MdDialog, },
]; };
DatePickerComponent.propDecorators = {
    'dateChange': [{ type: Output },],
    'date': [{ type: Input },],
};
