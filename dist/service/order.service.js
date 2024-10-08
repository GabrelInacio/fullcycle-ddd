"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../entity/order"));
const order_item_1 = __importDefault(require("../entity/order_item"));
class OrderService {
    static placeOrder(customer, items) {
        if (order_item_1.default.length === 0)
            throw new Error("Order must have at least one item");
        const order = new order_1.default(customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
    static getTotal(orders) {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }
}
exports.default = OrderService;
