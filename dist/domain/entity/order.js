"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(customerId, items) {
        this._items = [];
        this._total = 0;
        this._id = Math.random().toString(36).substring(7);
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    get id() {
        return this._id;
    }
    get customerId() {
        return this._customerId;
    }
    get items() {
        return this._items;
    }
    set id(id) {
        this._id = id;
    }
    validate() {
        if (this._customerId.length === 0) {
            throw new Error("Customer ID is required");
        }
        if (this._items.length === 0) {
            throw new Error("Items are required");
        }
        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity must be greater than 0");
        }
    }
    total() {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
    changeItems(OrderItems) {
        this._items = OrderItems;
        this.total();
    }
}
exports.default = Order;
