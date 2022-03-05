import "./cartPage.scss";
import Navbar from '../../Components/Navbar/Navbar';
import Announcement from '../../Components/Announcement/Announcement';
import Footer from '../../Components/Footer/Footer';
import Cart from "../../Components/Cart/Cart";

const CartPage = () => {
    return (
        <div className="cartPage">
            <Navbar />
            <Announcement />
            <Cart />
            <Footer />
        </div>
    )
}

export default CartPage
