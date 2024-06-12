import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  let navigate = useNavigate();
  const [signInRequest, setSignInRequest] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setSignInRequest({ ...signInRequest, [e.target.name]: e.target.value });
  };

  const signInAction = (e) => {
    e.preventDefault();

    if (!signInRequest.email || !signInRequest.password || !signInRequest.role || signInRequest.role === "0") {
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

    fetch("http://localhost:8080/api/user/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInRequest),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);
        if (res.role === "ADMIN") {
          sessionStorage.setItem("active-admin", JSON.stringify(res));
        }
        else if (res.role === "USER") {
          sessionStorage.setItem("active-user", JSON.stringify(res));
        }

        toast.success("Logged in successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/home");
        window.location.reload(true);
      });
    });
    e.preventDefault();
  };

  return (
    <div className='signin'>
      <div>
        <div className='container'>
          <div>
            <div className='row'>
              <div className='col-md-6 offset-md-3'>
                <div className='card'>
                  <div className='card-header'>
                    <h2 className='text-center'><b>Sign-in</b></h2>
                  </div>

                  <div className='card-body'>
                    <form>
                      <div className='row mb-3'>
                        <label className='col-md-3 control-label'><b>Email-id :-</b></label>
                        <div className='col-md-9'>
                          <input
                            type='text'
                            name='email'
                            className='form-control'
                            placeholder='Enter your email-id'
                            onChange={handleUserInput}
                            value={signInRequest.email}
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
                            value={signInRequest.password}
                            autoComplete="on"
                          />
                        </div>
                      </div>

                      <div class="mb-3 text-color">
                        <label for="role" class="form-label"><b>Role</b></label>
                        <select onChange={handleUserInput} className="form-control" name="role">
                          <option value="0">Select Role</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER">USER</option>
                        </select>
                      </div>

                      <div className='form-group mb-3'>
                        <button type='submit' className='btn btn-primary' onClick={signInAction}>Log-in</button>
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

export default SignIn;
