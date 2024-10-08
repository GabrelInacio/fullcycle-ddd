import Customer from "./entity/customer";
import Address from "./entity/address";
import OrderItem from "./entity/order_item";
import Order from "./entity/order";

let customer = new Customer("John");
const address = new Address("street", "city", 123, "12345");
customer.address = address;
customer.activate();
// Relacao agregado de ID

console.log(customer.address.toString());

// Objeto - Entidade
const item1 = new OrderItem("p1", "item1", 100, 1);
const item2 = new OrderItem("p1", "item2", 200, 1);
const order = new Order(customer.id, [item1, item2]);