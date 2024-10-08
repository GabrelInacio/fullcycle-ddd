"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../entity/customer"));
const order_1 = __importDefault(require("../entity/order"));
const order_item_1 = __importDefault(require("../entity/order_item"));
const order_service_1 = __importDefault(require("./order.service"));
describe("Order service unit tests", () => {
    it("should place an order", () => {
        const customer = new customer_1.default("John Doe");
        const item1 = new order_item_1.default("p1", "Item 1", 100, 2);
        const order = order_service_1.default.placeOrder(customer, [item1]);
        expect(customer.rewardPoints).toBe(100);
        expect(order.total()).toBe(200);
    });
    it("should get total of all orders", () => {
        const item1 = new order_item_1.default("ProductID1", "Item 1", 100, 2);
        const item2 = new order_item_1.default("ProductID2", "Item 2", 200, 2);
        const order = new order_1.default("1", [item1]);
        const order2 = new order_1.default("2", [item2]);
        const total = order_service_1.default.getTotal([order, order2]);
        expect(total).toBe(600);
    });
});
