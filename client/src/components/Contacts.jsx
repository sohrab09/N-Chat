import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { AiFillBell } from "react-icons/ai";
import Notification from "./Notification";


export default function Contacts({ contacts, changeChat, notification }) {

  console.log("notification", notification);

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.employeeName);
    setCurrentUserImage(data.employeeId);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <Container>
          <div className="brand" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <h1 style={{ color: 'black' }}><span style={{ fontSize: '50px', color: 'black' }}>N</span>chat</h1>
            <div style={{ fontSize: '1.20rem' }}>
              <Notification width={"30px"} color={"#122C34"} count={notification} />
              {notification && (
                <div>
                  <p style={{ fontSize: '12px', color: '#122C34' }}>{notification.length}</p>
                  {/* <div>
                    {!notification.length && "No Message"}
                    {notification.map((notification, index) => (
                      <div key={index}>
                        <p style={{ fontSize: '12px', color: '#122C34' }}>{notification.message.text}</p>
                      </div>
                    ))}
                  </div> */}
                </div>
              )}
            </div>

          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`http://lucid.nassa.com.bd/EmployeeImage/${contact.employeeId}.jpg`}
                      alt="avatar"
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.employeeName}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`http://lucid.nassa.com.bd/EmployeeImage/${currentUserImage}.jpg`}
                alt="avatar"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
              <div style={{ marginTop: '10px' }}>
                <Logout />
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #fff;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 2rem;
  }
  h3 {
    color: white;
    text-transform: uppercase;
  }
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #F4F7F6;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .contact {
    background-color: #ffff;
    border-bottom: 1px solid #e6e6e6;
    min-height: 5rem;
    cursor: pointer;
    width: 99%;
    border-radius: 0.2rem;
    padding: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;
    .avatar {
      img {
        height: 3rem;
      }
    }
    &:hover {
      background-color: #f5f6f6;
    }
    .username {
      h3 {
        color: black;
      }
    }
  }
  .selected {
    background-color: #F0F2F5;
  }
}

.current-user {
  background-color: #fff;
  display: flex;
  margin-top: 5rem;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-top: 3rem;
  gap: 2rem;
  .avatar {
    img {
      height: 4rem;
      max-inline-size: 100%;
    }
  }
  .username {
    h3 {
      color: black;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h3 {
        font-size: 1rem;
      }
    }
  }
}
`;

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #8c6f6f;
border: none;
cursor: pointer;
svg {
  font-size: .75rem;
  color: #fff;
}
`;