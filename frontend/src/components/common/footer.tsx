import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    width: 100%;
    height: 100px;
    border-top: 1px solid #B0B0B0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Footer: React.FC = () => {
    return (
        <div>
            <FooterWrapper>
                &copy; 2024 My React App. All rights reserved.
            </FooterWrapper>
        </div>
    );
};

export default Footer;
