import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import study from '../../resources/study.png';

interface ImageProps {
    width: number;
    height: number;
}

const Image = styled.img`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;

const Study: React.FC<ImageProps> =({ width, height }) => {
    return <Image src={study} width={width} height={height} alt="study" />;
}

export default Study;