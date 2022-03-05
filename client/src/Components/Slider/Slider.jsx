import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import "./slider.scss";
import { useRef, useState } from 'react';
import { sliderItems } from "../../data";

const Slider = () => {
    const [slideNum, setSlideNum] = useState(0);
    const wrapperRef = useRef();
    const handleClick = (direction) => {
        if (direction === "left" && slideNum > 0) {
            wrapperRef.current.style = `transform: translateX(-${(slideNum - 1) * 100}vw)`
            setSlideNum(slideNum - 1);
        }
        if (direction === "left" && slideNum === 0) {
            wrapperRef.current.style = `transform: translateX(-200vw)`
            setSlideNum(2);
        }
        if (direction === "right" && slideNum < 2) {
            wrapperRef.current.style = `transform: translateX(-${slideNum * 100 + 100}vw)`
            setSlideNum(slideNum + 1);
        }
        if (direction === "right" && slideNum === 2) {
            wrapperRef.current.style = `transform: translateX(0)`
            setSlideNum(0);
        }
    }

    return (
        <div className="slider">
            <div className="arrow left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined className="icon" />
            </div>
            <div className="wrapper" ref={wrapperRef}>
                {
                    sliderItems.map((element, index) => (
                        <div className="slide" style={{ backgroundColor: `${element.bg}`, flexDirection: index === 1 && "row-reverse" }} key={element.key}>
                            <div className="imgContainer">
                                <img src={element.img} alt="" loading="lazy" />
                            </div>
                            <div className="infoContainer">
                                <h1 className="title">
                                    {element.title}
                                </h1>
                                <p className="desc">
                                    {element.desc}
                                </p>
                                <a href="#productsHome">
                                    <button>
                                        Shop Now
                                    </button>
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="arrow right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined className="icon" />
            </div>
        </div >
    )
}

export default Slider
