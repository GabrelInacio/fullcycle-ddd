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
const product_model_1 = __importDefault(require("../database/sequelize/model/product.model"));
const product_1 = __importDefault(require("../../domain/entity/product"));
const product_repository_1 = __importDefault(require("./product.repository"));
describe("Product repository test", () => {
    let sequelize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([product_model_1.default]);
        yield sequelize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    it("should create a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("product 1", 100);
        const productId = product.id;
        yield productRepository.create(product);
        const productModel = yield product_model_1.default.findOne({ where: { id: productId } });
        if (productModel === null)
            throw new Error("Product not found");
        expect(productModel.toJSON()).toStrictEqual({
            "id": productId,
            "name": "product 1",
            "price": 100,
        });
    }));
    it("should update a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("product 1", 100);
        const productId = product.id;
        yield productRepository.create(product);
        let productModel = yield product_model_1.default.findOne({ where: { id: productId } });
        if (productModel === null)
            throw new Error("Product not found");
        product.changePrice(500);
        product.changeName("Produto 2");
        yield productRepository.update(product);
        const productModel2 = yield product_model_1.default.findOne({ where: { id: productId } });
        expect(productModel2 === null || productModel2 === void 0 ? void 0 : productModel2.toJSON()).toStrictEqual({
            "id": productId,
            "name": "Produto 2",
            "price": 500
        });
    }));
    it("should find a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("Product 2", 200);
        const productId = product.id;
        yield productRepository.create(product);
        const productModel = yield product_model_1.default.findOne({ where: { id: productId } });
        const foundProduct = yield productRepository.find(productId);
        expect(productModel === null || productModel === void 0 ? void 0 : productModel.name).toEqual(foundProduct.name);
        expect(productModel === null || productModel === void 0 ? void 0 : productModel.price).toEqual(foundProduct.price);
    }));
    it("should find all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product1 = new product_1.default("Product 1", 100);
        const product2 = new product_1.default("Product 2", 200);
        const product3 = new product_1.default("Product 3", 300);
        yield productRepository.create(product1);
        yield productRepository.create(product2);
        yield productRepository.create(product3);
        const foundProducts = yield productRepository.findAll();
        const products = [product1, product2, product3];
        expect(products.length).toBe(foundProducts.length);
    }));
});
