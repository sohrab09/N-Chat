import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const EmployeeInfo = location.state;


  const [employeeId, setEmployeeId] = useState(EmployeeInfo.employeeId);
  const [employeeName, setEmployeeName] = useState(EmployeeInfo.employeeName);
  const [employeeEmail, setEmployeeEmail] = useState(EmployeeInfo.employeeEmail);
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState(EmployeeInfo.employeePhoneNumber);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const handleChange = (e) => {
    if (e.target.name === 'employeeId') {
      setEmployeeId(e.target.value);
    } else if (e.target.name === 'employeeName') {
      setEmployeeName(e.target.value);

    } else if (e.target.name === 'employeeEmail') {
      setEmployeeEmail(e.target.value);
    }
    else if (e.target.name === 'employeePhoneNumber') {
      setEmployeePhoneNumber(e.target.value);
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  }


  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // const [values, setValues] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  // const handleChange = (event) => {
  //   setValues({ ...values, [event.target.name]: event.target.value });
  // };

  // const handleValidation = () => {
  //   const { password, confirmPassword, username, email } = values;
  //   if (password !== confirmPassword) {
  //     toast.error(
  //       "Password and confirm password should be same.",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (username.length < 3) {
  //     toast.error(
  //       "Username should be greater than 3 characters.",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (password.length < 8) {
  //     toast.error(
  //       "Password should be equal or greater than 8 characters.",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (email === "") {
  //     toast.error("Email is required.", toastOptions);
  //     return false;
  //   }

  //   return true;
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (handleValidation()) {
  //     const { email, username, password } = values;
  //     const { data } = await axios.post(registerRoute, {
  //       username,
  //       email,
  //       password,
  //     });

  //     if (data.status === false) {
  //       toast.error(data.msg, toastOptions);
  //     }
  //     if (data.status === true) {
  //       localStorage.setItem(
  //         process.env.REACT_APP_LOCALHOST_KEY,
  //         JSON.stringify(data.user)
  //       );
  //       navigate("/");
  //     }
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }
    const { data } = await axios.post(registerRoute, {
      employeeId: employeeId,
      employeeName: employeeName,
      employeeEmail: employeeEmail,
      employeePhoneNumber: employeePhoneNumber,
      password: password,
    });
    console.log("data", data);
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    } else if (data.status === true) {
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data.user)
      );
      navigate("/");
    }
  }




  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
          <h1 style={{ color: 'black' }}><span style={{ color: 'black', fontSize: '50px' }}>N</span>chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            value={EmployeeInfo.employeeName}
            disabled={true}
          />
          <input
            type="number"
            placeholder="Employee ID"
            name="employeeId"
            onChange={(e) => handleChange(e)}
            value={EmployeeInfo.employeeId}
            disabled={true}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            value={EmployeeInfo.employeeEmail}
            disabled={true}
          />
          <input
            type="number"
            placeholder="Employee Phone Number"
            name="employeePhoneNumber"
            onChange={(e) => handleChange(e)}
            value={EmployeeInfo.employeePhoneNumber}
            disabled={true}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            value={confirmPassword}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #ffff;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #fafafafa;
  border-radius: 2rem;
  padding: 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #00000;
  border-radius: 0.4rem;
  color: black;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #00000;
    outline: none;
  }
}
button {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
span {
  color: black;
  text-transform: uppercase;
  a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
}
`;