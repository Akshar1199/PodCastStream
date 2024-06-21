import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import PodcastCard from '../Components/PodcastCard';

const DashboardMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
@media (max-width: 768px){
  padding: 6px 5px;
}
`;


const FilterContainer = styled.div`
display: flex;
flex-direction: column;
background-color: ${({ theme }) => theme.bg};
  border-radius: 5px;
  padding: 20px 30px;
`;


const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px){
    font-size: 18px;
  }
`;

const Podcasts = styled.div`
display: flex;
flex-wrap: wrap;
gap: 14px;
padding: 18px 6px;
//center the items if only one item present
@media (max-width: 550px){
  justify-content: center;
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

const DisplayPodcasts = () => {

    const { type } = useParams();
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [string, setString] = useState("");

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
                setPodcasts(data);
            } else if (res.status === 404) {
                setPodcasts([]);
            }
        } catch (error) {
            console.error('Error fetching most popular podcasts:', error);
        }
    };

    const getCategoryPodcasts = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/auth/podcast/category/${type}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (res.ok) {
                const data = await res.json();
                setPodcasts(data);

            } else if (res.status === 404) {
                setPodcasts([]);
            }
        } catch (error) {
            console.error('Error fetching news podcasts:', error);
        }
    };

    const getallpodcasts = async () => {

        if (type === 'mostpopular') {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            arr.splice(4, 0, " ");
            setString(arr.join(""));
            console.log(string);
            await getmostPopularPodcasts();
            setLoading(false);
        }
        else {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            setString(arr.join(""));
            console.log(string);
            await getCategoryPodcasts();
            setLoading(false);
        }

    }

    useEffect(() => {
        getallpodcasts();
    }, [])

    return (
        <DashboardMain>
            
                {loading ? <CircularProgress /> :
                    <FilterContainer>
                        <Topic>{string}
                            <Link to={`/`} style={{ textDecoration: "none" }}>
                                <Span>Show Less</Span>
                            </Link>
                        </Topic>
                        {podcasts.length === 0 ? <Podcasts>No Podcasts of this category is available.</Podcasts> :
                            (<Podcasts>
                                {podcasts.map((podcast) => (
                                    <PodcastCard podcast={podcast} />
                                ))}
                            </Podcasts>
                            )}
                    </FilterContainer>
                }
           
        </DashboardMain>
    )
}

export default DisplayPodcasts
