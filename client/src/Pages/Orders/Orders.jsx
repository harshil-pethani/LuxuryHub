import React from 'react';
import Announcement from '../../Components/Announcement/Announcement';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Order from '../../Components/Order/Order';

const Orders = () => {
    return (
        <div className="Orders">
            <Navbar />
            <Announcement />
            <Order />
            <Footer />
        </div>
    );
};

export default Orders;
