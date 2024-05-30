// src/Components/LoginModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { lightTheme, darkTheme } from "../utils/Theme";
import { Link } from 'react-router-dom';
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
  max-width: 600px; /* Increased width to accommodate two columns */
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

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  
`;

const FormColumn = styled.div`
  flex: 1;
  min-width: 45%; 
  margin-bottom: 20px;
`;

const FormField = styled.div`
  text-align: left;
  margin-right: 25px;
  margin-left: 25px;
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
  border: 1px solid ${({ theme }) => theme.border};
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

const Button1 = styled.button`
margin-top: 7px;
margin-bottom: 7px;
background-color: green;
color: white;
border: none;
border-radius: 4px;
padding: 7px 7px;
cursor: pointer;

&:hover {
    background: darkgreen;
  }
`;

const RegisterModal = ({ onClose, onLoginClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [askforotp, setaskforotp] = useState(false);
    const [sentotp, setotp] = useState("");
    const [userotp, setuserotp] = useState("");
    const [verified, setverify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [iserror, seterror] = useState(true);
    const defaultImage = 'https://res.cloudinary.com/dlerpsnf1/image/upload/v1716922387/face-icon-png-4282_h0glhh.png';


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!verified) {
            setErrorMessage("Please verify your email before registering.");
            window.alert("Please Verify your email First");
            return;
        }


        const errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
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


        try {
            const res = await fetch('http://localhost:4000/api/auth/signup', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    image: image ? image : defaultImage
                }),
            });

            const data = await res.json();
            console.log(data);
            console.log(res.status)
            if (res.status === 400) {
                setErrorMessage(data.message);
            } else if (res.status === 401) {
                setErrorMessage("User with the same email already exists");
            } else if (res.status === 500) {
                setErrorMessage("Internal server error in creating user");
            } else {
                setErrorMessage("");
                window.alert("Registration Successful");
                onLoginClick();
            }
        }
        catch (err) {
            console.error("Registration error:", err);
            setErrorMessage("Registration failed. Please try again.");
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


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            if (validImageTypes.includes(file.type)) {

                setErrors({ ...errors, image: null });

                const form = new FormData();
                form.append("file", file);
                form.append("upload_preset", "podcast");
                form.append("cloud_name", "dlerpsnf1");

                fetch("https://api.cloudinary.com/v1_1/dlerpsnf1/image/upload", {
                    method: "POST",
                    body: form,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setImage(data.secure_url);

                    })
                    .catch((err) => {
                        console.log(err);
                    });

            } else {
                setImage('');
                setErrors({ ...errors, image: 'Please select a valid image file (JPEG, PNG, GIF, JPG)' });
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handelSend = async () => {
        setuserotp("");
        const new_email = email;
        if (!new_email) {
            setErrorMessage("Please enter email first");
            return;
        }
        setaskforotp(false);
        if (!askforotp) {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:4000/api/auth/sendOtp", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ email: new_email }),
                });

                if (res.status === 200) {
                    const data = await res.json();
                    setotp(data.otp);
                    setaskforotp(true);
                    setErrorMessage("");
                }
            } catch (err) {
                console.log(err);
                setErrorMessage("Error sending OTP. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handelVerify = async () => {
        if (sentotp === userotp) {
            setverify(true);
            seterror(false);
            setErrorMessage("Successfully Verified");
        } else {
            seterror(true);
            setErrorMessage("OTP verification failed. Please enter the correct OTP.");
        }
    };

    const handelotp = (e) => {
        const val = e.target.value;
        setuserotp(val);
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseIcon onClick={onClose} />
                <Title>PodStream</Title>
                <Subtitle>Sign up</Subtitle>
                <form>
                    <FormContainer>
                        <FormColumn>
                            <FormField>
                                <Label>Name:</Label>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                            </FormField>
                            <FormField>
                                <Label>Email:</Label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={handleEmail}
                                    required
                                />
                                <Button1
                                    type="button"
                                    onClick={handelSend}
                                    disabled={loading}

                                >
                                    {loading ? (
                                        <div
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        askforotp ? "Resend Otp?" : "Send Otp"
                                    )}
                                </Button1>
                                {askforotp && (
                                    <div className="mb-3 input-group">
                                        <Input
                                            type="text"
                                            placeholder="Enter OTP"
                                            className="form-control"
                                            name="otp"
                                            value={userotp}
                                            onChange={handelotp}
                                        />
                                        <Button1
                                            type="button"
                                            className="btn btn-success"
                                            onClick={handelVerify}
                                        >
                                            Verify
                                        </Button1>
                                    </div>
                                )}
                                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                            </FormField>
                        </FormColumn>
                        <FormColumn>
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
                            <FormField>
                                <Label>Profile Image:</Label>
                                <Input
                                    style={{ color: 'black', backgroundColor: 'white' }}
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
                            </FormField>
                        </FormColumn>
                    </FormContainer>
                    {errorMessage && (
                        <div>
                            {iserror && (
                                <div style={{ color: 'red' }}>
                                    {errorMessage}
                                </div>
                            )}
                            {!iserror && (
                                <div style={{ color: 'green' }}>
                                    {" "}

                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    )}
                    <Button type="submit" onClick={handleSubmit}>Sign up</Button>
                </form>
                <p className="text-sm font-light text-gray-500">
                    If you have an account click on{' '}
                    <Link to="#" style={{ color: 'red', textDecoration: 'none' }} onClick={onLoginClick}>
                        Sign in
                    </Link>
                </p>
            </ModalContent>
        </ModalOverlay>
    );
};

export default RegisterModal;
