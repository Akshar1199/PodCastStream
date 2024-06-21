import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Category } from '../utils/Data';
import jwtDecode from 'jwt-decode';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  overflow-y: scroll;
`;



const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.mode === 'light' ? 'white' : 'black'};
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;



const TextInput = styled.input`
  width: 100%;
  height: 4vh;
  border: red;
  font-size: 14px;
  border: 1px  ${({ theme }) => theme.text_secondary};
  border-radius: 5px;
  background: ${({ theme }) => theme.mode === 'light' ? 'white' : 'black'};
  color: ${({ theme }) => theme.mode === 'light' ? 'black' : 'white'};
`;

const Select = styled.select`
  width: 30%;
  height: 5vh;
  font-size: 14px;
  border-radius: 3px;
  margin-left: 5rem;
  margin-right: 0.6rem;
  background: ${({ theme }) => theme.mode === 'light' ? 'white' : 'black'};
  color: ${({ theme }) => theme.mode === 'light' ? 'black' : 'white'};
`;



const Option = styled.option`
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_secondary};
`;


const Form = styled.div`
  background: ${({ theme }) => theme.mode === 'dark' ? 'white' : 'black'};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 600px;
    
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
`;


const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px  ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  padding: 0 14px;
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  background: ${({ theme }) => theme.mode === 'light' ? 'white' : 'black'};
  color: ${({ theme }) => theme.mode === 'light' ? 'black' : 'white'};
  margin-bottom: 12px;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: rgb(102,0,102);
  margin-left: 38%;
  color: ${({ theme }) => theme.mode === 'light' ? 'aqua' : theme.primary};
`;

const Label2 = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: rgb(102,0,102);
  margin-left: 43%;
  margin-top: 2%;
  margin-bottom: 2%;
  color: ${({ theme }) => theme.mode === 'light' ? 'aqua' : theme.primary};
`;


const FileInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${({ theme }) => theme.mode === 'light' ? 'white' : 'black'};
  color: ${({ theme }) => theme.mode === 'light' ? 'black' : 'white'};
  border: 1px  ${({ theme }) => theme.text_secondary};
  border-radius: 5px;
  cursor: pointer;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: -1px;
`;

const Button = styled.button`
  width: 30%;
  height: 3.5vh;
  margin-left: 35%;
  background-color: green;
  color: ${({ theme }) => theme.mode === 'light' ? 'black' : 'white'};
  cursor: pointer;
  border-radius : 5px;
`;


