import { Sequelize } from "sequelize-typescript";
import OrderModel from "../database/sequelize/model/customer.model";
import Order from "../../domain/entity/customer";
import OrderRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true},
        });
        sequelize.addModels([OrderModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new OrderRepository();
        const customer = new Order("Order 1");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);

        const customerModel = await OrderModel.findOne({where: { id: customerId} });

        if(customerModel === null)
            throw new Error("Order not found");

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
    });

    it("should update a custom,er", async () => {
        const customerRepository = new OrderRepository();
        const customer = new Order("customer 1");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);

        let customerModel = await OrderModel.findOne({where: { id: customerId} });

        if(customerModel === null)
            throw new Error("Order not found");

        customer.changeName("Order 2")
        await customerRepository.update(customer);
        const customerModel2 = await OrderModel.findOne({ where: { id: customerId }});

        expect(customerModel2?.toJSON()).toStrictEqual({
            id: customerId,
            name: customer.name,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zip,            
            city: address.city
        });
    });

    it("should find a customer", async() => {
        const customerRepository = new OrderRepository();
        const customer = new Order("Order 2");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);

        const foundOrder = await customerRepository.find(customerId);

        expect(customer?.name).toEqual(foundOrder.name);
        expect(customer?.address?.street).toEqual(foundOrder.address.street);
        expect(customer?.address?.number).toEqual(foundOrder.address.number);
        expect(customer?.address?.zip).toEqual(foundOrder.address.zip);
        expect(customer?.address?.city).toEqual(foundOrder.address.city);
        expect(customer?.active).toEqual(foundOrder.active);
        expect(customer?.rewardPoints).toEqual(foundOrder.rewardPoints);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new OrderRepository();

        expect(async () => {
            await customerRepository.find("123456789");
        }).rejects.toThrow("Order not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new OrderRepository();
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        const customer1 = new Order("Order 1");
        const customer2 = new Order("Order 2");
        const customer3 = new Order("Order 3");
        customer1.address = address;
        customer2.address = address;
        customer3.address = address;
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
        await customerRepository.create(customer3);

        const foundOrders = await customerRepository.findAll();
        const customers = [customer1, customer2, customer3];
        expect(customers.length).toBe(foundOrders.length);
    });
});