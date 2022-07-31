import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import Notification from "./Notification";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '20%',
  left: '16%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Contacts({ contacts, changeChat, notification }) {
  // console.log("contacts", contacts)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log("notification", notification);

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.employeeName);
    setCurrentUserImage(data.employeeId);
  }, []);
  const changeCurrentChat = (index, contact) => {
    // console.log("contact", contact)
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <Container>
          <div className="brand" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <h1 style={{ color: 'black' }}><span style={{ fontSize: '50px', color: 'black' }}>N</span>chat</h1>
            {/* Today Update  */}
            <div style={{ fontSize: '1.20rem' }}>
              <Button onClick={handleOpen}>
                <Notification width={"30px"} color={"#122C34"} count={notification.length} />
              </Button>
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      {!notification.length && "No New Messages"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {notification.length && notification.map((item, index) => {
                        console.log("item", item);
                        return (
                          <Typography variant="body2" component="p"
                            onClick={() => {
                              changeChat(index, item.contact);
                              handleClose();
                            }}
                          >
                            New Message From: {item.users[0]}
                          </Typography>
                        );
                      }
                      )}
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </div>
            {/* Today Update  */}
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