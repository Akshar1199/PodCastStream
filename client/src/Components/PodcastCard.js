import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MdPlayArrow } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa";
import Avatar from '@mui/material/Avatar';

const Card = styled.div`

    position: relative;
    text-decoration: none;
    background-color: ${({ theme }) => theme.card};
    max-width: 220px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 16px;
    border-radius: 6px;  
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
    
    &:hover{
        transform: translateY(-5px);
        transition: all 0.4s ease-in-out;
        box-shadow: ${({ theme }) => theme.mode === 'dark' ? '0 0 18px 0 rgba(255, 255, 255, 0.5)' : '0 0 18px 0 rgba(204, 0, 0, 0.3)'};
        filter: brightness(1.2);
    }

`;

const Modal = styled.div`
  ${({ uploadOpen }) => uploadOpen === true ? 'background: rgba(0,0,0,0.6)' : ''};
`;

const Top = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 150px;
position: relative;
`;

const CardImage = styled.img`
object-fit: cover;
  width: 220px;
  height: 140px;
  border-radius: 6px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  &:hover{
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  }
`;

const CardInformation = styled.div`
  display:flex;
  align-items: flex-end;
  font-weight:450;
  padding: 14px 0px 0px 0px;
  width: 100%;
`;

const MainInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction:column;
  justify-content: flex-start;
  gap: 4px;
  `;


const Title = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_primary}`;

const Description = styled.p`
overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;

const CreatorInfo = styled.div`
display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
`;



const CreatorName = styled.h4`
font-size:12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;

const Views = styled.div`
  font-size:10px;
  color: ${({ theme }) => theme.text_secondary};
  width: max-content;
`

const PlayIcon = styled(Link)`
    display: flex;
    position: absolute !important;
    padding: 10px;
    z-index: 100;
    border-radius: 50%;
    align-items: center;
    background: #9000ff !important;
    color: white !important;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    top: 45%;
    right: 10%;
    // display: none;
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 16px 4px #9000ff50 !important;
`;



const PodcastCard = ({ podcast, user }) => {


  return (
    <Modal>
      <Card>
        <div>

          <Top>
            {/* <Link onClick={() => {
                if (!currentUser) {
                  dispatch(
                    openSignin()
                  )
                } else {
                  favoritpodcast()
                }
              }}>
                <Favorite >
                  {favourite ?
                    <FavoriteIcon style={{ color: "#E30022", width: '16px', height: '16px' }}></FavoriteIcon>
                    :
                    <FavoriteIcon style={{ width: '16px', height: '16px' }}></FavoriteIcon>
                  }
                </Favorite>
              </Link> */}
            <CardImage src={podcast.thumbnail} />
          </Top>
          <CardInformation>
            <MainInfo>
              <Title>{podcast.name}</Title>
              <Description>{podcast.desc}</Description>
              <CreatorInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Avatar
                    src={podcast.creator.image} style={{ width: '26px', height: '26px' }}>{podcast.creator.name?.charAt(0).toUpperCase()}</Avatar>
                  <CreatorName>
                    {podcast.creator.name}
                  </CreatorName>

                </div>
                <Views>• {podcast.views} Views</Views>
              </CreatorInfo>
            </MainInfo>
          </CardInformation>
        </div>
        <PlayIcon to={`/podcast/${podcast._id}`}>
          {podcast?.type === 'video' ?
            <MdPlayArrow style={{ width: '28px', height: '28px' }} />
            :
            <FaHeadphones style={{ width: '28px', height: '28px' }} />
          }
        </PlayIcon>
      </Card>
    </Modal>
  );
}


export default PodcastCard;
