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
const address_1 = __importDefault(require("../../domain/entity/address"));
const customer_model_1 = __importDefault(require("../database/sequelize/model/customer.model"));
const order_item_model_1 = __importDefault(require("../database/sequelize/model/order-item.model"));
const product_model_1 = __importDefault(require("../database/sequelize/model/product.model"));
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const product_repository_1 = __importDefault(require("./product.repository"));
const product_1 = __importDefault(require("../../domain/entity/product"));
const order_item_1 = __importDefault(require("../../domain/entity/order_item"));
const order_1 = __importDefault(require("../../domain/entity/order"));
const order_model_1 = __importDefault(require("../database/sequelize/model/order.model"));
const customer_repository_1 = __importDefault(require("./customer.repository"));
const order_repository_1 = __importDefault(require("./order.repository"));
describe("Order repository test", () => {
    let sequelize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([order_model_1.default, customer_model_1.default, order_item_model_1.default, product_model_1.default]);
        yield sequelize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    it("should create a new order", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("Customer 1");
        const address = new address_1.default("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("product 1", 100);
        const productId = product.id;
        yield productRepository.create(product);
        const orderItem = new order_item_1.default(productId, product.name, product.price, 2);
        const orderItemId = orderItem.id;
        const order = new order_1.default(customerId, [orderItem]);
        const orderId = order.id;
        const orderRepository = new order_repository_1.default();
        yield orderRepository.create(order);
        const orderModel = yield order_model_1.default.findOne({
            where: { id: orderId },
            include: ["items"]
        });
        expect(orderModel === null || orderModel === void 0 ? void 0 : orderModel.toJSON()).toStrictEqual({
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
    }));
    it("should update an order changing items", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("Customer 1");
        const address = new address_1.default("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("product 1", 100);
        const productId = product.id;
        yield productRepository.create(product);
        const orderItem = new order_item_1.default(productId, product.name, product.price, 2);
        const orderItemId = orderItem.id;
        const order = new order_1.default(customerId, [orderItem]);
        const orderId = order.id;
        const orderRepository = new order_repository_1.default();
        yield orderRepository.create(order);
        const newOrderItems = [
            new order_item_1.default(productId, product.name, product.price, 3),
            new order_item_1.default(productId, product.name, product.price, 5),
        ];
        order.changeItems(newOrderItems);
        yield orderRepository.update(order);
        const newOrder = yield order_model_1.default.findOne({
            where: { id: orderId },
            include: ["items"]
        });
        expect(newOrder === null || newOrder === void 0 ? void 0 : newOrder.toJSON()).toStrictEqual({
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
    }));
    it("should find an order", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("Customer 1");
        const address = new address_1.default("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("product 1", 100);
        const productId = product.id;
        yield productRepository.create(product);
        const orderItem = new order_item_1.default(productId, product.name, product.price, 2);
        const order = new order_1.default(customerId, [orderItem]);
        const orderId = order.id;
        const orderRepository = new order_repository_1.default();
        yield orderRepository.create(order);
        const foundOrder = yield orderRepository.find(orderId);
        expect(order === null || order === void 0 ? void 0 : order.customerId).toEqual(foundOrder.customerId);
        expect(order === null || order === void 0 ? void 0 : order.items.length).toEqual(foundOrder.items.length);
        expect(order === null || order === void 0 ? void 0 : order.total()).toEqual(foundOrder.total());
    }));
    it("should throw error when not found an order", () => __awaiter(void 0, void 0, void 0, function* () {
        const orderRepository = new order_repository_1.default();
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield orderRepository.find("123456789");
        })).rejects.toThrow("Order not found");
    }));
    it("should find all orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("Customer 1");
        const address = new address_1.default("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("product 1", 100);
        const productId = product.id;
        yield productRepository.create(product);
        const orderItem = new order_item_1.default(productId, product.name, product.price, 2);
        const orderItem2 = new order_item_1.default(productId, product.name, product.price, 3);
        const order1 = new order_1.default(customerId, [orderItem]);
        const order2 = new order_1.default(customerId, [orderItem2]);
        const orderRepository = new order_repository_1.default();
        yield orderRepository.create(order1);
        yield orderRepository.create(order2);
        const foundOrders = yield orderRepository.findAll();
        const orders = [order1, order2];
        expect(foundOrders.length).toBe(orders.length);
        expect(foundOrders[0].id).toBe(orders[0].id);
        expect(foundOrders[1].id).toBe(orders[1].id);
    }));
    it("should delete order", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("Customer 1");
        const address = new address_1.default("Av. Paulista", "São Paulo", 100, "12345678");
        customer.address = address;
        const customerId = customer.id;
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("product 1", 100);
        const productId = product.id;
        yield productRepository.create(product);
        const orderItem = new order_item_1.default(productId, product.name, product.price, 2);
        const order = new order_1.default(customerId, [orderItem]);
        const orderRepository = new order_repository_1.default();
        yield orderRepository.create(order);
        const foundOrdere = yield orderRepository.find(order.id);
        expect(foundOrdere.id).toBe(order.id);
        orderRepository.delete(order.id);
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield orderRepository.find(order.id);
        })).rejects.toThrow("Order not found");
    }));
});
