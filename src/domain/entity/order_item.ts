export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(productId: string, name: string, price: number, quantity: number) {
        this._id = Math.random().toString(36).substring(7);
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this.validate();
    }

    validate(){
        if(this.quantity <= 0){
            throw new Error("Quantity must be greater than 0");
        }
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }


}