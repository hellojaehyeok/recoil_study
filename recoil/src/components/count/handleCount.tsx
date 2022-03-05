import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import countState from '../../state/atom/countState';

const HandleCount = ({}) => {
    const [count, setCount] = useRecoilState(countState);
    

    return(
        <>
            <ControlBtn onClick={() => setCount(count+1)}>Increase</ControlBtn>
            <ControlBtn onClick={() => setCount(count-1)}>Decrease</ControlBtn>
        </>
    )

};

export default HandleCount;

const ControlBtn = styled.button`
    border: 1px solid #454545;
    padding: 10px;
`