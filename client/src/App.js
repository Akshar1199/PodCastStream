import { useState, useEffect} from "react";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Theme";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Dashboard from "./pages/Dashboard";

const Container = styled.div`
  display: flex;
  background: ${(props) => props.theme.bg};
  width: 100%;
  height: 100vh;
  color: ${(props) => props.theme.text_primary};
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const Podstream = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 1110) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Container>
          <Podstream>
          {menuOpen && <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} darkMode={darkMode} setDarkMode={setDarkMode} />}
           
            <Frame>
              <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Routes>
                <Route path="/" element={<Dashboard/>} />
                
              </Routes>
            </Frame>
          </Podstream>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
