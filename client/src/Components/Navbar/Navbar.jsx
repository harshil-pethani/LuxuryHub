import { Search, ShoppingCartOutlined } from "@material-ui/icons"
import "./navbar.scss"
import { useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext, UserContext } from '../../App';


const Navbar = () => {
    // Getting Items from Contexts
    const { quantity } = useContext(CartContext);
    const { currUser } = useContext(UserContext);

    const [scrolled, setScrolled] = useState(false);
    const NavRef = useRef(null);

    window.onscroll = () => {
        setScrolled(window.pageYOffset === 0 ? false : true);
        return () => { window.onscroll = null };
    }

    return (
        <div ref={NavRef} className={scrolled ? "navbar scrolled" : "navbar"}>
            <div className="wrapper">
                {/* <div className="left">
                    <div className="language">
                        EN
                    </div>
                    <div className="search">
                        <input type="text" placeholder="Search here" />
                        <Search className="icon" />
                    </div>
                </div> */}
                <div className="center">
                    <img src="https://firebasestorage.googleapis.com/v0/b/luxuryhub-3b0f6.appspot.com/o/Site%20Images%2Flogo.jpg?alt=media&token=a0bf0aeb-8633-4b58-93bf-793909899869" alt="" />
                    <h1 className="logo">
                        <NavLink to="/" className="navlink">
                            Luxury Hub
                        </NavLink>
                    </h1>
                </div>
                <div className="right">
                    {
                        (currUser === null) ? (
                            <>
                                <div className="menuItem" >
                                    <NavLink to="/register" className="navlink">
                                        REGISTER
                                    </NavLink>
                                </div>
                                <div className="menuItem">
                                    <NavLink to="/login" className="navlink">
                                        SIGN IN
                                    </NavLink>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="menuItem">
                                    <NavLink to="/orders" className="navlink">
                                        Orders
                                    </NavLink>
                                </div>
                                <div className="menuItem">
                                    <NavLink to="/profile" className="navlink">
                                        <img className="profileIcon" src={currUser?.avatar || "https://firebasestorage.googleapis.com/v0/b/luxuryhub-3b0f6.appspot.com/o/Site%20Images%2Fprofile.png?alt=media&token=6f94d26d-315c-478b-9892-67fda99d2cd6"} alt="" />
                                    </NavLink>
                                </div>
                            </>
                        )
                    }
                    <div className="menuItem cartIcon">
                        <NavLink to="/cart" className="navlink">
                            <ShoppingCartOutlined className="icon" />
                            <span className="badge">{quantity}</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
