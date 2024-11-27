"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(productId, name, price, quantity) {
        this._id = Math.random().toString(36).substring(7);
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this.validate();
    }
    validate() {
        if (this.quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
    }
    orderItemTotal() {
        return this._price * this._quantity;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get quantity() {
        return this._quantity;
    }
    get productId() {
        return this._productId;
    }
}
exports.default = OrderItem;
