import { Send } from "@material-ui/icons";
import "./newsLetter.scss";

const NewsLetter = () => {
    return (
        <div className="newsLetter">
            <h1 className="title">
                News Letter
            </h1>
            <p className="desc">
                Get Timely updates from your favourite products.
            </p>
            <div className="input">
                <input type="email" placeholder="Enter Your Email" />
                <button>
                    <Send className="icon" />
                </button>
            </div>
        </div>
    )
}

export default NewsLetter
