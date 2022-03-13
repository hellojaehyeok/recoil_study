import React from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import countState from '../../state/atom/countState';
import sumCountSelector from '../../state/selector/sumCountSelector';

const HandleCount = ({}) => {
    const setCount = useSetRecoilState(countState);
    const resetCount = useResetRecoilState(countState);
    const [sumCount, setSumCount] = useRecoilState(sumCountSelector);
    const resetSumCount = useResetRecoilState(sumCountSelector);

    return(
        <>
            <ControlBtn onClick={() => setCount(count=>count+1)}>Increase</ControlBtn>
            <ControlBtn onClick={() => setCount(count=>count-1)}>Decrease</ControlBtn>
            <ControlBtn onClick={() => setSumCount(sumCount)}>plus 10 (selector)</ControlBtn>
            <ControlBtn onClick={resetCount}>reset couny</ControlBtn>
            <ControlBtn onClick={resetSumCount}>resetSumCount (selector)</ControlBtn>
        </>
    )

};

export default HandleCount;

const ControlBtn = styled.button`
    border: 1px solid #454545;
    padding: 10px;
`