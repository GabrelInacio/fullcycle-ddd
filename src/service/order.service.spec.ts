import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should get total of all orders", () => {
        const item1 = new OrderItem("ProductID1", "Item 1", 100, 2);
        const item2 = new OrderItem("ProductID2", "Item 2", 200, 2);
    
        const order = new Order("1", [item1]);
        const order2 = new Order("2", [item2]);

        const total = OrderService.getTotal([order, order2]);
        expect(total).toBe(600);
    });
});