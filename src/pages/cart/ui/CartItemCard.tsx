import { useContext } from "react";
import type CartItem from "../../../entities/ cart/model/CartItem";
import './CartItemCard.css';
import { AppContext } from "../../../features/app_context/AppContext";
import CartDao from "../../../entities/ cart/api/CartDao";
import ButtonTypes from "../../../features/buttons/types/ButtonTypes";

export default function CartItemCard({ cartItem }: { cartItem: CartItem }) {
    const { cart, setCart, showModal } = useContext(AppContext);

    const incClick = () => {
        // задача: изменить количество заказа в {cartItem} и внести изменения
        // в общую корзину по вызову {setCart}
        if(cartItem.product.stock && cartItem.product.stock <= cartItem.cnt) {
            return;
        }
        let newCart = { ...cart };
        let item = newCart.items.find(ci => ci.product.id == cartItem.product.id);
        if (item) {       
            item.cnt += 1;
            CartDao.calcPrices(newCart);
            // item.price = item.product.price * item.cnt;
            // newCart.price = newCart.items.reduce((s,ci) => s + ci.price, 0.0);
            setCart(newCart);
        }
    };
    const decClick = () => {
        // задача: реализовать ограничение: количество не может быть уменьшено до 0, а также
        // увеличить свыше {stock} если оно указано
        if(cartItem.cnt <= 1) {
            return;
        }
        let newCart = { ...cart };
        let item = newCart.items.find(ci => ci.product.id == cartItem.product.id);
        if (item) { 
            item.cnt -= 1;
            CartDao.calcPrices(newCart);
            setCart(newCart);
        }
    };
    const removeClick = () => {
        showModal({
            title: "Необратимое действие",
            message: "После удаления восстановить позицию можно только по прайсу. Подтверждаете удаление?",
            buttons: [
                {title: "Да", callback: () => {
                    setCart({ ...cart,
                        items: cart.items.filter(ci => ci.product.id !== cartItem.product.id),
                        price: cart.price - cartItem.price
                    });
                }},
                {title: "Нет", type: ButtonTypes.White},
            ]
        });
    };

    return <div className="row m-3 p-2 cart-item-card">
        <div className="col col-2">
            <img
                src={cartItem.product.imageUrl}
                alt={cartItem.product.name}
                className="w-100" />
            <div className="text-center">
                <button className="btn btn-outline-secondary me-2" onClick={decClick}>-</button>
                {cartItem.cnt}
                <button className="btn btn-outline-secondary ms-2" onClick={incClick}>+</button>
            </div>
        </div>
        <div className="col col-6">
            <h3>{cartItem.product.name}</h3>
            <div>Гарантия 1 год от {Math.round(cartItem.price * 0.1).toMoney()} $</div>
            <div>Гарантия 2 года от {Math.round(cartItem.price * 0.15).toMoney()} $</div>
        </div>
        <div className="col col-3 text-center">
            <h4>{cartItem.price.toMoney()} $</h4>
            {cartItem.product.discount &&
                <div className="text-decoration-line-through">
                    {(cartItem.price + (cartItem.product.discount ?? 0) * cartItem.cnt).toMoney()} $
                </div>
            }
        </div>
        <div className="col col-1 text-end"><i className="bi bi-trash3" role="button" onClick={removeClick}></i></div>
    </div>;
}