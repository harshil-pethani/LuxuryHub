import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { states } from '../../data';
import './singleOrderDetail.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SingleOrderDetail = () => {
    const [order, setOrder] = useState({});
    const [updateOrder, setUpdateOrder] = useState({});

    // Getting Order Id from Params
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];

    const navigate = useNavigate();

    useEffect(() => {
        const getOrderData = async () => {
            try {
                const orderData = await axios.get(`https://luxuryhub.herokuapp.com/api/order/find/${orderId}`);
                setOrder(orderData.data);
                setUpdateOrder(orderData.data.order);
            } catch (e) {
                console.log(e);
            }
        }
        getOrderData();
    }, [orderId]);

    const handleCancelOrder = async (e) => {
        e.preventDefault();
        try {
            if (order.status === "out for delivery" || order.status === "delivered") {
                toast.error(`Your Order is ${order.status} So You Cannot Cancel the Order.`, {
                    position: "top-center"
                })
            } else {
                await axios.delete(`https://luxuryhub.herokuapp.com/api/order/cancel/${orderId}`);
                toast.success("Cancelling This Order", {
                    position: "top-center"
                })
                setTimeout(() => {
                    navigate("/orders");
                }, 3000);
            }
        } catch (e) {
            console.log(e);
            toast.error("Order Cancellation Failed", {
                position: "top-center"
            })
        }
    }

    const handleUpdateOrder = async (e) => {
        e.preventDefault();
        try {
            const updateOrderData = await axios.put(`https://luxuryhub.herokuapp.com/api/order/update/${orderId}`, updateOrder);
            if (updateOrderData.status === 200) {
                setOrder(updateOrderData.data);
                setUpdateOrder(updateOrderData.data.order);
                toast.success(updateOrderData.data.message, {
                    position: "top-center"
                })
            }
            if (updateOrderData.status === 201) {
                toast.error(updateOrderData.data.message, {
                    position: "top-center"
                })
            }
        } catch (e) {
            toast.error("Delivery Details Updation Failed", {
                position: "top-center"
            })
            console.log(e);
        }
    }

    return (
        <div className="singleOrderDetail">
            {
                order._id
                    ?
                    <>
                        <div className="titleContainer">
                            <h1 className="title">
                                Your Order :
                            </h1>
                            <button onClick={handleCancelOrder} style={{ display: (order.status === "delivered") && "none" }}>
                                Cancel Order
                            </button>
                        </div>
                        <div className="orderDateDelivery">
                            <div className="orderDetails">
                                <span className="orderId">
                                    <b>ID</b>
                                    <b> : </b>
                                    {order._id}
                                </span>
                                <span className="productName">
                                    <b>Order Status</b>
                                    <b> : </b>
                                    {order.status}
                                </span>
                                <span>
                                    <b>Order Amount </b>
                                    <b> : </b>
                                    <div className="orderAmount" >
                                        $ {order.total}
                                    </div>
                                </span>
                                <span className="productId">
                                    <b>No. of Products</b>
                                    <b> : </b>
                                    {order.quantity}
                                </span>
                                <span className="orderDate">
                                    <b>Order Date</b>
                                    <b> : </b>
                                    {
                                        order.orderDate
                                    }
                                </span>
                                <span className="deliveryDate">
                                    <b>Expected Delivery</b>
                                    <b> : </b>
                                    {
                                        order.expectedDelivery
                                    }
                                </span>
                            </div>
                            <div className="orderDelivery">
                                <div className="deliverydetails">
                                    <span className="orderDate">
                                        <b>Order Date</b>
                                        <b> : </b>
                                        {
                                            order.orderDate
                                        }
                                    </span>
                                    <span className="deliveryDate">
                                        <b>Expected Delivery</b>
                                        <b> : </b>
                                        {
                                            order.expectedDelivery
                                        }
                                    </span>
                                </div>
                                <div className="wrapper">
                                    <div className="dot one" style={{ backgroundColor: "teal" }}>
                                        1
                                    </div>

                                    <div className="dot two" style={{ backgroundColor: (order.status === "shipped" || order.status === "out for delivery" || order.status === "delivered") ? "teal" : "black" }}>
                                        2
                                    </div>

                                    <div className="dot three" style={{ backgroundColor: (order.status === "out for delivery" || order.status === "delivered") ? "teal" : "black" }}>
                                        3
                                    </div>

                                    <div className="dot four" style={{ backgroundColor: (order.status === "delivered") ? "teal" : "black" }}>
                                        4
                                    </div>

                                    <div className="progress-bar first" style={{ backgroundColor: (order.status === "shipped" || order.status === "out for delivery" || order.status === "delivered") ? "teal" : "black" }}>
                                    </div>

                                    <div className="progress-bar second" style={{ backgroundColor: (order.status === "out for delivery" || order.status === "delivered") ? "teal" : "black" }}>
                                    </div>

                                    <div className="progress-bar third" style={{ backgroundColor: (order.status === "delivered") ? "teal" : "black" }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="subTitle">
                            Ordered Products :
                        </h1>
                        <div className="orderedProducts">
                            {
                                order.products && (
                                    order.products.map((product, index) => (
                                        <div key={product._id + index} className="orderedProduct">
                                            <div className="productImg">
                                                <NavLink to={`/product/${product._id}`}>
                                                    <img src={product.img} alt="" />
                                                </NavLink>
                                            </div>
                                            <div className="productDetails">
                                                <span className="productName">
                                                    <b>Product Name</b>
                                                    <b> : </b>
                                                    {product.title}
                                                </span>
                                                <span className="productId">
                                                    <b>Product ID</b>
                                                    <b> : </b>
                                                    {product._id}
                                                </span>
                                                <span>
                                                    <b>Color </b>
                                                    <b> : </b>
                                                    <div className="productColor" style={{ backgroundColor: product.color }}>
                                                    </div>
                                                </span>
                                                <span className="productId">
                                                    <b>Product Size</b>
                                                    <b> : </b>
                                                    {product.size.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="priceDetails">
                                                <div className="productAmount subDetail">
                                                    <b>Quantity : </b>{product.quantity}
                                                </div>
                                                <div className="productPrice subDetail">
                                                    <b>Price : </b>${product.price}
                                                </div>
                                                <div className="itemCost subDetail">
                                                    <b>Total : </b>${product.quantity * product.price}
                                                </div>
                                            </div>
                                        </div>
                                    )))
                            }
                        </div>
                        <h1 className="subTitle">
                            Delivery Details :
                        </h1>
                        <div className="deliveryDetails">
                            {
                                (updateOrder !== undefined) &&
                                <form action="">
                                    <input type="text" value={updateOrder.fullname || ""} placeholder="Full Name" onChange={(e) => { setUpdateOrder({ ...updateOrder, fullname: e.target.value }) }} />

                                    <input type="text" value={updateOrder.mobile || ""} placeholder="Mobile" pattern="[0-9]{10}" maxLength={10} minLength={10} onChange={(e) => { setUpdateOrder({ ...updateOrder, mobile: e.target.value }) }} />

                                    <input type="text" value={updateOrder.altermobile || ""} placeholder="Alternate Mobile" pattern="[0-9]{10}" maxLength={10} minLength={10} onChange={(e) => { setUpdateOrder({ ...updateOrder, altermobile: e.target.value }) }} />


                                    <input type="text" value={updateOrder.landmark || ""} placeholder="Landmark" onChange={(e) => { setUpdateOrder({ ...updateOrder, landmark: e.target.value }) }} />

                                    <input type="text" value={updateOrder.city || ""} placeholder="City" onChange={(e) => { setUpdateOrder({ ...updateOrder, city: e.target.value }) }} />

                                    <select name="state" value={updateOrder.state || ""} id="" className="selectBox" onChange={(e) => { setUpdateOrder({ ...updateOrder, state: e.target.value }) }}>
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

                                    <select name="country" value={updateOrder.country || ""} id="" className="selectBox" onChange={(e) => { setUpdateOrder({ ...updateOrder, country: e.target.value }) }}>
                                        <option defaultValue>
                                            Country
                                        </option>
                                        <option value="india" className="country">
                                            India
                                        </option>
                                    </select>


                                    <input type="text" value={updateOrder.pincode || ""} pattern="[0-9]{6}" maxLength={6} minLength={6} placeholder="Pincode" onChange={(e) => { setUpdateOrder({ ...updateOrder, pincode: e.target.value }) }} />


                                    <textarea name="address" value={updateOrder.address || ""} placeholder="Full Address" onChange={(e) => { setUpdateOrder({ ...updateOrder, address: e.target.value }) }} />
                                    <br />
                                    {
                                        (order.status === "out for delivery" || order.status === "delivered")
                                            ?
                                            <span className="instruction" style={{ color: "red" }}>
                                                {`Your Order is ${order.status} So You Cannot Change the Delivery Details.`}
                                            </span>
                                            :
                                            <span className="instruction">
                                                Above is Your Delivery Details. Change it, if you want and Press the Update Delivery Details Button.
                                            </span>
                                    }
                                    <button onClick={handleUpdateOrder} disabled={(order.status === "out for delivery" || order.status === "delivered") ? true : false}>
                                        Update Delivery Details
                                    </button>
                                </form>
                            }
                        </div>
                    </>
                    :
                    <div className="emptyOrderDetail">
                        No Order Data Found
                    </div>
            }
        </div>
    );
}

export default SingleOrderDetail;