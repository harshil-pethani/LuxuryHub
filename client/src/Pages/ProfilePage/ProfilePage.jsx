import './profilePage.scss';
import { EditOutlined, LocationCityOutlined, MailOutline, PermIdentity, PhoneAndroid } from '@material-ui/icons'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Announcement from '../../Components/Announcement/Announcement';
import { useContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';


import { CartContext, UserContext } from '../../App';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
    const { currUser, setCurrUser } = useContext(UserContext);
    const { setProducts, setQuantity, setTotal } = useContext(CartContext);
    const [File, setFile] = useState(null);
    const [avatarUrl, setavatarUrl] = useState("https://firebasestorage.googleapis.com/v0/b/luxuryhub-3b0f6.appspot.com/o/Site%20Images%2Fprofile.png?alt=media&token=6f94d26d-315c-478b-9892-67fda99d2cd6");
    const [loadingImg, setLoadingImg] = useState(false);


    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("https://luxuryhub.herokuapp.com/api/auth/logout");
            if (res.data.success === true) {
                setCurrUser(null);
                setProducts([]);
                setQuantity(0);
                setTotal(0);
                navigate("/login");
                window.location.reload();
            }
        } catch (e) {
            toast.error("Something went wrong", {
                position: "top-center"
            })
            console.log(e);
        }
    }

    const updateImg = (e) => {
        const file = e.target.files[0];
        const fileName = new Date().getTime() + file.name;
        setFile(fileName);
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoadingImg(true);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                toast.error("Image Uploading Failed", {
                    position: "top-center"
                })
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setavatarUrl(downloadURL);
                    setCurrUser({ ...currUser, avatar: downloadURL });
                    downloadURL &&
                        setTimeout(() => {
                            setLoadingImg(false);
                        }, 3000);
                });
            }
        );
    }

    const updateUserDetails = async (msg) => {
        try {
            // setCurrUser({ ...currUser, avatar: avatarUrl });
            const updateUserData = await axios.put(`https://luxuryhub.herokuapp.com/api/user/update/`, currUser);
            if (updateUserData.data.success === true) {
                setCurrUser(updateUserData.data);
                toast.success(msg, {
                    position: "top-center"
                });
            } else {
                toast.error(updateUserData.data.message, {
                    position: "top-center"
                })
            }
        } catch (e) {
            toast.error("Updation Failed", {
                position: "top-center"
            })
            console.log(e);
        }
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        updateUserDetails("User Details has been Updated Successfully");
    }

    const handleUploadImg = async (e) => {
        e.preventDefault();
        setFile("");
        updateUserDetails("Profile Photo has Updated Successfully");
    }

    return (
        <div className="profilePage">
            <Navbar />
            <Announcement />
            <div className="userTitleContainer">
                <h1 className="title">
                    Your Profile
                </h1>
            </div>
            {
                currUser &&
                <div className="userContainer">
                    <div className="userShow">
                        <div className="userShowTop">

                            <img src={currUser.avatar || avatarUrl} alt="" />

                            <div className="userInfo">
                                <span className="username">
                                    {currUser.username}
                                </span>
                                <span className="fullname">
                                    {currUser.firstname} {currUser.lastname}
                                </span>
                            </div>
                        </div>
                        <div className="userShowBottom">
                            <span className="title">
                                Account Details
                            </span>
                            <div className="infoField">
                                <PermIdentity className="infoFieldIcon" />
                                <span className="infoFieldValue">
                                    {currUser.username}
                                </span>
                            </div>
                            <div className="infoField">
                                <PhoneAndroid className="infoFieldIcon" />
                                <span className="infoFieldValue">
                                    +91 {currUser.mobile}
                                </span>
                            </div>
                            <div className="infoField">
                                <MailOutline className="infoFieldIcon" />
                                <span className="infoFieldValue">
                                    {currUser.email}
                                </span>
                            </div>
                            <div className="infoField">
                                <LocationCityOutlined className="infoFieldIcon" />
                                <span className="infoFieldValue">
                                    {currUser.location.toUpperCase()} | INDIA
                                </span>
                            </div>
                            <button onClick={handleLogout}>
                                Logout User
                            </button>
                        </div>
                    </div>
                    <div className="userUpdate">
                        <span className="updateTitle">
                            Update Details
                        </span>
                        <form>
                            <div className="userUpdateLeft">
                                <div className="userUpdateItem">
                                    <label htmlFor="firstname">
                                        First Name
                                    </label>
                                    <input id="firstname" type="text" value={currUser.firstname || ""} onChange={(e) => { setCurrUser({ ...currUser, firstname: e.target.value }) }} />
                                </div>
                                <div className="userUpdateItem">
                                    <label htmlFor="lastname">
                                        Last Name
                                    </label>
                                    <input id="lastname" type="text" value={currUser.lastname || ""} onChange={(e) => { setCurrUser({ ...currUser, lastname: e.target.value }) }} />
                                </div>
                                <div className="userUpdateItem">
                                    <label htmlFor="username">
                                        Username
                                    </label>
                                    <input id="username" type="text" value={currUser.username || ""} onChange={(e) => { setCurrUser({ ...currUser, username: e.target.value }) }} />
                                </div>
                                <div className="userUpdateItem">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <input id="email" type="email" value={currUser.email || ""} onChange={(e) => { setCurrUser({ ...currUser, email: e.target.value }) }} />
                                </div>
                                <div className="userUpdateItem">
                                    <label htmlFor="phone">
                                        Phone
                                    </label>
                                    <input id="phone" type="tel" value={currUser.mobile || ""} onChange={(e) => { setCurrUser({ ...currUser, mobile: e.target.value }) }} />
                                </div>
                                <div className="userUpdateItem">
                                    <label htmlFor="location">
                                        Location
                                    </label>
                                    <input id="location" type="text" value={currUser.location || ""} onChange={(e) => { setCurrUser({ ...currUser, location: e.target.value }) }} />
                                </div>
                                <button className="updateBtn" onClick={handleUpdateUser}>
                                    Update Details
                                </button>
                            </div>
                            <div className="userUpdateRight">
                                <div className="userUpdateUpload">
                                    {
                                        loadingImg
                                        &&
                                        <div className="lds-ripple"><div></div><div></div></div>
                                    }
                                    <img src={currUser.avatar || avatarUrl} alt="" />

                                    <input style={{ display: "none" }} type="file" id="uploadImg" onChange={updateImg} />
                                    <label htmlFor="uploadImg">
                                        <EditOutlined className="uploadIcon" />
                                    </label>
                                </div>
                                {
                                    <span className="error" style={{ color: "green" }}>
                                        {File}
                                    </span>
                                }
                                <button className="updateBtn" onClick={handleUploadImg}>
                                    Update Image
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            }

            <Footer />
            <ToastContainer />
        </div >
    )
}

export default ProfilePage;
