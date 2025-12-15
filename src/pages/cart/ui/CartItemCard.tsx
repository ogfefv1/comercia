import type CartItem from "../../../entities/ cart/model/CartItem";
import './CartItemCard.css';

function toMoney(sum:number):string {
    return sum.toString().match(/.{1,3}/g)?.join(' ') ?? "";
}

export default function CartItemCard({cartItem}:{cartItem:CartItem}) {
    return <div className="row m-3 p-2 cart-item-card">
        <div className="col col-2">
            <img 
                src={cartItem.product.imageUrl} 
                alt={cartItem.product.name}
                className="w-100" />
            <div className="text-center">
                <button className="btn btn-outline-secondary me-2">-</button> 
                {cartItem.cnt}
                <button className="btn btn-outline-secondary ms-2">+</button>
            </div>
        </div>
        <div className="col col-6">
            <h3>{cartItem.product.name}</h3>
            <div>Гарантия 1 год от 2 549$</div>
            <div>Гарантия 2 год от 2 549$</div>
        </div>
        <div className="col col-3 text-center">
            <h4>{toMoney(cartItem.price)} $</h4>
            {cartItem.product.discount && 
                <div className="text-decoration-line-through">
                    {cartItem.price + (cartItem.product.discount ?? 0) * cartItem.cnt} $
                </div>        
            }
        </div>    
        <div className="col col-1 text-end"><i className="bi bi-trash3"></i></div>
    </div>;
}