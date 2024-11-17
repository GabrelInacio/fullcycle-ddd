export default class Product {
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(name: string, price: number) {
        this._id = Math.random().toString(36).substring(7);
        this._name = name;
        this._price = price;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    set id(id: string) {
        this._id = id;
    }

    changePrice(price: number){
        this._price = price;
        this.validate();
    }

    changeName(name: string){
        this._name = name;
        this.validate();
    }

    validate(): boolean{
        if(this._name.length === 0){
            throw new Error("Name is required");
        }

        if(this._price <= 0){
            throw new Error("Price must be greater than zero");
        }

        return true;
    }
}