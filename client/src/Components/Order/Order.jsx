import axios from 'axios';
import { useEffect, useState } from 'react';
import './order.scss';
import { NavLink } from 'react-router-dom';
// order amount 
// order id
// estimated delivery
// order status
// order date
// no. of products

import React from 'react';

const Order = () => {
    const [currOrders, setCurrOrders] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const orders = await axios.get("https://luxuryhub.herokuapp.com/api/order/find");
                setCurrOrders(orders.data);
            } catch (e) {
                console.log(e);
            }
        }
        getOrder();
    }, []);


    return <div className="orders">
        <h1 className="title">
            Your Orders
        </h1>
        {
            currOrders.length !== 0
                ?
                currOrders.map((currOrder, index) => (
                    <div key={currOrder._id + index} className="orderDetails">
                        <NavLink to={`/orders/${currOrder._id}`}>
                            <div className="viewOrder">
                                View Order {">"}
                            </div>
                        </NavLink>
                        <div className="productImg">
                            <img src={currOrder.products[0].img} alt="" />
                        </div>
                        <div className="details">
                            <span className="orderId">
                                <b>Order ID</b>
                                <b> : </b>
                                {currOrder._id}
                            </span>
                            <span className="productName">
                                <b>Order Status</b>
                                <b> : </b>
                                {currOrder.status}
                            </span>
                            <span className="productId">
                                <b>Order Date</b>
                                <b> : </b>
                                {
                                    currOrder.orderDate
                                }
                            </span>
                            <span className="productId">
                                <b>Expected Delivery</b>
                                <b> : </b>
                                {
                                    currOrder.expectedDelivery
                                }
                            </span>
                        </div>

                        <div className="orderDates">
                            <div className="deliverydetails">
                            </div>
                            <div className="wrapper">
                                <div className="dot one" style={{ backgroundColor: "teal" }}>
                                    1
                                </div>

                                <div className="dot two"
                                    style={{ backgroundColor: (currOrder.status === "shipped" || currOrder.status === "out for delivery" || currOrder.status === "delivered") ? "teal" : "black" }}>
                                    2
                                </div>

                                <div className="dot three"
                                    style={{ backgroundColor: (currOrder.status === "out for delivery" || currOrder.status === "delivered") ? "teal" : "black" }}>
                                    3
                                </div>

                                <div className="dot four"
                                    style={{ backgroundColor: (currOrder.status === "delivered") ? "teal" : "black" }}>
                                    4
                                </div>

                                <div className="progress-bar first"
                                    style={{ backgroundColor: (currOrder.status === "shipped" || currOrder.status === "out for delivery" || currOrder.status === "delivered") ? "teal" : "black" }}>
                                </div>

                                <div className="progress-bar second"
                                    style={{ backgroundColor: (currOrder.status === "out for delivery" || currOrder.status === "delivered") ? "teal" : "black" }}>
                                </div>

                                <div className="progress-bar third"
                                    style={{ backgroundColor: (currOrder.status === "delivered") ? "teal" : "black" }}>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                :
                <div className="emptryOrders">
                    <p>
                        No Orders Found
                    </p>
                </div>
        }
    </div >;
};

export default Order;

