import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import countState from '../../state/atom/countState';

const HandleCount = ({}) => {
    const setCount = useSetRecoilState(countState);
    

    return(
        <>
            <ControlBtn onClick={() => setCount(count=>count+1)}>Increase</ControlBtn>
            <ControlBtn onClick={() => setCount(count=>count-1)}>Decrease</ControlBtn>
        </>
    )

};

export default HandleCount;

const ControlBtn = styled.button`
    border: 1px solid #454545;
    padding: 10px;
`