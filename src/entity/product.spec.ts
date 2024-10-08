import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("", 100);
        }).toThrow("Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            let product = new Product("Product 1", 0);
        }).toThrow("Price must be greater than zero");
    });
    
    it("should change name", () => {
        let product = new Product("Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        let product = new Product("Product 1", 100);
        product.changePrice(400);
        expect(product.price).toBe(400);
    });
})