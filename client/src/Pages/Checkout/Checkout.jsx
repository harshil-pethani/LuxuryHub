import Announcement from '../../Components/Announcement/Announcement';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import './checkout.scss';

const Checkout = () => {
    return (
        <div className="checkout">
            <Navbar />
            <Announcement />
            <CheckoutForm />
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Checkout;
