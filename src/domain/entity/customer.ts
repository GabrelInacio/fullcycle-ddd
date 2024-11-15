import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(name: string) {
        this._id = Math.random().toString(36).substring(7);
        this._name = name;
        this._active = true;

        this.validate();
    }

    validate(){
        if(this._name.length === 0){
            throw new Error("Name is required");
        }
        if(this.id.length === 0){
            throw new Error("Id is required");
        }
    }

    activate() {
        if(this._address === undefined){
            throw new Error("Address is required");
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

    changeName(name: string){
        this._name = name;
    }



    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get active(): boolean {
        return this._active;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: Address){
        this._address = address;
    }

    set active(active: boolean) {
        this._active = active;
    }


}
