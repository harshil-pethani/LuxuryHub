import { useState } from 'react';
import './checkoutForm.scss';
import { states } from '../../data';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const CheckoutForm = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState({});

    // Items of Context
    const { products, setProducts, quantity, setQuantity, total, setTotal } = useContext(CartContext);

    const handleOrder = (e) => {
        e.preventDefault();
        const postOrder = async () => {
            try {
                const createOrder = await axios.post("https://luxuryhub.herokuapp.com/api/order/create", { order, products, quantity, total });

                if (createOrder.data.success === true) {
                    const clearCart = await axios.delete("https://luxuryhub.herokuapp.com/api/cart/clear");
                    setProducts({});
                    setQuantity(0);
                    setTotal(0);
                    toast.success("Order placed Successfully", {
                        position: "top-center"
                    });
                    setTimeout(() => {
                        navigate("/");
                        window.location.reload();
                    }, 3000);
                } else {
                    toast.error(createOrder.data.message, {
                        position: "top-center"
                    })
                }
            } catch (e) {
                console.log(e);
                toast.error("Something went wrong", {
                    position: "top-center"
                })
            }
        }
        postOrder();
    }

    return (
        <div className="checkoutform">
            {
                (quantity > 0)
                    ?
                    <>
                        <h3>
                            Order Details
                        </h3>
                        <form action="">

                            <input type="text" placeholder="Full Name" onChange={(e) => { setOrder({ ...order, fullname: e.target.value }) }} />

                            <input type="text" placeholder="Mobile" pattern="[0-9]{10}" maxLength={10} minLength={10} onChange={(e) => { setOrder({ ...order, mobile: e.target.value }) }} />

                            <input type="text" placeholder="Alternate Mobile" pattern="[0-9]{10}" maxLength={10} minLength={10} onChange={(e) => { setOrder({ ...order, altermobile: e.target.value }) }} />


                            <input type="text" placeholder="Landmark" onChange={(e) => { setOrder({ ...order, landmark: e.target.value }) }} />

                            <input type="text" placeholder="City" onChange={(e) => { setOrder({ ...order, city: e.target.value }) }} />

                            <select name="state" id="" className="selectBox" onChange={(e) => { setOrder({ ...order, state: e.target.value }) }}>
                                <option defaultValue>
                                    State
                                </option>
                                {
                                    states.map((state) => {
                                        return (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            <select name="country" id="" className="selectBox" onChange={(e) => { setOrder({ ...order, country: e.target.value }) }}>
                                <option defaultValue>
                                    Country
                                </option>
                                <option value="india" className="country">
                                    India
                                </option>
                            </select>


                            <input type="text" pattern="[0-9]{6}" maxLength={6} minLength={6} placeholder="Pincode" onChange={(e) => { setOrder({ ...order, pincode: e.target.value }) }} />


                            <textarea name="address" placeholder="Full Address" onChange={(e) => { setOrder({ ...order, address: e.target.value }) }}>

                            </textarea>

                            <span className="agreement">
                                By Clicking Complete Order Button, You Can not Directly Change the Order Details You have to make Request for Changing Order Details
                            </span>
                            <button onClick={handleOrder}>
                                Complete Order
                            </button>
                        </form>
                    </>
                    :
                    <div className="emptyOrder">
                        <h3>
                            Please Add Products To the Cart
                        </h3>
                    </div>
            }
        </div>
    );
};

export default CheckoutForm;
