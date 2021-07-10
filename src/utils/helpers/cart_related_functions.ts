import { Product } from '../../models';

export const totalPrice = (arr: { product: Product; quantity: number }[]) =>
  arr.reduce(
    (acc, current) => acc + current.product.price * current.quantity,
    0
  );

export const getTotalAfterDiscount = (price: number, discount: number) => {
  if (!discount) {
    return price;
  }
  let discount_amount = (price * discount) / 100;
  return price - discount_amount;
};