const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
`;

const UploadPage = () => {
    const [podcast, setPodcast] = useState({
        name: '',
        desc: '',
        thumbnail: '',
        tags: [],
        category: '',
        type: 'audio',
        episodes: [{ name: '', desc: '', type: 'audio', file: '' }],
    });

    const [currentEpisode, setCurrentEpisode] = useState(0);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [userID, setUserID] = useState(null);
    const [loader, setLoader] = useState(false);

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

    const handleEpisodeChange = (index, field, value) => {
        const updatedEpisodes = podcast.episodes.map((episode, i) =>
            i === index ? { ...episode, [field]: value } : episode
        );
        setPodcast({ ...podcast, episodes: updatedEpisodes });
    };

    const addNewEpisode = () => {
        setPodcast({
            ...podcast,
            episodes: [
                ...podcast.episodes,
                { name: '', desc: '', type: 'audio', file: '' },
            ],
        });
        setCurrentEpisode(currentEpisode + 1);
    };

    const createPodcast = async () => {


        if (
            !podcast.name ||
            !podcast.desc ||
            !podcast.thumbnail ||
            !podcast.category ||
            !podcast.type ||
            podcast.episodes.some(episode => !episode.name || !episode.desc || !episode.file)
        ) {
            setErrors({ ...errors, podcast: 'Please fill all the required details before creating the podcast.' });
            return;
        }

        setErrors({ ...errors, podcast: '' });
        setLoader(true);

        const requestBody = {
            name: podcast.name,
            desc: podcast.desc,
            thumbnail: podcast.thumbnail,
            tags: podcast.tags,
            category: podcast.category,
            type: podcast.type,
            episodes: podcast.episodes.map(episode => ({
                name: episode.name,
                desc: episode.desc,
                thumbnail: podcast.thumbnail,
                type: podcast.type,
                file: episode.file,
            })),
        };

        console.log('Creating podcast:', requestBody);

        try {
            const response = await fetch(`http://localhost:4000/api/auth/podcast/create/${userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Podcast created successfully:', data);
                setLoader(false);
                alert('Podcast created successfully');
                window.location.reload();
            } else {
                console.error('Error creating podcast:', response.statusText);
                alert('Error creating podcast');
            }
        } catch (error) {
            console.error('Error creating podcast:', error);
            alert('Error creating podcast');
        }
    };

    const handleImageChange = async (e) => {
        const selectedFile = e.target.files[0];
        setThumbnailFile(selectedFile);

        if (selectedFile) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            if (validImageTypes.includes(selectedFile.type)) {
                setErrors({ ...errors, image: '' });
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("upload_preset", "podcast");
                formData.append("cloud_name", "dlerpsnf1");

                try {
                    const response = await fetch(`https://api.cloudinary.com/v1_1/dlerpsnf1/upload`, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    console.log('Image uploaded:', data);
                    setPodcast({ ...podcast, thumbnail: data.secure_url });
                } catch (error) {
                    console.error('Error uploading image: ', error);
                }
            } else {
                setErrors({ ...errors, image: 'Please select a valid image file (JPEG, PNG, GIF, JPG)' });
            }
        }
    };

    const handleVideoChange = async (e, index) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            console.log('Selected file:', selectedFile.type);
            const validVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime'];
            if (validVideoTypes.includes(selectedFile.type)) {
                setErrors({ ...errors, video: '' });
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("upload_preset", "podcast");
                formData.append("cloud_name", "dlerpsnf1");

                try {
                    const response = await fetch(`https://api.cloudinary.com/v1_1/dlerpsnf1/upload`, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    console.log('Video uploaded:', data);
                    handleEpisodeChange(index, 'file', data.secure_url);
                } catch (error) {
                    console.error('Error uploading video: ', error);
                }
            }
            else {
                setErrors({ ...errors, video: 'Please select a valid video file (MP4, MOV, AVI, QuickTime)'});

            }
        }
    };

    const removeEpisode = (index) => {
        if (index === 0) {

            alert('You cannot delete the first episode.');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to delete this episode?');
        if (confirmDelete) {
            const updatedEpisodes = [...podcast.episodes];
            updatedEpisodes.splice(index, 1);
            setPodcast({ ...podcast, episodes: updatedEpisodes });
        }
    };

    return (
        <Container>
            <Form>
                <Title>Upload Podcast</Title>
                <Label>Podcast Details:</Label>

                {errors.podcast && <ErrorMessage>{errors.podcast}</ErrorMessage>}

                <OutlinedBox style={{ marginTop: "6px" }}>
                    <FileInput>
                        <FaCloudUploadAlt size={24} />
                        <label>
                            <span>Browse Image for Thumbnail</span>
                            <input
                                type="file"
                                onChange={(e) => handleImageChange(e)}
                                required
                            />
                            {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
                        </label>
                    </FileInput>
                </OutlinedBox>

                <OutlinedBox style={{ marginTop: "12px" }}>
                    <TextInput
                        placeholder="Podcast Name*"
                        type="text"
                        value={podcast?.name}
                        onChange={(e) => setPodcast({ ...podcast, name: e.target.value })}
                        required
                    />
                </OutlinedBox>

                <OutlinedBox style={{ marginTop: "6px" }}>
                    <TextInput
                        placeholder="Podcast Description*"
                        name="desc"
                        rows={5}
                        value={podcast?.desc}
                        onChange={(e) => setPodcast({ ...podcast, desc: e.target.value })}
                        required
                    />
                </OutlinedBox>

                <OutlinedBox style={{ marginTop: "6px" }}>
                    <TextInput
                        placeholder="Tags separate by ,"
                        name="tags"
                        rows={4}
                        value={podcast?.tags.join(",")}
                        onChange={(e) => setPodcast({ ...podcast, tags: e.target.value.split(",") })}
                    />
                </OutlinedBox>

                <Select
                    onChange={
                        (e) => setPodcast({ ...podcast, type: e.target.value })
                    }>
                    <Option value="audio">Audio</Option>
                    <Option value="video">Video</Option>
                </Select>

                <Select
                    onChange={
                        (e) => setPodcast({ ...podcast, category: e.target.value })
                    }
                >
                    <Option value="" selected disabled hidden>Select Category</Option>
                    {Category.map((category) => (
                        <Option value={category.name} key={category.name}>{category.name}</Option>
                    ))}
                </Select>


                <Title>Episodes Details</Title>
                {podcast.episodes.map((episode, index) => (
                    <div key={index}>
                        <Label2>Episode {index + 1}</Label2>
                        <OutlinedBox>
                            <FileInput>
                                <FaCloudUploadAlt size={24} />
                                <label>
                                    <span>Browse file for Episode</span>
                                    <input
                                        type="file"
                                        onChange={(e) => handleVideoChange(e, index)}
                                    />
                                </label>
                                {errors.video && <ErrorMessage>{errors.video}</ErrorMessage>}
                            </FileInput>
                        </OutlinedBox>
                        <OutlinedBox>
                            <TextInput
                                placeholder="Episode Name*"
                                type="text"
                                value={episode.name}
                                onChange={(e) =>
                                    handleEpisodeChange(index, 'name', e.target.value)
                                }
                            />
                        </OutlinedBox>
                        <OutlinedBox>
                            <TextInput
                                placeholder="Episode Description*"
                                type="text"
                                value={episode.desc}
                                onChange={(e) =>
                                    handleEpisodeChange(index, 'desc', e.target.value)
                                }
                            />
                        </OutlinedBox>
                        <Button type="button" style={{ backgroundColor: 'red' }} onClick={() => removeEpisode(index)}>
                            Delete Episode {index + 1}
                        </Button>
                    </div>
                ))}

                <Button type="button" onClick={addNewEpisode}>
                    Add Episode
                </Button>

                {loader ?
                    <CircularProgress />
                            :
                    <Button onClick={createPodcast}>Create Podcast</Button>
                }



            </Form>

        </Container >
    );
};

export default UploadPage;
