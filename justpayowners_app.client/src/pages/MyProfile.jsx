import { SectionTitle, MyDashboardNav } from "../components";

import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

import { useSelector } from "react-redux";
import { useState } from "react";
import JPOapi from "../common";
import Swal from "sweetalert2";
import getUserDetails from "../common/user/getUserDetail";


/*import '../../src/assets/css/MyProfile.css'*/


const MyProfile = function () {
    console.log("MyProfile")
    const { currentUser } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    console.log(currentUser);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        FullName: currentUser?.name,
        Email: currentUser?.email,
        MobileNumber: currentUser?.mobileNumber
    });

    const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const optionchanged = (e, key) => {
        setProfile({ ...profile, [key]: e.target.value });
    }

    const onSubmit = handleSubmit(async (data) => {

        try {
            const res = await fetch(JPOapi.updateProfile.url, {
                method: JPOapi.updateProfile.method,
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + userId,
                },
                //append formdata to the body
                body: JSON.stringify({
                    FullName: profile.FullName,
                    Email: profile.Email,
                    MobileNumber: profile.MobileNumber,
                    userId: currentUser.id,
                    userNameProfile: profile.Email
                })
            })
            const serverRes = await res.json();
            console.log("res", serverRes);
            if (serverRes.isSuccess === false) {
                setError("server", {
                    type: "manual",
                    message: serverRes.message
                })
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    });

    return (<>


        <main className="site-main content-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 rtcl-login-form-wrap">
                               
                                <div id="manage-account" className="my-3 my-md-3">
                                    <div className="container">
                                        {/*<SectionTitle title="Advertise With Us" path="/AdvertiseWithUs" type="breadcrumb" />*/}

                                        <div className="row row-cards">
                                            <MyDashboardNav />
                                            <div className="col-lg-10" id="tab-section-right">
                                                <div className="card m-0 p-4">

                                                    <h5 className="card-title">Edit Your profile</h5> 
                                                  
                                                    <div className="alert alert-info mt-4" role="alert">
                                                        <strong>Note:-</strong> If you have any inquiries, please share details about your business with us. Our team of experts will thoroughly assess your needs and reach out to provide information on how RealEstateIndia.com can assist you in obtaining quotes for your business.
                                                    </div>
                                                    <div className="card-body ">
                                                        <form id="rtcl-login-form" onSubmit={handleSubmit(onSubmit)}>

                                                            <div className="form-group">
                                                                <label className="control-label">Name<strong className="rtcl-required">*</strong> </label>
                                                                <input type="text" className="form-control" value={profile.FullName} placeholder="Full Name" name='FullName' onChange={e => optionchanged(e, "FullName")} id="FullName" />
                                                               
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label">E-Mail<strong className="rtcl-required">*</strong> </label>
                                                                <input type="text" className="form-control" placeholder="E-mail ID" name='Email' value={profile.Email}
                                                                    onChange={e => optionchanged(e, "Email")} id="Email" />                                                                
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="control-label">Mobile Phone<strong className="rtcl-required">*</strong> </label>
                                                                <div>{profile.MobileNumber}</div>
                                                            </div>

                                                            <div className="form-group d-flex align-items-center">
                                                                <button type="button" className="btn btn-primary btn-space">Cancel</button>
                                                                <button type="submit" className="btn btn-primary btn-space">Submit</button>
                                                            </div>
                                                           
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        
    </>
    );
};

export default MyProfile;