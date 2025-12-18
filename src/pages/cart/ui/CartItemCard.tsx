import { useContext } from "react";
import type CartItem from "../../../entities/ cart/model/CartItem";
import './CartItemCard.css';
import { AppContext } from "../../../features/app_context/AppContext";

export default function CartItemCard({ cartItem }: { cartItem: CartItem }) {
    const { cart, setCart } = useContext(AppContext);

    const incClick = () => {
        // задача: изменить количество заказа в {cartItem} и внести изменения 
        // в общую корзину через вызов {setCart}
        if(cartItem.product.stock && cartItem.product.stock <= cartItem.cnt)
        {
            return;
        }
        let newCart = { ...cart };
        let item = newCart.items.find(ci => ci.product.id == cartItem.product.id);
        if (item) {       
            item.cnt += 1;
            item.price = item.product.price * item.cnt;
            setCart(newCart);
        }
    };
    const decClick = () => {
        // Задача: реализовать ограничение: количество нельзя уменьшить до 0, а также 
        // увеличить свыше {stock} если оно указано
        if(cartItem.cnt <= 1)
        {
            return;
        }
        let newCart = { ...cart };
        let item = newCart.items.find(ci => ci.product.id == cartItem.product.id);
        if (item) { 
            item.cnt -= 1;
            item.price = item.product.price * item.cnt;
            setCart(newCart);
        }
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
        <div className="col col-1 text-end"><i className="bi bi-trash3"></i></div>
    </div>;
}