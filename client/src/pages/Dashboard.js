import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const DashboardMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
@media (max-width: 768px){
  padding: 6px 10px;
}
`;

const FilterContainer = styled.div`
display: flex;
flex-direction: column;
background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
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

const Podcasts = styled.div``;

function Dashboard() {

    return (
        <>
            <DashboardMain>
                <FilterContainer>
                    <Topic>
                        Most Popular
                        <Link style={{textDecoration:'none'}}>
                            <Span>Show all</Span>
                        </Link>
                    </Topic>
                    <Podcasts>Hii</Podcasts>
                </FilterContainer>
            </DashboardMain>
        </>
    )
}

export default Dashboard
