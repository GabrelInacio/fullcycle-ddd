"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderService {
    static getTotal(orders) {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }
}
exports.default = OrderService;
