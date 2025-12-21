import type CartType from "../model/CartType";

export default class CartDao {
    static #cartKey = "cart-231";
    static #cartDefault:CartType = {items:[], price: 0};

    static save(cart:CartType) {
        window.localStorage.setItem(CartDao.#cartKey, JSON.stringify(cart));
    }

    static restoreSaved():CartType {
        const data = window.localStorage.getItem(CartDao.#cartKey);
        if(data) {
            try {
                return JSON.parse( data );
            }
            catch(err) {
                console.error("Cart restore error:", err);
            }
        }
        return CartDao.#cartDefault;
    }

    static calcPrices(cart:CartType) {
        let total = 0.0;
        for(let ci of cart.items) {
            // if(ci.product.isInDiscount...)
            ci.price = ci.product.price * ci.cnt;
            total += ci.price;
        }
        cart.price = total;
    }
}