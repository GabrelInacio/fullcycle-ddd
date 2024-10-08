import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number = 0;

    constructor(customerId: string, items: OrderItem[]) {
        this._id = Math.random().toString(36).substring(7);
        this._customerId = customerId;
        this._items = items;
        this._total = this.total()
        this.validate();
    }

    validate(){
        if(this._customerId.length === 0){
            throw new Error("Customer ID is required");
        }

        if(this._items.length === 0){
            throw new Error("Items are required");
        }

        if(this._items.some(item => item.quantity <= 0)){
            throw new Error("Quantity must be greater than 0");
        }
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}