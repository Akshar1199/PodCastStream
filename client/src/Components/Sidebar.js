import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineClose, AiFillHome, AiOutlineCloudUpload } from 'react-icons/ai';
import { LuLogOut } from "react-icons/lu";
import { FaHeart, FaSearch } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import LogoIcon from '../images/Logo.png';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  flex: 0.6;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ menuOpen }) => (menuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;

const Elements = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color:  ${({ theme }) => theme.text_secondary};
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + 50};
  }
`;

const NavText = styled.div`
  padding: 12px 0px;
`;

const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary + 50};
  margin: 10px 0px;
`;

const Flex = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  width: 86%;
`;

const Close = styled.div`
  display: flex;
  @media (max-width: 1100px) {
    display: block;
  }
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: bold;
  font-size: 20px;
  margin: 16px 0px;
`;

const Image = styled.img`
  height: 40px;
`;

function Sidebar({ menuOpen, setMenuOpen, darkMode, setDarkMode, authToken, handleLogout }) {


  return (
    <MenuContainer menuOpen={menuOpen}>
      <Flex>

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Image src={LogoIcon} />
            PODSTREAM
          </Logo>
        </Link>

        <Close>
          <AiOutlineClose onClick={() => setMenuOpen(false)} style={{ cursor: "pointer" }} />
        </Close>

      </Flex>

      <Link to='/' style={{ textDecoration: "none", color: "inherit", width: '100%' }}>
        <Elements>
          <AiFillHome />
          <NavText>Dashboard</NavText>
        </Elements>
      </Link>

      <Link to='/search' style={{ textDecoration: "none", color: "inherit", width: '100%' }}>
        <Elements>
          <FaSearch />
          <NavText>Search</NavText>
        </Elements>
      </Link>

      {authToken ?
        <Link to='/favorites' style={{ textDecoration: "none", color: "inherit", width: '100%' }}>
          <Elements>
            <FaHeart />
            <NavText>Favorites</NavText>
          </Elements>
        </Link>
        : null}

      <HR />

      {authToken ?

        <Link to='/upload' style={{ textDecoration: "none", color: "inherit", width: '100%' }}>
          <Elements>
            <AiOutlineCloudUpload />
            <NavText>Upload</NavText>
          </Elements>
        </Link>
        : null}

      <Elements onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        <NavText>{darkMode ? "Light Mode" : "Dark Mode"}</NavText>
      </Elements>

      {authToken ?
        <Link style={{ textDecoration: "none", color: "inherit", width: '100%' }} onClick={handleLogout}>
          <Elements>
            <LuLogOut />
            <NavText>Logout</NavText>
          </Elements>
        </Link>
        : null}



    </MenuContainer>
  );
}

export default Sidebar;
