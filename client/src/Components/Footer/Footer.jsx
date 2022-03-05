import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import "./footer.scss";
import { NavLink } from "react-router-dom";
import { paymentImage } from "../../data.js";

const Footer = () => {
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
                    <div className="socialIcon" style={{ backgroundColor: "#3b5999" }}>
                        <Facebook />
                    </div>
                    <div className="socialIcon" style={{ backgroundColor: "#e4405f" }}>
                        <Instagram />
                    </div>
                    <div className="socialIcon" style={{ backgroundColor: "#55acee" }}>
                        <Twitter />
                    </div>
                    <div className="socialIcon" style={{ backgroundColor: "#e60023" }}>
                        <Pinterest />
                    </div>
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
                </ul>
            </div>
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
        </div>
    )
}

export default Footer
