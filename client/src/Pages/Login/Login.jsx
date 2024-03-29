import "./login.scss";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUserApi } from "../../Config/Api";

const LoginWrapper = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const { setCurrUser, isFetching, setIsFetching } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsFetching(true);

        try {
            const res = await axios.post(loginUserApi, { email, password });
            setIsFetching(false);
            if (res.data.success === true) {
                setCurrUser(res.data);
                navigate('/');
                window.location.reload();
            } else {
                toast.error(res.data.message, {
                    position: "top-center"
                })
            }
        } catch (e) {
            setIsFetching(false);
            toast.error("Something went wrong", {
                position: "top-center"
            })
        }
    }

    return (
        <div className="login">
            <Navbar />
            <div className="loginWrapper">
                <div className="left">
                    <img src="images/model.png" alt="" />
                </div>
                <div className="right">
                    <div className="loginBox">
                        <h1 className="title">
                            Login account
                        </h1>
                        <form action="">
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                            <button onClick={handleLogin} disabled={isFetching}>
                                Login
                            </button>
                            <NavLink to="/forgot_password" className="navlink link">
                                Do not you remember the password ?
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

export default LoginWrapper
