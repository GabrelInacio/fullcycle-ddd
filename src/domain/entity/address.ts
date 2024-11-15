export default class Address {
    _street: string = "";
    _number: number = 0;
    _city: string = "";
    _zip: string = "";

    constructor(street: string, city: string, number: number, zip: string) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._zip = zip;

        this.validate();
    }

    validate(){
        if(this._street.length === 0){
            throw new Error("Street is empty");
        }
        if(this._city.length === 0){
            throw new Error("City is empty");
        }
        if(this._zip.length === 0){
            throw new Error("Zip is empty");
        }   
    }

    toString(){
        return `${this._street}, ${this._number}, ${this._city} ${this._zip}`;
    }
}