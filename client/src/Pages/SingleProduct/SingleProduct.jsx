import "./singleProduct.scss";
import Navbar from "../../Components/Navbar/Navbar";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import Announcement from "../../Components/Announcement/Announcement";
import Footer from "../../Components/Footer/Footer";
import SingleProductDetail from "../../Components/SingleProductDetail/SingleProductDetail";
import { ToastContainer } from 'react-toastify';

const SingleProduct = () => {
    return (
        <div className="singleProduct">
            <Navbar />
            <Announcement />
            <SingleProductDetail />
            <NewsLetter />
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default SingleProduct
