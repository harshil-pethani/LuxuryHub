import { NavLink } from "react-router-dom";
import "./catItem.scss";

const CatItem = ({ item }) => {
    return (
        <div className="catItem">
            <img src={item.img} alt="" className="image" />
            <div className="info">
                <h1 className="title">
                    {item.title}
                </h1>
                <NavLink to={`/products/${item.category}`}>
                    <button>
                        View
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default CatItem
