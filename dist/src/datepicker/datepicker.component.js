import { Component, Output, Input, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// ngModel
var DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DatePickerComponent; }),
    multi: true
};
import { MdDialog } from '@angular/material';
import { CalendarComponent } from './calendar.component';
import { LANG_EN } from './lang-en';
var DatePickerComponent = (function () {
    function DatePickerComponent(dialog) {
        this.dateChange = new EventEmitter();
        // ngModel
        this._onValueTouched = function () {
        };
        this._onValueChange = function (_) {
        };
        this.dialog = dialog;
        this.dayNames = LANG_EN.weekDays;
        this.monthNames = LANG_EN.months;
    }
    Object.defineProperty(DatePickerComponent.prototype, "date", {
        get: function () {
            return this.dateVal;
        },
        set: function (val) {
            var _this = this;
            this.dateVal = val;
            // Update ngModel
            this._onValueChange(val);
            setTimeout(function () {
                // trigger dateChange event
                _this.dateChange.emit(val);
            });
            // format date
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
        if (!date) {
            return '';
        }
        var dayOfWeek = this.dayNames[date.getDay()].short;
        var dayOfMonth = date.getDate();
        var month = this.monthNames[date.getMonth()].short;
        var year = date.getFullYear();
        return dayOfWeek + ", " + dayOfMonth + ". " + month + " " + year;
    };
    Object.defineProperty(DatePickerComponent.prototype, "value", {
        // get accessor
        get: function () {
            console.log('get value');
            return this.date;
        },
        // set accessor including call the onchange callback
        set: function (v) {
            console.log('set value', v);
            this._onValueChange(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // From ControlValueAccessor interface
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this._onValueChange = fn;
    };
    // From ControlValueAccessor interface
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
        this._onValueTouched = fn;
    };
    // From ControlValueAccessor interface
    // ngModel change
    DatePickerComponent.prototype.writeValue = function (value) {
        this.date = value;
    };
    return DatePickerComponent;
}());
export { DatePickerComponent };
DatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'md-datepicker',
                template: "\n    <md-input-container>\n      <input mdInput (click)=\"openDialog()\" mdInput [value]=\"formattedDate\" (ngModelChange)=\"onChange($event)\">\n      <md-icon mdPrefix>date_range</md-icon>\n    </md-input-container>\n  ",
                exportAs: 'datePicker',
                providers: [DATE_PICKER_VALUE_ACCESSOR]
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
