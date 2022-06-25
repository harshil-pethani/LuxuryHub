import { Facebook, GitHub, Instagram, LinkedIn, MailOutline, Phone, Room } from "@material-ui/icons";
import "./footer.scss";
import { NavLink } from "react-router-dom";
import { paymentImage } from "../../data.js";
import { UserContext } from "../../App";
import { useContext } from "react";

const Footer = () => {
    const { currUser } = useContext(UserContext);

    return (
        <div className="footer">
            <div className="left">
                <h1 className="logo">
                    Luxury Hub
                </h1>
                <p className="desc">
                    The Collective is India’s first, and now the largest, luxury multi brand retail concept with a unique assortment of global fashion brands for men and women under one roof. A team of buyers and international fashion experts ensure that The Collective has a unique point of view and is a style mentor for its customers.
                </p>
                <div className="social">
                    <a href="https://www.facebook.com/harshil.pethani.73" target="_blank" className="socialIcon" style={{ backgroundColor: "#1B74E4" }}>
                        <Facebook />
                    </a>
                    <a href="https://www.instagram.com/_harshilpethani_/" target="_blank" className="socialIcon" style={{ backgroundColor: "#e4405f" }}>
                        <Instagram />
                    </a>
                    <a href="https://www.linkedin.com/in/harshil-pethani?original_referer=https%3A%2F%2Fharshilpethani.herokuapp.com%2F" target="_blank" className="socialIcon" style={{ backgroundColor: "#0A66C2" }}>
                        <LinkedIn />
                    </a>
                    <a href="https://github.com/mrpethani" target="_blank" className="socialIcon" style={{ backgroundColor: "#24292F" }}>
                        <GitHub />
                    </a>
                </div>
            </div>
            <div className="center">
                <h3 className="title">
                    Useful Links
                </h3>
                <ul className="list">
                    <li>
                        <NavLink className="navlink" to="/">
                            Home
                        </NavLink>
                    </li>
                    {
                        (currUser === null)
                            ?
                            (
                                <>
                                    <li>
                                        <NavLink className="navlink" to="/register">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="navlink" to="/login">
                                            Sign In
                                        </NavLink>
                                    </li>
                                </>
                            )
                            :
                            (
                                <>
                                    <li>
                                        <NavLink className="navlink" to="/cart">
                                            Cart
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="navlink" to="/profile">
                                            My Account
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="navlink" to="/orders">
                                            Orders
                                        </NavLink>
                                    </li>
                                </>
                            )

                    }
                </ul >
            </div >
            <div className="right">
                <h3 className="title">
                    Contact
                </h3>
                <div className="contactItem">
                    <Room className="icon" />
                    622 Dixie Path, South Tobinchester 98336
                </div>
                <div className="contactItem">
                    <Phone className="icon" />
                    +1 234 567 8901
                </div>
                <div className="contactItem">
                    <MailOutline className="icon" />
                    contact@luxuryhub.com
                </div>
                <img src={paymentImage} className="payment" alt="" />
            </div>
        </div >
    )
}

export default Footer
