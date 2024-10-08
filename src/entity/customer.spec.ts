import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("");
        }).toThrow("Name is required");
    });

    it("should change name", () => {    
        let customer = new Customer("Gabriel");
        customer.changeName("Gabriel Santos");
        expect(customer.name).toBe("Gabriel Santos");
    });

    it("should activate customer", () => {
        let customer = new Customer("Gabriel");
        const address = new Address("Street 1", "City 1", 1, "12345");
        customer.address = address;
        customer.activate();
        expect(customer.active).toBe(true);
    });

    it("should throw error when activate customer without address", () => {
        let customer = new Customer("Gabriel");
        expect(() => {
            customer.activate();
        }).toThrow("Address is required");
    });

    it("should deactivate customer", () => {
        let customer = new Customer("Gabriel");
        const address = new Address("Street 1", "City 1", 1, "12345");
        customer.address = address;
        customer.activate();
        customer.deactivate();
        expect(customer.active).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("John Doe");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(110);
    });
});