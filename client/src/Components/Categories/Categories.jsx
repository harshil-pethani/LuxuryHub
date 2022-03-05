import "./categories.scss";
import { categories } from "../../data";
import CatItem from "../CatItem/CatItem";

const Categories = () => {
    return (
        <div className="categories">
            {
                categories.map((element) => (
                    <CatItem item={element} key={element.category} />
                ))
            }
        </div>
    )
}

export default Categories
