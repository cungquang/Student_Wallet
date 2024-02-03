import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.footer`
    border: 1px solid black;
`;


const Header: React.FC = () => {
    return (
        <div>
            <HeaderWrapper>
                App Name
            </HeaderWrapper>
        </div>
    );
};

export default Header;
