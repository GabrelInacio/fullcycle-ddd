import { Sequelize } from "sequelize-typescript";
import ProductModel from "../database/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true},
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("product 1", 100);
        const productId = product.id;
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: { id: productId} });

        if(productModel === null)
            throw new Error("Product not found");

        expect(productModel.toJSON()).toStrictEqual({
            "id": productId,
            "name": "product 1",
            "price": 100,
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("product 1", 100);
        const productId = product.id;
        await productRepository.create(product);

        let productModel = await ProductModel.findOne({where: { id: productId} });

        if(productModel === null)
            throw new Error("Product not found");

        product.changePrice(500);
        product.changeName("Produto 2")
        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({ where: { id: productId }});

        expect(productModel2?.toJSON()).toStrictEqual({
            "id": productId,
            "name": "Produto 2",
            "price": 500
        });
    });

    it("should find a product", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("Product 2", 200);
        const productId = product.id;
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: productId } });
        const foundProduct = await productRepository.find(productId);

        expect(productModel?.name).toEqual(foundProduct.name);
        expect(productModel?.price).toEqual(foundProduct.price);
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("Product 1", 100);
        const product2 = new Product("Product 2", 200);
        const product3 = new Product("Product 3", 300);
        await productRepository.create(product1);
        await productRepository.create(product2);
        await productRepository.create(product3);

        const foundProducts = await productRepository.findAll();
        const products = [product1, product2, product3];
        expect(products.length).toBe(foundProducts.length);
    });
});