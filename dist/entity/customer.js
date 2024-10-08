"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(name) {
        this._active = true;
        this._rewardPoints = 0;
        this._id = Math.random().toString(36).substring(7);
        this._name = name;
        this._active = true;
        this.validate();
    }
    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this.id.length === 0) {
            throw new Error("Id is required");
        }
    }
    activate() {
        if (this._address === undefined) {
            throw new Error("Address is required");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    addRewardPoints(points) {
        this._rewardPoints += points;
    }
    changeName(name) {
        this._name = name;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get address() {
        return this._address;
    }
    get active() {
        return this._active;
    }
    get rewardPoints() {
        return this._rewardPoints;
    }
    set name(name) {
        this._name = name;
    }
    set address(address) {
        this._address = address;
    }
    set active(active) {
        this._active = active;
    }
}
exports.default = Customer;
