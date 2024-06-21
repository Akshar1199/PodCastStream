import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdMenu } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import Login from './login';
import Signup from './Register';
import { useNavigate } from 'react-router-dom';

const NavbarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 40px;
  margin-bottom: 1%;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px);
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const IcoButton = styled(IoMdMenu)`
  color: ${({ theme }) => theme.text_secondary} !important;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    color: 'red';
    background-color: ${({ theme }) => theme.primary};
  }
`;

const ButtonDiv = styled.div`
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 70px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:hover{
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

function Navbar({ menuOpen, setMenuOpen, name, image, onLoginSuccess }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();
  
  

  const handleSignupClick = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleLoginClick = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const ImageClick = () => {
    navigate('/profile');
  }


  return (
    <>
      <NavbarDiv>
        <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
          <IoMdMenu />
        </IcoButton>
        <div style={{ flex: 1, textAlign: 'center' }}>
          {name && (
          <>
          <span>Welcome, </span> 
          <b>{name}</b>
          </>)}
        </div>
        {image ? (
          <ProfileImage src={image} alt="Profile" onClick={ImageClick}/>
        ) : (
          <ButtonDiv onClick={handleLoginClick}>
            <IoPersonSharp style={{ fontSize: "14px" }} />
            Login
          </ButtonDiv>
        )}
      </NavbarDiv>
      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} onSignupClick={handleSignupClick} onLoginSuccess={onLoginSuccess}/>}
      {showSignupModal && <Signup onClose={() => setShowSignupModal(false)} onLoginClick={handleLoginClick} />}
    </>
  );
}

export default Navbar;


// aksharparekh1199@gmail.com