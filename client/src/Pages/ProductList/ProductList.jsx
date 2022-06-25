import Announcement from "../../Components/Announcement/Announcement";
import Navbar from "../../Components/Navbar/Navbar";
import Products from "../../Components/Products/Products";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import Footer from "../../Components/Footer/Footer";
import "./productList.scss";
import { useLocation } from "react-router";
import { useRef, useState } from "react";

const ProductList = () => {
    const [filterAdded, setFilterAdded] = useState(false)
    const [filters, setFilters] = useState({});
    const [searchProduct, setSearchProduct] = useState("");
    const [sort, setSort] = useState("");

    const location = useLocation();
    const category = location.pathname.split("/")[2];

    const colorRef = useRef();
    const sizeRef = useRef();

    const handleFilter = (title, val) => {
        setFilterAdded(true)
        setFilters({
            ...filters,
            [title]: val
        })
    }

    const clearFilters = () => {
        colorRef.current.selectedIndex = 0;
        sizeRef.current.selectedIndex = 0;
        setFilters({});
        setFilterAdded(false);
        setSearchProduct("");
    }

    return (
        <div className="productList">
            <Navbar />
            <Announcement />
            <h1 className="productTitle">
                {category} Collection
            </h1>
            <div className="searchContainer">
                <input value={searchProduct} type="text" name="title" onChange={(e) => {
                    let val = e.target.value;
                    val = val.toLowerCase();
                    handleFilter(e.target.name, val);
                    setSearchProduct(e.target.value);
                }} placeholder="Search Your Product ..." />
            </div>
            <div className="filterContainer">
                <div className="filter">
                    <span className="filterText">
                        Filter Products :
                    </span>
                    <select ref={colorRef} name="color" id="" onChange={(e) => handleFilter(e.target.name, e.target.value)}>
                        <option defaultValue>
                            Color
                        </option>
                        <option value="white">
                            White
                        </option>
                        <option value="black">
                            Black
                        </option>
                        <option value="red">
                            Red
                        </option>
                        <option value="blue">
                            Blue
                        </option>
                        <option value="yellow">
                            Yellow
                        </option>
                        <option value="green">
                            Green
                        </option>
                    </select>
                    <select ref={sizeRef} name="size" id="" onChange={(e) => handleFilter(e.target.name, e.target.value)}>
                        <option defaultValue>
                            Size
                        </option>
                        {
                            category === "jeans" ?
                                <>
                                    <option value="28">
                                        28
                                    </option>
                                    <option value="30">
                                        30
                                    </option>
                                    <option value="32">
                                        32
                                    </option>
                                    <option value="34">
                                        34
                                    </option>
                                    <option value="36">
                                        36
                                    </option>
                                    <option value="38">
                                        38
                                    </option>
                                </> :
                                <>
                                    <option value="xs">
                                        XS
                                    </option>
                                    <option value="s">
                                        S
                                    </option>
                                    <option value="m">
                                        M
                                    </option>
                                    <option value="l">
                                        L
                                    </option>
                                    <option value="xl">
                                        XL
                                    </option>
                                    <option value="xxl">
                                        XXL
                                    </option>
                                </>
                        }

                    </select>
                    {
                        filterAdded &&
                        <button className="clearFilter" onClick={clearFilters}>
                            Clear Filters
                        </button>
                    }
                </div>
                <div className="filter">
                    <span className="filterText">
                        Sort By :
                    </span>
                    <select name="sort" id="" onChange={(e) => setSort(e.target.value)}>
                        <option defaultValue>
                            Sort
                        </option>
                        <option value="newest">
                            Newest First
                        </option>
                        <option value="asc">
                            Price (Low to High)
                        </option>
                        <option value="desc">
                            Price (High to Low)
                        </option>
                    </select>
                </div>
            </div>
            <Products category={category} searchProduct={searchProduct} filters={filters} sort={sort} />
            <NewsLetter />
            <Footer />
        </div>
    )
}

export default ProductList
