import Announcement from '../../Components/Announcement/Announcement';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import SingleOrderDetail from '../../Components/SingleOrderDetail/SingleOrderDetail';
import './singleOrder.scss';
import { ToastContainer } from 'react-toastify';


const SingleOrder = () => {
    return (
        <div className="singleOrder">
            <Navbar />
            <Announcement />
            <SingleOrderDetail />
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default SingleOrder;
