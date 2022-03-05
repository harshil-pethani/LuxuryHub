import "./filterContainer.scss"

const FilterContainer = () => {
    return (
        <div className="filterContainer">
            <div className="filter">
                <span className="filterText">
                    Filter Products :
                </span>
                <select name="Color" id="">
                    <option disabled defaultValue>
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
                <select name="Size" id="">
                    <option disabled defaultValue>
                        Size
                    </option>
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
                </select>
            </div>
            <div className="filter">
                <span className="filterText">
                    Sort By :
                </span>
                <select name="sort" id="">
                    <option value="newest" defaultValue>
                        Newest First
                    </option>
                    <option value="price-asc">
                        Price (Ascending)
                    </option>
                    <option value="price-desc">
                        Price (Decending)
                    </option>
                    <option value="rating">
                        Rating
                    </option>
                </select>
            </div>
        </div>
    )
}

export default FilterContainer
