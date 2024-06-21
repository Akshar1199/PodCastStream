import React from 'react';
import styled from 'styled-components';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Card = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px 30px;
    background-color: ${({ theme }) => theme.card};
    border-radius: 6px;
    align-items: center;

    &:hover{
        transform: translateY(-5px);
        transition: all 0.4s ease-in-out;
        box-shadow: ${({ theme }) => theme.mode === 'dark' ? '0 0 18px 0 rgba(255, 255, 255, 0.3)' : '0 0 18px 0 rgba(204, 0, 0, 0.3)'};
    }

    @media (max-width: 768px){
        flex-direction: column; 
        align-items: flex-start;
    }
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 800;
    color: ${({ theme }) => theme.text_primary};
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Description = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.text_secondary};  
    object-fit: cover;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const PlayerWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 10000;
`;

const Name = styled.div`
    color: white;
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 24px;
    position: absolute;
    top: 20px;
`;

const StyledReactPlayer = styled(ReactPlayer)`
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(200, 200, 200, 0.5);
`;

const ControlIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 48px;
  cursor: pointer;
`;

const PreviousControl = styled(ControlIcon)`
  left: 10px;
`;

const NextControl = styled(ControlIcon)`
  right: 10px;
`;

const EpisodeCard = ({ episode, podcast, type, index, addView }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null);

    const episodes = podcast?.episodes;
    const isFirstEpisode = currentEpisodeIndex === 0;
    const isLastEpisode = currentEpisodeIndex === episodes.length - 1;

    console.log(episodes + "podcast" + podcast);

    const handlePlay = (index) => () => {
        addView();
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    };

    const handleClose = () => {
        setIsPlaying(false);
    };

    const handleNext = () => {
        if (currentEpisodeIndex < episodes.length - 1) {
            setCurrentEpisodeIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentEpisodeIndex > 0) {
            setCurrentEpisodeIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <>
            <Card>
                <ImageContainer>
                    <Image src={podcast?.thumbnail} />
                    <PlayCircleOutlineIcon
                        style={{
                            position: "absolute",
                            top: "26px",
                            left: "26px",
                            color: "white",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer"
                        }}
                        onClick={handlePlay(index)}
                    />
                </ImageContainer>

                <Details>
                    <Title>{episode.name}</Title>
                    <Description>{episode.desc}</Description>
                </Details>
            </Card>

            {isPlaying && currentEpisodeIndex !== null && (
                <PlayerWrapper>
                    <Name>Episode{currentEpisodeIndex + 1}: {episodes[currentEpisodeIndex].name}</Name>
                    <CloseButton onClick={handleClose}>×</CloseButton>
                    <StyledReactPlayer
                        url={episodes[currentEpisodeIndex].file}
                        playing
                        controls
                        width="80%"
                        height="80%"
                    />

                    <PreviousControl onClick={handlePrevious}>
                        {!isFirstEpisode ? <SkipPreviousIcon fontSize="inherit" /> : null}
                    </PreviousControl>


                    <NextControl onClick={handleNext}>
                        {!isLastEpisode ? <SkipNextIcon fontSize="inherit" /> : null}
                    </NextControl>

                </PlayerWrapper>
            )}
        </>
    );
}

export default EpisodeCard;
