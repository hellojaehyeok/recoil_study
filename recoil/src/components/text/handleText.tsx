import React from 'react';
import { useRecoilState } from 'recoil';
import textState from '../../state/atom/textState';

const HandleText = ({}) => {
    const [text, setText] = useRecoilState(textState);

    return(
        <input type="text" onChange={e => setText(e.target.value)}/>
    )
};

export default HandleText;