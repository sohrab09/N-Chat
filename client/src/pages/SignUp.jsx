import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = React.useState('');

  const onChange = (e) => {
    setEmployeeId(e.target.value);
  }


  const onSubmit = (e) => {

    if (employeeId === '') {
      alert('Please enter your employee id');
      return;
    }

    e.preventDefault();
    const url = `http://lucid.nassa.com.bd/api/Employee/GetEmployeeById?employeeId=${employeeId}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setEmployeeId(employeeId);
        navigate("/register",
          {
            state:
            {
              employeeId: data.EmployeeId,
              employeeName: data.FullName,
              employeeEmail: data.OfficeEmail,
              image: data.Image,
              employeePhoneNumber: data.MobileNo,
              userId: data.UserId
            }
          });
      })
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(e) => onSubmit(e)}>
          <div className="brand">
          <h1 style={{ color: 'black' }}><span style={{ color: 'black', fontSize: '50px' }}>N</span>chat</h1>
          </div>
          <input
            placeholder="Enter Nassa Employee ID"
            onChange={onChange}
            name="employeeId"
            value={employeeId}
          />

          <button
            type="submit"
          >
            Register User
          </button>
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
