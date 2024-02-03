import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    border: 1px solid black;
`;

const Footer: React.FC = () => {
    return (
        <div>
            <FooterWrapper>
                &copy; 2023 My React App. All rights reserved.
            </FooterWrapper>
        </div>
    );
};

export default Footer;
