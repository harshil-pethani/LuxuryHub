import { NavLink } from "react-router-dom"
import "./product.scss"

const Product = ({ item }) => {
    return (
        <div className="product">
            <div className="circle">
                <img src={item.img} alt="" />
            </div>
            <div className="info">
                <div className="currDetail">
                    <span>
                        Name :
                    </span>
                    <span className="value">
                        {item.title}
                    </span>
                </div>
                <div className="currDetail">
                    <span>
                        Price :
                    </span>
                    <span className="value">
                        {item.price}
                    </span>
                </div>
                <div className="currDetail">
                    <span style={{ color: (item.inStock === true) ? "green" : "red" }}>
                        {(item.inStock === true) ? "In Stock" : "Out of Stock"}
                    </span>
                </div>
                <NavLink to={`/product/${item._id}`}>
                    {/* <RemoveRedEyeOutlined className="icon" /> */}
                    <button>
                        View Product
                    </button>
                </NavLink>
            </div>
        </div >
    )
}

export default Product
