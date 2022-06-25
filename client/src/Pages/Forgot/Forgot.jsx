import "./forgot.scss";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotUserApi } from "../../Config/Api";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const { isFetching, setIsFetching } = useContext(UserContext);

    const handleForgot = async (e) => {
        e.preventDefault();
        setIsFetching(true);
        try {
            const { data } = await axios.post(forgotUserApi, { email });
            if (data.success === true) {
                toast.success(data.message, {
                    position: "top-center"
                });
            } else {
                toast.error(data.message, {
                    position: "top-center"
                })
            }
            setIsFetching(false);
        } catch (e) {
            toast.error("Something went wrong", {
                position: "top-center"
            })
            console.log(e);
            setIsFetching(false);
        }
    }

    return (
        <div className="forgot">
            <Navbar />
            <div className="forgotWrapper">
                <div className="left">
                    <img src="images/model.png" alt="" />
                </div>
                <div className="right">
                    <div className="forgotBox">
                        <h1 className="title">
                            Forgot Password
                        </h1>
                        <p>
                            Enter Your Email Id For which You want to Reset Password
                        </p>
                        <form action="">
                            <input id="emailid" type="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
                            <button onClick={(e) => handleForgot(e)} disabled={isFetching}>
                                Send
                            </button>
                            <NavLink to="/login" className="navlink link">
                                Already have an Account? Log In!
                            </NavLink>
                            <NavLink to="/register" className="navlink link">
                                Create a New Account
                            </NavLink>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Forgot;
