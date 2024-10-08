"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(name, price) {
        this._id = Math.random().toString(36).substring(7);
        this._name = name;
        this._price = price;
        this.validate();
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    changePrice(price) {
        this._price = price;
        this.validate();
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._price <= 0) {
            throw new Error("Price must be greater than zero");
        }
        return true;
    }
}
exports.default = Product;
