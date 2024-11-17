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
const address_1 = __importDefault(require("../../domain/entity/address"));
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const customer_model_1 = __importDefault(require("../database/sequelize/model/customer.model"));
class CustomerRepository {
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield customer_model_1.default.create({
                id: entity.id,
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zipCode: entity.address.zip,
                city: entity.address.city,
                active: entity.active,
                rewardPoints: entity.rewardPoints,
            });
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield customer_model_1.default.update({
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zipCode: entity.address.zip,
                city: entity.address.city,
                active: entity.active,
                rewardPoints: entity.rewardPoints,
            }, {
                where: {
                    id: entity.id
                }
            });
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let customerModel;
            try {
                customerModel = yield customer_model_1.default.findOne({
                    where: { id: id },
                    rejectOnEmpty: true
                });
            }
            catch (error) {
                throw new Error("Customer not found");
            }
            const customer = new customer_1.default(customerModel.name);
            const address = new address_1.default(customerModel.street, customerModel.city, customerModel.number, customerModel.zipCode);
            customer.address = address;
            return customer;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const customerModels = yield customer_model_1.default.findAll();
            const customers = customerModels.map((customerModel) => {
                let customer = new customer_1.default(customerModel.name);
                customer.addRewardPoints(customerModel.rewardPoints);
                const address = new address_1.default(customerModel.street, customerModel.city, customerModel.number, customerModel.zipCode);
                customer.address = address;
                if (customerModel.active)
                    customer.activate();
                return customer;
            });
            return customers;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
exports.default = CustomerRepository;
