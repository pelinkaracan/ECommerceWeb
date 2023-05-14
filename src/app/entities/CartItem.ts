import { Product } from "./Product";

/**
 * It keeps cart item model.It keeps product and quantity information
 */
export class CartItem {
    product: Product = new Product();
    quantity: number = 0;
}
