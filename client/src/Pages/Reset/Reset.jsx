import "./reset.scss";
import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate, useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPasswordApi, resetTokenVerifyApi } from "../../Config/Api";

const Reset = () => {
    const [resetPassword, setResetPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [tokenVerified, setTokenVerified] = useState(false);
    const [tokenErrorMsg, setTokenErrorMsg] = useState("Wait For a Moment ... ");
    const [userId, setUserId] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const { isFetching, setIsFetching } = useContext(UserContext);


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("reset_password_token");

        const checkToken = async (token) => {
            try {
                const res = await axios.post(resetTokenVerifyApi, { token });

                if (res?.data.success === true) {
                    setTokenVerified(true);
                    setUserId(res.data.userId);
                } else {
                    setTokenVerified(false);
                    setTokenErrorMsg(res.data.message);
                }
            } catch (e) {
                setTokenVerified(false);
                setTokenErrorMsg("Something Went Wrong");
            }
        }
        checkToken(token);
    }, []);


    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsFetching(true);
        try {
            const { data } = await axios.put(resetPasswordApi, { resetPassword, retypePassword, userId });
            if (data.success === true) {
                toast.success(data.message, {
                    position: "top-center"
                });
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                toast.error(data.message, {
                    position: "top-center"
                })
            }
            setIsFetching(false);
        } catch (e) {
            toast.error("Password Reset Failed", {
                position: "top-center"
            })
            console.log(e);
            setIsFetching(false);
        }
    }

    return (
        <div className="reset">
            <Navbar />
            <div className="resetWrapper">
                <div className="left">
                    <img src="images/model.png" alt="" />
                </div>
                <div className="right">
                    <div className="resetBox">
                        {
                            tokenVerified
                                ?
                                (
                                    <>
                                        <h1 className="title">
                                            Reset Password
                                        </h1>
                                        <p>
                                            Enter Your New Password
                                        </p>
                                        <form>
                                            <input id="resetPassword" type="password" placeholder="New Password" onChange={(e) => setResetPassword(e.target.value)} />


                                            <input id="retypePassword" type="password" placeholder="ReType New Password" onChange={(e) => setRetypePassword(e.target.value)} />

                                            <button onClick={(e) => handleResetPassword(e)} disabled={isFetching}>
                                                Reset Password
                                            </button>
                                        </form>
                                    </>
                                )
                                :
                                (
                                    <h1 className="tokenError">
                                        {tokenErrorMsg}
                                    </h1>
                                )
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Reset
