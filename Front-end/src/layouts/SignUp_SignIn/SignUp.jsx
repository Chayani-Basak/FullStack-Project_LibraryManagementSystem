import React, { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleUserInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const saveUser = (e) => {
        e.preventDefault();

        if (!user.firstName || !user.lastName || !user.email || !user.password) {
            toast.error("All fields must be filled!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        fetch("http://localhost:8080/api/user/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((result) => {
            toast.success("Registered Successfully!!!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.warn("Result", result);
            result
                .json()
                .then((res) => {
                    console.log("Response", res);
                })
                .catch((error) => {
                    console.log("******", error);
                    console.log(error);
                });
        });
    };

    return (
        <div className='signup'>
            <div>
                <div className='container'>
                    <div>
                        <div className='row'>
                            <div className='col-md-6 offset-md-3'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h2 className='text-center'><b>Sign-up</b></h2>
                                    </div>
                                    <div className='card-body'>
                                        <form>
                                            <div className='row mb-3'>
                                                <label className='col-md-3 control-label'><b>First Name :-</b></label>
                                                <div className='col-md-9'>
                                                    <input
                                                        type='text'
                                                        name='firstName'
                                                        className='form-control'
                                                        placeholder='Enter your first name'
                                                        onChange={handleUserInput}
                                                        value={user.firstName}
                                                    />
                                                </div>
                                            </div>

                                            <div className='row mb-3'>
                                                <label className='col-md-3 control-label'><b>Last Name :-</b></label>
                                                <div className='col-md-9'>
                                                    <input
                                                        type='text'
                                                        name='lastName'
                                                        className='form-control'
                                                        placeholder='Enter your last name'
                                                        onChange={handleUserInput}
                                                        value={user.lastName}
                                                    />
                                                </div>
                                            </div>

                                            <div className='row mb-3'>
                                                <label className='col-md-3 control-label'><b>Email-id :-</b></label>
                                                <div className='col-md-9'>
                                                    <input
                                                        type='text'
                                                        name='email'
                                                        className='form-control'
                                                        placeholder='Enter your email-id'
                                                        onChange={handleUserInput}
                                                        value={user.email}
                                                    />
                                                </div>
                                            </div>

                                            <div className='row mb-3'>
                                                <label className='col-md-3 control-label'><b>Password :-</b></label>
                                                <div className='col-md-9'>
                                                    <input
                                                        type='password'
                                                        name='password'
                                                        className='form-control'
                                                        placeholder='Enter your password'
                                                        onChange={handleUserInput}
                                                        value={user.password}
                                                    />
                                                </div>
                                            </div>

                                            <div className='form-group mb-3'>
                                                <button className='btn btn-primary' onClick={saveUser}>Register</button>
                                            </div>
                                            <ToastContainer />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;