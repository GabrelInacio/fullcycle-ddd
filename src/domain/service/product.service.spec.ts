import Product from "../entity/product";
import ProductService from "./product.service";

describe('Product Service unit tests', () => {

    it('should change the prices of all products', () => {
        const product1 = new Product('product1', 100);
        const product2 = new Product('product2', 200);
        const product3 = new Product('product3', 300);
        const products = [product1, product2, product3];
        
        ProductService.increasePrices(products, 100);

        expect(product1.price).toBe(200);
        expect(product2.price).toBe(400);
        expect(product3.price).toBe(600);
    });
})