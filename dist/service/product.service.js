"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    static increasePrices(products, percentage) {
        products.forEach(product => {
            product.changePrice((product.price * percentage) / 100 + product.price);
        });
    }
}
exports.default = ProductService;
