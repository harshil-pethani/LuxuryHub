import "./singleProductDetail.scss";
import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { useContext } from "react";
import { CartContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartCreateApi, getProductByIdApi } from "../../Config/Api";

const SingleProductDetail = () => {
    const [currQuantity, setCurrQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [product, setProduct] = useState({});


    // Getting Product ID
    const location = useLocation();
    const navigate = useNavigate();
    const productId = location.pathname.split("/")[2];

    // Getting Context
    const { products, quantity, setQuantity, total, setTotal } = useContext(CartContext);
    const { currUser } = useContext(UserContext);

    const addToCart = async (product) => {
        if (!currUser) {
            toast.error("First You have to Login Your Account", {
                position: "top-center"
            })
            setTimeout(() => {
                navigate("/login");
            }, 3000);
            return;
        }
        product = { ...product, size, color, quantity: currQuantity };
        if (!products.some(pro => pro._id === product._id && pro.color === product.color && pro.size === product.size)) {
            products.push(product);
            setQuantity(quantity + 1);
            setTotal(total + (currQuantity * product.price));

            try {
                await axios.post(cartCreateApi, { products, quantity, total });
                toast.success("Product has been Added to the Cart", {
                    position: "top-center"
                })
            } catch (e) {
                toast.error("Product Adding to the Cart is Failed", {
                    position: "top-center"
                })
            }
        } else {
            toast.error("Same Size and Color Item Already in the Cart", {
                position: "top-center"
            })
        }
    }

    useEffect(() => {
        const getProductData = async () => {
            try {
                const productData = await axios.get(getProductByIdApi(productId));
                setProduct(productData.data);
            } catch (e) {
                console.log(e);
            }
        }
        getProductData();
    }, [products, quantity, total, productId]);

    return (
        <div className="singleProductDetail">
            <div className="imgContainer">
                <img src={product.img} alt="" />
            </div>
            <div className="infoContainer">
                <h1 className="title">
                    {product.title}
                </h1>
                <p className="desc">
                    {product.desc}
                </p>
                <span className="price">
                    ${product.price}
                </span>
                <div className="filterSingleContainer">
                    <div className="filter">
                        <div className="filterTitle">
                            Color :
                        </div>
                        <select name="" id="" className="filterColor" onChange={(e) => {
                            setColor(e.target.value);
                        }}>
                            <option defaultValue>
                                Color
                            </option>
                            {
                                product.color && product.color.map((c) => {
                                    return (
                                        <option value={c} className="filterColor" key={c} >
                                            {c.toUpperCase()}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="filter">
                        <div className="filterTitle">
                            Size :
                        </div>
                        <select name="" id="" className="filterSize" onChange={(e) => {
                            setSize(e.target.value);
                        }}>
                            <option defaultValue>
                                Size
                            </option>
                            {
                                product.size && product.size.map((e) => {
                                    return (
                                        <option value={e} key={e} className="filterSizeOption">
                                            {e.toUpperCase()}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="quantityContainer">
                    <div className="amountContainer">
                        <Remove className="icon" onClick={() => { currQuantity > 1 && setCurrQuantity(currQuantity - 1) }} />
                        <span className="amount">
                            {currQuantity}
                        </span>
                        <Add className="icon" onClick={() => { setCurrQuantity(currQuantity + 1) }} />
                    </div>
                    <button onClick={() => {
                        (size && color) ? addToCart(product) : toast.error("Please Select Color And Size", {
                            position: "top-center"
                        });

                    }}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleProductDetail
