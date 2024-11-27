import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../database/sequelize/model/order-item.model";
import OrderModel from "../database/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        },
        {
            include: [{ model: OrderItemModel }],
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            { 
                where: { id: entity.id },
            }
        )
    }
    async find(id: string): Promise<Order> {
        let orderModel;
        try{
            orderModel = await OrderModel.findOne({
                where: { id: id }, 
                rejectOnEmpty: true,
                include: ["items"],
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        const orderItems = orderModel.items.map((orderItemModel) => {
            return new OrderItem(orderItemModel.product_id, orderItemModel.name, orderItemModel.price, orderItemModel.quantity);
        });
        let order = new Order(orderModel.customer_id, orderItems);
        order.id = orderModel.id;
        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ["items"] });

        const orders = orderModels.map((orderModel) => {
            const items = orderModel.items.map((orderItemModel) => {
                return new OrderItem(orderItemModel.product_id, orderItemModel.name, orderItemModel.price, orderItemModel.quantity);
            });
            let order = new Order(orderModel.customer_id, items);
            order.id = orderModel.id;
            return order;
        })

        return orders;
    }

    async delete(id: string): Promise<void> {
        await OrderModel.destroy({
            where: { id: id },
            cascade: true,
        });
    }
}