import "./home.scss";
import Announcement from '../../Components/Announcement/Announcement'
import Navbar from '../../Components/Navbar/Navbar'
import Slider from '../../Components/Slider/Slider'
import Categories from '../../Components/Categories/Categories'
import Products from '../../Components/Products/Products'
import NewsLetter from '../../Components/NewsLetter/NewsLetter'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <Announcement />
            <Slider />
            <Categories />
            <Products />
            <div className="btnContainer">
                <a className="viewMoreBtn" href="#categories">
                    View More
                </a>
            </div>
            <NewsLetter />
            <Footer />
        </div>
    )
}

export default Home
