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

const LoginWrapper = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const { setCurrUser, isFetching, setIsFetching } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsFetching(true);

        try {
            const res = await axios.post("https://luxuryhub.herokuapp.com/api/auth/login", { username, password });
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
                <div className="wrapper">
                    <h1 className="title">
                        Login account
                    </h1>
                    <form action="">
                        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <button onClick={handleLogin} disabled={isFetching}>
                            Login
                        </button>
                        <NavLink to="/" className="navlink link">
                            Do not you remember the password ?
                        </NavLink>
                        <NavLink to="/register" className="navlink link">
                            Create a New Account
                        </NavLink>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginWrapper
