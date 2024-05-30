import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  width: 100%;
  overflow-y: scroll;
  @media (max-width: 770px) {
    flex-direction: column;
    
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -11%;
  margin-right: 10%;

  @media (max-width: 770px) {
    margin-top: 1px;
    
  }
`;

const FormField = styled.div`
  margin: 20px 0;
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  @media (max-width: 770px) {
    
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
  @media (max-width: 770px) {
    width: 70%;
    flex-direction: column;
  }
`;

const Label1 = styled.label`
  margin-bottom: 10px;
  @media (max-width: 770px) {
    width: 70%;
    margin-bottom: 10px;
    margin-right: 40px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: ${({ theme }) => theme.mode === 'dark' ? 'white' : 'rgb(102,0,0)'};
  color: ${({ theme }) => theme.mode === 'light' ? 'white' : 'black'};

  @media (max-width: 770px) {
    width: 70%;
  }
`;

const Button1 = styled.button`
  width: 50%;
  padding: 10px 0;
  margin-top: 7px;
  margin-bottom: 7px;
  background-color: green;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  margin-left: 28%;
  cursor: pointer;

  &:hover {
      background: darkgreen;
    }

    @media (max-width: 770px) {
      margin-top: 10px;
      margin-left: 50px;
    }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  @media (max-width: 770px) {
    width: 70%;
  }
`;

const PasswordToggleIcon = styled.div`
  position: absolute;
  top: 55%;
  right: 0.5%;
  color: ${({ theme }) => theme.primary};
  transform: translateY(-50%);
  cursor: pointer;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px 0;
  background: darkblue;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  margin-left: 28%;
  color: white;
  &:hover {
    background: purple};
  }
  &:disabled {
    background: grey;
    cursor: not-allowed;
  }
  @media (max-width: 770px) {
    margin-left: 18%;
  }
  @media (max-width: 770px) {
    margin-top: 10px;
    margin-left: 50px;
  }
`;

const Button2 = styled.button`
  width: 40%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  background-color: green;
  color: white;
  border-radius: 4px;
  border: none;
  margin-left: 10px;
  cursor: pointer;

  &:disabled {
    background: grey;
    cursor: not-allowed;
  }

  @media (max-width: 770px) {
    margin-top: 10px;
    margin-left: 30px;
  }
`;

const AK = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  @media (max-width: 770px) {
    flex-direction: column;
    
  }
`;

const Input3 = styled.input`
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-left: -10px;
  padding-right: 15px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'white' : 'rgb(102,0,0)'};
  color: ${({ theme }) => theme.mode === 'light' ? 'white' : 'black'};
  @media (max-width: 770px) {
    width: 70%;
  }
`;

const Input1 = styled.input`
  background: ${({ theme }) => theme.mode === 'dark' ? 'white' : 'rgb(102,0,0)'};
  color: ${({ theme }) => theme.mode === 'light' ? 'white' : 'black'};
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  @media (max-width: 770px) {
    width: 70%;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  margin-top: 5px;
`;


const Profile = ( ProfileChange ) => {
  const [image, setImage] = useState(localStorage.getItem('image') || '');
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [newimage, setNewImage] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);
  const [errors2, setErrors2] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserID] = useState('');
  const [otp, setOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [askForOtp, setAskForOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState(false);
  const [isVerified, setIsVerfied] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [onetime, setOnetime] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        
        setUserID(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleUpdateClick = async () => {
    if (isEditing && newEmail) {
      try {
        const res = await fetch("http://localhost:4000/api/auth/user/checkEmail", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email: email }),
        });

        const data = await res.json();
        if (data.isRegistered) {
          alert("This Email is registered by another user. Please enter a different email.");
          setEmail(localStorage.getItem('email'));
          setNewEmail(false);
          return;
        }
      } catch (error) {
        console.error("Error checking email:", error);
        return;
      }
    }

    if (!isEditing || (isEditing && newEmail)) {
      if (askForOtp) {
        setAskForOtp(false);
        setOtp('');
        setUserOtp('');
      } else {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:4000/api/auth/sendOtp", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (response.status === 200) {
            const data = await response.json();
            setOtp(data.otp);
            setAskForOtp(true);
            alert("OTP sent successfully. Please check your email and enter the correct OTP.");
          }
          else {
            alert("Error sending OTP. Please try again.");
          }
        } catch (err) {
          console.error('Error sending OTP:', err);
          alert("Error sending OTP. Please try again.");
        }
        finally {
          setLoading(false);
        }
      }
    } else {
      setIsEditing(false);
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    const updates = {
      name,
      email,
    };

    if (imageChanged) {
      updates.image = newimage;
    }
    else {
      updates.image = image;
    }

    if (!name) {
      errors2.name = 'Name is required';
    }
    if (!email) {
      errors2.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors2.email = 'Email is invalid';
    }
    if (!password) {
      errors2.password = 'Password is required';
    } else if (password.length < 6) {
      errors2.password = 'Password must be at least 6 characters';
    }
    if (Object.keys(errors2).length > 0) {
      setErrors2(errors2);
      return;
    }

    if (!isVerified) {
      errors2.email = "Please verify your email before registering.";
      window.alert("Please Verify your email First");
      return;
    }

    if (passwordChanged) {
      updates.password = password;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/auth/user/update-profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.status === 200) {
        const updatedProfile = await response.json();
        alert("Profile updated successfully");
        
        // Update local storage and state with new values
        localStorage.setItem('name', updatedProfile.name);
        localStorage.setItem('email', updatedProfile.email);
        localStorage.setItem('image', updatedProfile.image);
        
        setName(updatedProfile.name);
        setEmail(updatedProfile.email);
        setImage(updatedProfile.image);
        
        setIsEditing(false);
        setNewEmail(false);
        setOnetime(false);
        setImageChanged(false);
        setPasswordChanged(false);
        window.location.reload();
        
      } else {
        const errorData = await response.json();
        setErrors2(errorData.message || {});
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange2 = (e) => {
    setEmail(e.target.value);
    setNewEmail(true);
  };

  const handleVerify = async () => {
    if (otp === userOtp) {
      alert("OTP verified successfully. You can now edit your profile.");
      setIsVerfied(true);
      setIsEditing(true);
      setAskForOtp(false);
      setOtp('');
      setUserOtp('');
      setNewEmail(false);
    } else {
      alert("OTP verification failed. Please enter the correct OTP.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      if (validImageTypes.includes(file.type)) {
        setErrors2({ ...errors2 });
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
            setNewImage(data.secure_url);
            setImageChanged(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setNewImage('');
        setErrors2({ ...errors2, image: 'Please select a valid image file (JPEG, PNG, GIF, JPG)' });
      }
    }
  };

  const handlePasswordChange = (e) => {
    if (!onetime) {
      alert("You need to re-write the whole password. Otherwise wrong password may be submitted.");
      setOnetime(true);
    }
    setPassword(e.target.value);
    setPasswordChanged(true);
  };

  return (
    <>
      <Container>
        <ProfileImage src={image} alt="Profile" />
        <form>
          <FormField>
            <Label>Name:</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              required
            />
            {errors2.name && <ErrorMessage>{errors2.name}</ErrorMessage>}
          </FormField>
          <FormField>
            <Label>Email:</Label>
            <AK>
              <Input3
                type="email"
                value={email}
                onChange={handleChange2}
                disabled={!isEditing}
                required
              />
              {(isEditing && newEmail) ? (
                <Button2 type="button" onClick={handleUpdateClick} disabled={loading}>
                  {loading ? (
                    <div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    otp ? "Resend Otp?" : "Send OTP on New Email"
                  )}
                </Button2>
              ) : null}
            </AK>
            {errors2.email && <ErrorMessage>{errors2.email}</ErrorMessage>}
          </FormField>
          <FormField>
            <Label>Password:</Label>
            <PasswordInputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                disabled={!isEditing}
                style={{ width: '100%' }}
              />
              {/* <PasswordToggleIcon onClick={togglePasswordVisibility}>
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </PasswordToggleIcon> */}
            </PasswordInputWrapper>
          </FormField>
          {isEditing && (
            <>
              <FormField>
                <Label>Profile Image:</Label>
                <Input
                  type="file"
                  onChange={handleImageChange}
                />
              </FormField>
              {errors2.image && <ErrorMessage>{errors2.image}</ErrorMessage>}
            </>
          )}
          {askForOtp && (
            <div>
              <Label1 style={{ marginLeft: '20px', marginBottom: '10px' }}>OTP:</Label1>
              <Input1
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
              />
              <Button1
                type="button"
                onClick={handleVerify}
              >
                Verify
              </Button1>
            </div>
          )}
          {(!isEditing) ? (
            <Button type="button" onClick={handleUpdateClick} disabled={loading}>
              {loading ? (
                <div>
                  <span>Loading...</span>
                </div>
              ) : (
                otp ? "Resend Otp?" : "Edit Profile"
              )}
            </Button>
          ) : (
            <Button type="submit" onClick={handleUpdate}>Update Profile</Button>
          )}
        </form>

        
      </Container>

    </>
  );
};

export default Profile;
