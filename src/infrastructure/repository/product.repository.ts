import Product from "../../domain/entity/product";
import ProductRespositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../database/sequelize/model/product.model";

export default class ProductRepository implements ProductRespositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        });
    }
    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }
    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id: id } });

        if(productModel === null)
            throw new Error("Product not found");

        return new Product(productModel.name, productModel.price);
    }
    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map((productModel) =>
            new Product(productModel.name, productModel.price)
        );
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}