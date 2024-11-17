"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("");
        }).toThrow("Name is required");
    });
    it("should change name", () => {
        let customer = new customer_1.default("Gabriel");
        customer.changeName("Gabriel Santos");
        expect(customer.name).toBe("Gabriel Santos");
    });
    it("should activate customer", () => {
        let customer = new customer_1.default("Gabriel");
        const address = new address_1.default("Street 1", "City 1", 1, "12345");
        customer.address = address;
        customer.activate();
        expect(customer.active).toBe(true);
    });
    it("should throw error when activate customer without address", () => {
        let customer = new customer_1.default("Gabriel");
        expect(() => {
            customer.activate();
        }).toThrow("Address is required");
    });
    it("should deactivate customer", () => {
        let customer = new customer_1.default("Gabriel");
        const address = new address_1.default("Street 1", "City 1", 1, "12345");
        customer.address = address;
        customer.activate();
        customer.deactivate();
        expect(customer.active).toBe(false);
    });
    it("should add reward points", () => {
        const customer = new customer_1.default("John Doe");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(110);
    });
});
