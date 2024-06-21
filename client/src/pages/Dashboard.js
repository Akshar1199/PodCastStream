import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import PodcastCard from '../Components/PodcastCard';

const DashboardMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 60%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
@media (max-width: 768px){
  padding: 6px 6px;
}
`;

const FilterContainer = styled.div`
display: flex;
flex-direction: column;
background-color: ${({ theme }) => theme.bg};
  border-radius: 6px;
  padding: 20px 30px;
`;


const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 640;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px){
    font-size: 18px;
  }
`;

const Span = styled.span`
  
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  @media(max-width: 768px){
    font-size: 14px;
  }
  color: ${({ theme }) => theme.primary};
  &:hover{
    transition: 0.2s ease-in-out;
  }
`;

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`;

const Podcasts = styled.div`
display: flex;
flex-wrap: wrap;
gap: 14px;
padding: 18px 6px;
//center the items if only one item present
@media (max-width: 660px){
  justify-content: center;
}
`;

function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [comedy, setComedy] = useState([]);
  const [news, setNews] = useState([]);
  const [sports, setSports] = useState([]);
  const [crime, setCrime] = useState([]);
  const [science, setScience] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);

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
        console.log("userdata:", data);
        setUser(data);
      } else {
        console.error('Failed to fetch user');
      }
    }
    catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const getmostPopularPodcasts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/podcast/get/mostpopular", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.ok) {
        const data = await res.json();
        setMostPopular(data);
      } else if (res.status === 404) {
        setMostPopular([]);
      }
    } catch (error) {
      console.error('Error fetching most popular podcasts:', error);
    }
  };

  const getComedyPodcasts = async (category) => {
    try {
      const res = await fetch(`http://localhost:4000/api/auth/podcast/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.ok) {
        const data = await res.json();

        setComedy(data);

      } else if (res.status === 404) {
        setComedy([]);
      }
    } catch (error) {
      console.error('Error fetching news podcasts:', error);
    }
  };

  const getNewsPodcasts = async (category) => {
    try {
      const res = await fetch(`http://localhost:4000/api/auth/podcast/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.ok) {
        const data = await res.json();
        setNews(data);

      } else if (res.status === 404) {
        setNews([]);
      }
    } catch (error) {
      console.error('Error fetching news podcasts:', error);
    }
  };

  const getSportsPodcasts = async (category) => {
    try {
      const res = await fetch(`http://localhost:4000/api/auth/podcast/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.ok) {
        const data = await res.json();
        setSports(data);

      } else if (res.status === 404) {
        setSports([]);
      }
    } catch (error) {
      console.error('Error fetching sports podcasts:', error);
    }
  };

  const getCrimePodcasts = async (category) => {
    try {
      const res = await fetch(`http://localhost:4000/api/auth/podcast/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCrime(data);
      } else if (res.status === 404) {
        setCrime([]);
      }
    } catch (error) {
      console.error('Error fetching crime podcasts:', error);
    }
  };

  const getSciencePodcasts = async (category) => {
    try {
      const res = await fetch(`http://localhost:4000/api/auth/podcast/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.ok) {
        const data = await res.json();
        setScience(data);
      } else if (res.status === 404) {
        setScience([]);
      }
    } catch (error) {
      console.error('Error fetching crime podcasts:', error);
    }
  };


  const getallData = async () => {

    setLoading(true);

    await getUser();
    await getmostPopularPodcasts();
    await getComedyPodcasts('Comedy');
    await getNewsPodcasts('News');
    await getCrimePodcasts('Crime');
    await getSportsPodcasts('Sports');
    await getSciencePodcasts('Science');
    setLoading(false);
  };


  useEffect(() => {
    getallData();
  }, [userID])



  return (
    <>
      <DashboardMain>
        {loading ?
          <Loader>
            <CircularProgress />
          </Loader>
          :
          <>
            {user && user?.podcasts?.length > 0 &&

              <FilterContainer>
                <Topic>Your Uploads
                  <Link to={`/profile`} style={{ textDecoration: "none" }}>
                    <Span>Show All</Span>
                  </Link>
                </Topic>
                <Podcasts>
                  {user?.podcasts.slice(0, 4).map((podcast) => (
                    <PodcastCard podcast={podcast} user={user} />
                  ))}
                </Podcasts>
              </FilterContainer>
            }

            <FilterContainer>
              <Topic>Most Popular
                <Link to={`/showpodcasts/mostpopular`} style={{ textDecoration: "none" }}>
                  <Span>Show All</Span>
                </Link>
              </Topic>
              <Podcasts>
                {mostPopular.slice(0, 6).map((podcast) => (
                  <PodcastCard podcast={podcast} user={user} />
                ))}
              </Podcasts>
            </FilterContainer>

            <FilterContainer>
              <Topic>Comedy
                <Link to={`/showpodcasts/Comedy`} style={{ textDecoration: "none" }}>
                  <Span>Show All</Span>
                </Link>
              </Topic>
              {comedy.length === 0 ? <Podcasts>No Podcasts of this category is available.</Podcasts> :
                (<Podcasts>
                  {comedy.slice(0, 6).map((podcast) => (
                    <PodcastCard podcast={podcast} user={user} />

                  ))}
                </Podcasts>
                )}
            </FilterContainer>

            <FilterContainer>
              <Link to={`/showpodcasts/News`} style={{ textDecoration: "none" }}>
                <Topic>News
                  <Span>Show All</Span>
                </Topic>
              </Link>
              {news.length === 0 ? <Podcasts>No Podcasts of this category is available.</Podcasts> :
                (<Podcasts>
                  {news.slice(0, 6).map((podcast) => (
                    <PodcastCard podcast={podcast} user={user} />
                  ))}
                </Podcasts>)}
            </FilterContainer>

            <FilterContainer>
              <Link to={`/showpodcasts/Crime`} style={{ textDecoration: "none" }}>
                <Topic>Crime
                  <Span>Show All</Span>
                </Topic>
              </Link>

              {crime.length === 0 ? <Podcasts>No Podcasts of this category is available.</Podcasts> :
                (<Podcasts>
                  {crime.slice(0, 6).map((podcast) => (
                    <PodcastCard podcast={podcast} user={user} />
                  ))}
                </Podcasts>)}
            </FilterContainer>

            <FilterContainer>
              <Link to={`/showpodcasts/Sports`} style={{ textDecoration: "none" }}>
                <Topic>Sports
                  <Span>Show All</Span>
                </Topic>
              </Link>

              {sports.length === 0 ? <Podcasts>No Podcasts of this category is available.</Podcasts> :
                (<Podcasts>
                  {sports.slice(0, 6).map((podcast) => (
                    <PodcastCard podcast={podcast} user={user} />
                  ))}
                </Podcasts>)}
            </FilterContainer>

            <FilterContainer>
              <Link to={`/showpodcasts/Science`} style={{ textDecoration: "none" }}>
                <Topic>Science
                  <Span>Show All</Span>
                </Topic>
              </Link>

              {science.length === 0 ? <Podcasts>No Podcasts of this category is available.</Podcasts> :
                (<Podcasts>
                  {science.slice(0, 6).map((podcast) => (
                    <PodcastCard podcast={podcast} user={user} />
                  ))}
                </Podcasts>)}

            </FilterContainer>

          </>
        }
      </DashboardMain>
    </>
  )
}

export default Dashboard
