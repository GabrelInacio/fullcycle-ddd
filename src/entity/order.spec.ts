import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("", []);
        }).toThrow("Customer ID is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", []);
        }).toThrow("Items are required");
    });

    it("should calculate total", () => {
        const item = new OrderItem("ProductID1", "Item 1", 100, 2);
        const item2 = new OrderItem("ProductID2", "Item 2", 200, 2)
        const order = new Order("1", [item]);

        let total = order.total();

        expect(total).toBe(200);

        const order2 = new Order("1", [item, item2]);
        total = order2.total();

        expect(total).toBe(600);
    });

    it("should throw error if the item quantity is greater than 0", () => {


        expect(() => {
            const item = new OrderItem("ProductID1", "Item 1", 100, -1);
            const order = new Order("1", [item]);
        }).toThrow("Quantity must be greater than 0");
    });

});