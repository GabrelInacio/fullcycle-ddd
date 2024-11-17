"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, city, number, zip) {
        this._street = "";
        this._number = 0;
        this._city = "";
        this._zip = "";
        this._street = street;
        this._number = number;
        this._city = city;
        this._zip = zip;
        this.validate();
    }
    get street() {
        return this._street;
    }
    get number() {
        return this._number;
    }
    get city() {
        return this._city;
    }
    get zip() {
        return this._zip;
    }
    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is empty");
        }
        if (this._city.length === 0) {
            throw new Error("City is empty");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip is empty");
        }
    }
    toString() {
        return `${this._street}, ${this._number}, ${this._city} ${this._zip}`;
    }
}
exports.default = Address;
