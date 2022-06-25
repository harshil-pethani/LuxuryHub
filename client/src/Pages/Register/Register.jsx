import Navbar from "../../Components/Navbar/Navbar";
import "./register.scss";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router';
import React, { useState, useContext } from "react";
import { UserContext } from '../../App';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUserApi } from "../../Config/Api";

const Register = () => {
    const [user, setUser] = useState({});

    // Getting Item from User Context
    const { isFetching, setIsFetching } = useContext(UserContext);

    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsFetching(true);

        try {
            const res = await axios.post(registerUserApi, user);
            setIsFetching(false);

            if (res.data.success === true) {
                navigate('/login');
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
        <div className="register">
            <Navbar />
            <div className="registerWrapper">
                <div className="left">
                    <img src="images/model.png" alt="" />
                </div>
                <div className="right">
                    <div className="registerBox">
                        <h1 className="title">
                            Create an account
                        </h1>
                        <form action="">
                            <div className="inputfields">


                                <input type="text" placeholder="First Name" onChange={(e) => { setUser({ ...user, firstname: e.target.value }) }} />
                                <input type="text" placeholder="Last Name" onChange={(e) => { setUser({ ...user, lastname: e.target.value }) }} />
                                <input type="text" placeholder="Username" onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
                                <input type="email" placeholder="Email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                                <input type="mobile" placeholder="Mobile Number" onChange={(e) => { setUser({ ...user, mobile: e.target.value }) }} />
                                <input type="location" placeholder="Location" onChange={(e) => { setUser({ ...user, location: e.target.value }) }} />
                                <input type="password" placeholder="Password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                                <input type="password" placeholder="Confirm Password" onChange={(e) => { setUser({ ...user, cpassword: e.target.value }) }} />

                            </div>
                            <span className="agreement">
                                By Creating an acoount, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                            </span>
                            <button onClick={handleCreate} disabled={isFetching}>
                                Create
                            </button>
                            <p className="link">
                                Already have an Account ?
                                <NavLink to="/login"> Login Account
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register
