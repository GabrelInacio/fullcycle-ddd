"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_model_1 = __importDefault(require("../database/sequelize/model/customer.model"));
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const customer_repository_1 = __importDefault(require("./customer.repository"));
const address_1 = __importDefault(require("../../domain/entity/address"));
describe("Customer repository test", () => {
    let sequelize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([customer_model_1.default]);
        yield sequelize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    it("should create a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("Customer 1");
        const address = new address_1.default("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        yield customerRepository.create(customer);
        const customerModel = yield customer_model_1.default.findOne({ where: { id: customerId } });
        if (customerModel === null)
            throw new Error("Customer not found");
        expect(customerModel.toJSON()).toStrictEqual({
            id: customerId,
            name: customer.name,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zip,
            city: address.city
        });
    }));
    it("should update a custom,er", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("customer 1");
        const address = new address_1.default("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        yield customerRepository.create(customer);
        let customerModel = yield customer_model_1.default.findOne({ where: { id: customerId } });
        if (customerModel === null)
            throw new Error("Customer not found");
        customer.changeName("Customer 2");
        yield customerRepository.update(customer);
        const customerModel2 = yield customer_model_1.default.findOne({ where: { id: customerId } });
        expect(customerModel2 === null || customerModel2 === void 0 ? void 0 : customerModel2.toJSON()).toStrictEqual({
            id: customerId,
            name: customer.name,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zip,
            city: address.city
        });
    }));
    it("should find a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("Customer 2");
        const address = new address_1.default("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        yield customerRepository.create(customer);
        const foundCustomer = yield customerRepository.find(customerId);
        expect(customer === null || customer === void 0 ? void 0 : customer.name).toEqual(foundCustomer.name);
        expect((_a = customer === null || customer === void 0 ? void 0 : customer.address) === null || _a === void 0 ? void 0 : _a.street).toEqual(foundCustomer.address.street);
        expect((_b = customer === null || customer === void 0 ? void 0 : customer.address) === null || _b === void 0 ? void 0 : _b.number).toEqual(foundCustomer.address.number);
        expect((_c = customer === null || customer === void 0 ? void 0 : customer.address) === null || _c === void 0 ? void 0 : _c.zip).toEqual(foundCustomer.address.zip);
        expect((_d = customer === null || customer === void 0 ? void 0 : customer.address) === null || _d === void 0 ? void 0 : _d.city).toEqual(foundCustomer.address.city);
        expect(customer === null || customer === void 0 ? void 0 : customer.active).toEqual(foundCustomer.active);
        expect(customer === null || customer === void 0 ? void 0 : customer.rewardPoints).toEqual(foundCustomer.rewardPoints);
    }));
    it("should throw an error when customer is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield customerRepository.find("123456789");
        })).rejects.toThrow("Customer not found");
    }));
    it("should find all customers", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const address = new address_1.default("Av. Paulista", "São Paulo", 100, "12345678");
        const customer1 = new customer_1.default("Customer 1");
        const customer2 = new customer_1.default("Customer 2");
        const customer3 = new customer_1.default("Customer 3");
        customer1.address = address;
        customer2.address = address;
        customer3.address = address;
        yield customerRepository.create(customer1);
        yield customerRepository.create(customer2);
        yield customerRepository.create(customer3);
        const foundCustomers = yield customerRepository.findAll();
        const customers = [customer1, customer2, customer3];
        expect(customers.length).toBe(foundCustomers.length);
    }));
});
