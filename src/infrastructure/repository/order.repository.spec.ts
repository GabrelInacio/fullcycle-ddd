import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import CustomerModel from "../database/sequelize/model/customer.model";
import OrderItemModel from "../database/sequelize/model/order-item.model";
import ProductModel from "../database/sequelize/model/product.model";
import Customer from "../../domain/entity/customer";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderModel from "../database/sequelize/model/order.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true},
        });
        sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Customer 1");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);


        const productRepository = new ProductRepository();
        const product = new Product("product 1", 100);
        const productId = product.id;
        await productRepository.create(product);

        const orderItem = new OrderItem(productId, product.name, product.price, 2);
        const orderItemId = orderItem.id;
        const order = new Order(customerId, [orderItem]);
        const orderId = order.id;
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: orderId }, 
            include: ["items"] 
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: orderId,
            customer_id: customerId,
            total: order.total(),
            items: [
                {
                    id: orderItemId,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: orderId,
                    product_id: productId,
                },
            ],
        });
    });

    it("should update an order changing items", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Customer 1");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);


        const productRepository = new ProductRepository();
        const product = new Product("product 1", 100);
        const productId = product.id;
        await productRepository.create(product);

        const orderItem = new OrderItem(productId, product.name, product.price, 2);
        const orderItemId = orderItem.id;
        const order = new Order(customerId, [orderItem]);
        const orderId = order.id;
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const newOrderItems: OrderItem[] = [
            new OrderItem(productId, product.name, product.price, 3),
            new OrderItem(productId, product.name, product.price, 5),
        ];
        order.changeItems(newOrderItems);
        await orderRepository.update(order);

        const newOrder = await OrderModel.findOne({ 
            where: { id: orderId }, 
            include: ["items"] 
        });

        expect(newOrder?.toJSON()).toStrictEqual({
            id: orderId,
            customer_id: customerId,
            total: order.total(),
            items: [
                {
                    id: orderItemId,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: orderId,
                    product_id: productId,
                },
            ],
        });
    });

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Customer 1");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);


        const productRepository = new ProductRepository();
        const product = new Product("product 1", 100);
        const productId = product.id;
        await productRepository.create(product);

        const orderItem = new OrderItem(productId, product.name, product.price, 2);
        const order = new Order(customerId, [orderItem]);
        const orderId = order.id;
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(orderId);

        expect(order?.customerId).toEqual(foundOrder.customerId);
        expect(order?.items.length).toEqual(foundOrder.items.length);
        expect(order?.total()).toEqual(foundOrder.total());
    });

    it("should throw error when not found an order", async () => {
        const orderRepository = new OrderRepository();
        expect(async () => {
            await orderRepository.find("123456789");
        }).rejects.toThrow("Order not found");
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Customer 1");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("product 1", 100);
        const productId = product.id;
        await productRepository.create(product);

        const orderItem = new OrderItem(productId, product.name, product.price, 2);
        const orderItem2 = new OrderItem(productId, product.name, product.price, 3);
        const order1 = new Order(customerId, [orderItem]);
        const order2 = new Order(customerId, [orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);
        
        const foundOrders = await orderRepository.findAll();
        const orders = [order1, order2];
        expect(foundOrders.length).toBe(orders.length);
        expect(foundOrders[0].id).toBe(orders[0].id);
        expect(foundOrders[1].id).toBe(orders[1].id);
    });

    it("should delete order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Customer 1");
        const address = new Address("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("product 1", 100);
        const productId = product.id;
        await productRepository.create(product);

        const orderItem = new OrderItem(productId, product.name, product.price, 2);
        const order = new Order(customerId, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrdere = await orderRepository.find(order.id);
        expect(foundOrdere.id).toBe(order.id);

        orderRepository.delete(order.id);

        expect(async () => {
            await orderRepository.find(order.id);
        }).rejects.toThrow("Order not found");
    });
});