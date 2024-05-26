import React from 'react'
import styled from 'styled-components'
import { IoMdMenu } from "react-icons/io";


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
// border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5.7px);
-webkit-backdrop-filter: blur(5.7px);
@media (max-width: 768px) {
    padding: 16px;
  }

`;

const IcoButton = styled(IoMdMenu)`
  color: ${({ theme }) => theme.text_secondary} !important;
`;

function Navbar( {menuOpen, setMenuOpen} ) {
    return (
        <>
            <NavbarDiv>
                <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
                    <IoMdMenu />
                </IcoButton>
            </NavbarDiv>
        </>
    )
}

export default Navbar
