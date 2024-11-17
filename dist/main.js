"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./domain/entity/customer"));
const address_1 = __importDefault(require("./domain/entity/address"));
const order_item_1 = __importDefault(require("./domain/entity/order_item"));
const order_1 = __importDefault(require("./domain/entity/order"));
let customer = new customer_1.default("John");
const address = new address_1.default("street", "city", 123, "12345");
customer.address = address;
customer.activate();
// Relacao agregado de ID
console.log(customer.address.toString());
// Objeto - Entidade
const item1 = new order_item_1.default("p1", "item1", 100, 1);
const item2 = new order_item_1.default("p1", "item2", 200, 1);
const order = new order_1.default(customer.id, [item1, item2]);
