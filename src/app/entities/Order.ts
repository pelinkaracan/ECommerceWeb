
/**
 * It keeps Order model
 */
export class Order {

    id: number | null = null;
    orderDate: Date = new Date();
    userId: string = '';
    items: OrderDetail[] = [];
}


/**
 * It keeps Order detail model
 */
export class OrderDetail {
    id: number | null = null;
    productId: string = '';
    quantity: number = 0;
}
