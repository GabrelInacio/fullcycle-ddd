import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("John Doe");
        const item1 = new OrderItem("p1", "Item 1", 100, 2);

        const order = OrderService.placeOrder(customer, [item1]);
        
        expect(customer.rewardPoints).toBe(100);
        expect(order.total()).toBe(200);
    });

    it("should get total of all orders", () => {
        const item1 = new OrderItem("ProductID1", "Item 1", 100, 2);
        const item2 = new OrderItem("ProductID2", "Item 2", 200, 2);
    
        const order = new Order("1", [item1]);
        const order2 = new Order("2", [item2]);

        const total = OrderService.getTotal([order, order2]);
        expect(total).toBe(600);
    });
});