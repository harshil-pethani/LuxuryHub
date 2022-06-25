import "./cart.scss";
import CartProduct from "../CartProduct/CartProduct";
import { NavLink } from 'react-router-dom'
import { useContext, useEffect } from "react";
import { CartContext } from "../../App";
import { useState } from "react";

const Cart = () => {
    const { products, quantity, total } = useContext(CartContext);

    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if (total >= 100) {
            setDiscount(5.90);
        } else {
            setDiscount(0);
        }
    }, [total]);

    return (
        <div className="cart">
            <h1 className="title">
                Your Cart ({quantity})
            </h1>
            <div className="bottom">
                <div className="info">
                    {
                        products.length !== 0
                            ?
                            products.map((product, index) => (
                                <CartProduct key={product._id + index} product={product} />
                            ))
                            :
                            <div className="emptyCart">
                                <p>
                                    Your Cart Is Empty
                                </p>
                            </div>
                    }
                </div>
                <div className="summary">
                    <h1 className="summaryTitle">
                        Order Summary
                    </h1>
                    <div className="summaryItem">
                        <span className="summaryItemText">
                            Subtotal
                        </span>
                        <span className="summaryItemPrice">
                            $ {total}
                        </span>
                    </div>
                    <div className="summaryItem">
                        <span className="summaryItemText">
                            Estimated Shipping
                        </span>
                        <span className="summaryItemPrice">
                            $ {total !== 0 ? 5.90 : 0}
                        </span>
                    </div>
                    <div className="summaryItem">
                        <span className="summaryItemText">
                            Shipping Discount
                        </span>
                        <span className="summaryItemPrice">
                            - ${discount}
                        </span>
                    </div>
                    <div className="summaryItem total">
                        <span className="summaryItemText">
                            Total
                        </span>
                        <span className="summaryItemPrice">
                            $ {total !== 0 ? total + 5.90 - discount : 0}
                        </span>
                    </div>
                    <NavLink to="/checkout">
                        <button disabled={(quantity > 0) ? false : true}>
                            Checkout Now
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Cart;