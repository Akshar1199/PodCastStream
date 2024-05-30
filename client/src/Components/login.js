import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { lightTheme, darkTheme } from "../utils/Theme";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const ModalOverlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.65);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.mode === 'dark' ? lightTheme.bg : darkTheme.bg};
  color: ${({ theme }) => theme.mode === 'dark' ? lightTheme.text_primary : darkTheme.text_primary};
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.mode === 'dark' ? lightTheme.primary : darkTheme.primary};
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.mode === 'dark' ? lightTheme.text_primary : darkTheme.text_primary};
  margin-bottom: 30px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.mode === 'dark' ? lightTheme.text_primary : darkTheme.text_primary};

  ${({ theme }) => theme.mode === 'light' && `
    color: black; 
  `}
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px 0;
  background: ${({ theme }) => theme.mode === 'dark' ? lightTheme.primary : darkTheme.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  color: white;
  &:hover {
    background: darkblue};
  }
`;

const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.mode === 'dark' ? lightTheme.text_primary : darkTheme.text_primary};
  font-size: 1.5rem;
`;

const PasswordInputWrapper = styled.div`
  position: relative;
`;

const PasswordToggleIcon = styled.div`
  position: absolute;
  top: 55%;
  right: 0.5%;
  color: ${({ theme }) => theme.primary};
  transform: translateY(-50%);
  cursor: pointer;
`;

const LoginModal = ({ onClose, onSignupClick, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);


    try {
      const res = await fetch('http://localhost:4000/api/auth/signin', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      console.log(res.status)

      if (res.status === 400) {
        window.alert(data.message);
      } else if (res.status === 401) {
        window.alert("User does not exists");
      } 
      else if (res.status == 402){
        window.alert("Invalid password");
      }
      else if (res.status === 500) {
        window.alert("Internal server error in creating user");
      } else {
        window.alert(data.message);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("image", data.user.image);
        localStorage.setItem("email", data.user.email);
        onLoginSuccess(data.token, data.user.name, data.user.image, data.user.email);
        onClose();
      }
    }
    catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    errors.email = '';
    if (!emailValue) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      errors.email = 'Email is invalid';
    }
    setErrors({ ...errors, email: errors.email });
    setEmail(emailValue);
  }

  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    errors.password = '';
    if (!passwordValue) {
      errors.password = 'Password is required';
    } else if (passwordValue.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setErrors({ ...errors, password: errors.password });
    setPassword(passwordValue);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseIcon onClick={onClose} />
        <Title>PodStream</Title>
        <Subtitle>Sign In</Subtitle>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={handleEmail}
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormField>
          <FormField>
            <Label>Password:</Label>
            <PasswordInputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePassword}
                required
              />

              <PasswordToggleIcon onClick={togglePasswordVisibility}>
                {showPassword ?
                  <IoMdEyeOff />
                  :
                  <IoMdEye />
                }
              </PasswordToggleIcon>

            </PasswordInputWrapper>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormField>
          <Button type="submit">Login</Button>

        </form>
        <p className="text-sm font-light text-gray-500">
          Don't have an account yet?{' '}
          <Link to="#" style={{ color: 'red', textDecoration: 'none' }} onClick={onSignupClick}>
            Sign up
          </Link>
        </p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
