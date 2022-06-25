import "./products.scss";
import Product from "../Product/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllProductsApi, getCategorizeProductApi } from "../../Config/Api";

const Products = ({ category, filters, sort, searchProduct }) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(category ? getCategorizeProductApi(category) : getAllProductsApi)
                setProducts(res.data.products);
                setFilteredProducts(products);
            } catch (e) {
                console.log(e);
            }
        }
        getProducts();
    }, [category]);

    useEffect(() => {
        category &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(
                        ([key, value]) => item[key].toLowerCase().includes(value)
                    )
                )
            )
    }, [products, category, filters])

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.arrivalDate - a.arrivalDate)
            )
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            )
        } else if (sort === "desc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            )
        }
    }, [sort])

    return (
        <div className="products" id="productsHome">
            {
                category ?
                    filteredProducts.map((element, index) => (
                        <Product item={element} key={index} />
                    )) :
                    products.map((element, index) => (
                        <Product item={element} key={index} />
                    ))
            }
        </div>
    )
}

export default Products
