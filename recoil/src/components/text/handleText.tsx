import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import textState from '../../state/atom/textState';

const HandleText = ({}) => {
    const setText = useSetRecoilState(textState);

    return(
        <input type="text" onChange={e => setText(e.target.value)}/>
    )
};

export default HandleText;