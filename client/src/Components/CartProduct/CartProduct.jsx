import './cartProduct.scss';
import { Delete } from "@material-ui/icons";
import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../App';
import axios from 'axios';

const CartProduct = (product) => {
    const { quantity, setQuantity, total, setTotal, products, setProducts } = useContext(CartContext);

    // Getting Current Item
    const item = product.product;

    const removePro = async (currItem) => {
        if (quantity === 1) {
            setProducts([]);
            const res = await axios.delete("https://luxuryhub.herokuapp.com/api/cart/clear");
        }
        else {
            setProducts(products.filter((product) => {
                if (product._id === currItem._id) {
                    return (product.color !== currItem.color || product.size !== currItem.size);
                }
            }));
        }
        setQuantity(quantity - 1);
        setTotal(total - currItem.price * currItem.quantity);
    }

    useEffect(() => {
        const postCart = async () => {
            const res = await axios.post("https://luxuryhub.herokuapp.com/api/cart/create", { products, quantity, total });
        }
        // console.log("calling Post Cart");
        // console.log(products);
        postCart();
    }, [products, quantity, total]);

    return (
        <>
            <div className="cartProduct">
                <div className="removeProduct">
                    <Delete className="icon" onClick={() => removePro(item)} />
                </div>
                <div className="productDetails">
                    <div className="productImg">
                        <NavLink to={`/product/${item._id}`}>
                            <img src={item.img} alt="" />
                        </NavLink>
                    </div>
                    <div className="details">
                        <span className="productName">
                            <b>Name</b>
                            <b> : </b>
                            {item.title}
                        </span>
                        <span className="productId">
                            <b>ID</b>
                            <b> : </b>
                            {item._id}
                        </span>
                        <span>
                            <b>Color </b>
                            <b> : </b>
                            <div className="productColor" style={{ backgroundColor: item.color }}>
                            </div>
                        </span>
                        <span className="productId">
                            <b>Size</b>
                            <b> : </b>
                            {item.size.toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="priceDetails">
                    <div className="productAmount subDetail">
                        <b>Quantity : </b>{item.quantity}
                    </div>
                    <div className="productPrice subDetail">
                        <b>Price : </b>${item.price}
                    </div>
                    <div className="itemCost subDetail">
                        <b>Total : </b>${item.quantity * item.price}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartProduct
