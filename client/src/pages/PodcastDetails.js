import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Avatar, CircularProgress } from '@mui/material';
import { format } from 'timeago.js';
import EpisodeCard from '../Components/EpisodeCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  padding: 20px 30px;
  gap: 20px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }

`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 7px;
  background: ${({ theme }) => theme.text_secondary};
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  font-weight: 800;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 15px;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.text_secondary + 50};
  color: ${({ theme }) => theme.text_primary};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
`;

const CreatorInformation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CreatorPersonalInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const CreatorName = styled.h3`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Views = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-left: 20px;
`;

const Episodes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 25px;
  font-weight: 540;
  display: flex;
`;


const EpisodeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const PodcastDetails = () => {

  const { podcastId } = useParams();
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);
  const [user, setUser] = useState(null);
  const [podcast, setPodcast] = useState(null);

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

  useEffect(() => {
    if (userID) {
      getUser();
    }
  }, [userID]);

  const getUser = async () => {

    try {
      const res = await fetch(`http://localhost:4000/api/auth/user/userdata/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.ok) {
        const data = await res.json();
        // console.log("data:", data);
        setUser(data);
      } else {
        console.error('Failed to fetch user');
      }
    }
    catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const getPodcast = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/auth/podcast/${podcastId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.ok) {
        const data = await res.json();
        console.log("podcast data:", data);
        setPodcast(data);
        setLoading(false);
      } else {
        console.error('Failed to fetch podcast');
      }
    }
    catch (error) {
      console.error('Error fetching podcast:', error);
    }
  };

  const addView = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/auth/podcast/addview/${podcast._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const updatedPodcast = { ...podcast, views: podcast.views + 1 };
        setPodcast(updatedPodcast);
      }


    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPodcast();
  }, []);


  return (
    <Container>
      {loading ?
        <Loader>
          <CircularProgress />
        </Loader>

        :
        <>
          <Top>
            <Image src={podcast?.thumbnail} />

            <Details>

              <Title>{podcast?.name}</Title>
              <Description>{podcast?.desc}</Description>
              <Tags>
                {podcast?.tags.map((tag) => (
                  <Tag>{tag}</Tag>
                ))}
              </Tags>

              <CreatorInformation>

                <CreatorPersonalInfo>
                  <Avatar src={podcast?.creator.image} style={{ width: '26px', height: '26px' }}>{podcast?.creator.name?.charAt(0).toUpperCase()}</Avatar>
                  <CreatorName>
                    {podcast.creator.name}
                  </CreatorName>
                </CreatorPersonalInfo>

                <Views>• {podcast?.views} Views</Views>
                <Views>
                  • {format(podcast?.createdAt)}
                </Views>

              </CreatorInformation>
            </Details>
          </Top>

          <Episodes>
            <Topic>All Episodes</Topic>

            <EpisodeDetails>
              {podcast?.episodes.map((episode, index) => (
                <EpisodeCard episode={episode} podcast={podcast} type={podcast.type} index={index} addView={addView} />
              ))}
            </EpisodeDetails>

          </Episodes>


        </>
      }
    </Container>
  )
}

export default PodcastDetails
