import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const cartAtom = atomWithStorage('cart', {});
const cartUpdateAtom = atom(
  null,
  (get, set, { productId, price, name }) => {
    const currentCart = get(cartAtom);
    const newCart = { ...currentCart };

    if (!newCart[productId]) {
      newCart[productId] = { quantity: 0, price, name };
    }
    newCart[productId].quantity += 1;

    localStorage.setItem('cart', JSON.stringify(newCart));

    set(cartAtom, newCart);
  }
);

export { cartAtom, cartUpdateAtom };
