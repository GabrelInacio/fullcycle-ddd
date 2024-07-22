class Customer {
    _id: string;
    _name: string;
    _address: string;

    constructor(name: string, address: string) {
        this._id = Math.random().toString(36).substring(7);
        this._name = name;
        this._address = address;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): string {
        return this._address;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: string) {
        this._address = address;
    }
}
