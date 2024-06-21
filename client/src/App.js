import { useState, useEffect } from "react";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Theme";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import PodcastDetails from "./pages/PodcastDetails";
import DisplayPodcasts from "./pages/DisplayPodcasts";

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
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });
  const [menuOpen, setMenuOpen] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [image, setImage] = useState(localStorage.getItem('image') || '');
  const [name, setName] = useState(localStorage.getItem('name') || '');



  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

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

  const handleLoginSuccess = (token, name, image, email) => {
    setAuthToken(token);
    setName(name);
    setImage(image);
    localStorage.setItem('authToken', token);
    localStorage.setItem('name', name);
    localStorage.setItem('image', image);
    localStorage.setItem('email', email);
  };




  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    else {
      try {
        const response = await fetch('http://localhost:4000/api/auth/logout', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are included
        });
        const data = await response.json();

        if (data.success) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('name');
          localStorage.removeItem('image');
          localStorage.removeItem('email');
          setAuthToken('');
          setName('');
          setImage('');
          window.alert("Logout Successfully!");

        } else {
          window.alert(data.message);
        }
      } catch (error) {
        console.error("Logout error:", error);
        window.alert("Logout failed. Please try again.");
      }
    }
  };

 


  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Container>
          <Podstream>
            {menuOpen &&
              <Sidebar
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                authToken={authToken}
                handleLogout={handleLogout}
             
              />}

            <Frame>
              <Navbar
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                name={name}
                image={image}
                onLoginSuccess={handleLoginSuccess}

              />

              <Routes>
                <Route path="/" element={<Dashboard />} />
                {authToken ?
                  <>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/podcast/:podcastId" element={<PodcastDetails/>} />
                  </>
                  :
                  <Route path="*" element={<Navigate to="/" />} />
                }
                <Route path="/showpodcasts/:type" element={<DisplayPodcasts />} />


              </Routes>
            </Frame>
          </Podstream>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
