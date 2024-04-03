import React, { useState } from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    border: 1px solid black;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100px;
    width: 100px;
`

const ResumeResultPage: React.FC = () => {

    return (
        <div>
            <Header />
            <h1>Resume Result Page</h1>
            <Wrapper>
                <ImageWrapper>
                    <img src="https://via.placeholder.com/150" alt="Resume Image" />
                </ImageWrapper>
            </Wrapper>               
            <Footer />
        </div>
    );
};

export default ResumeResultPage;