"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../entity/product"));
const product_service_1 = __importDefault(require("./product.service"));
describe('Product Service unit tests', () => {
    it('should change the prices of all products', () => {
        const product1 = new product_1.default('product1', 100);
        const product2 = new product_1.default('product2', 200);
        const product3 = new product_1.default('product3', 300);
        const products = [product1, product2, product3];
        product_service_1.default.increasePrices(products, 100);
        expect(product1.price).toBe(200);
        expect(product2.price).toBe(400);
        expect(product3.price).toBe(600);
    });
});
