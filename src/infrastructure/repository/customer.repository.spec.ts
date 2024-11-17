import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true},
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Customer 1");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: { id: customerId} });

        if(customerModel === null)
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
    });

    it("should update a custom,er", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer 1");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);

        let customerModel = await CustomerModel.findOne({where: { id: customerId} });

        if(customerModel === null)
            throw new Error("Customer not found");

        customer.changeName("Customer 2")
        await customerRepository.update(customer);
        const customerModel2 = await CustomerModel.findOne({ where: { id: customerId }});

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
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Customer 2");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find(customerId);

        expect(customer?.name).toEqual(foundCustomer.name);
        expect(customer?.address?.street).toEqual(foundCustomer.address.street);
        expect(customer?.address?.number).toEqual(foundCustomer.address.number);
        expect(customer?.address?.zip).toEqual(foundCustomer.address.zip);
        expect(customer?.address?.city).toEqual(foundCustomer.address.city);
        expect(customer?.active).toEqual(foundCustomer.active);
        expect(customer?.rewardPoints).toEqual(foundCustomer.rewardPoints);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("123456789");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        const customer1 = new Customer("Customer 1");
        const customer2 = new Customer("Customer 2");
        const customer3 = new Customer("Customer 3");
        customer1.address = address;
        customer2.address = address;
        customer3.address = address;
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
        await customerRepository.create(customer3);

        const foundCustomers = await customerRepository.findAll();
        const customers = [customer1, customer2, customer3];
        expect(customers.length).toBe(foundCustomers.length);
    });
});