import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import HandleCount from '../components/count/handleCount';
import HandleText from '../components/text/handleText';
import countState from '../state/atom/countState';
import textState from '../state/atom/textState';

const Main = ({}) => {
    const [count, setCount] = useRecoilState(countState);
    const [text, setText] = useRecoilState(textState);

    return(
        <Container>
            
            <Section>
                <Title>Atoms</Title>
                current count : {count} <br />
                current text : {text}
            </Section>
            
            <Section>
                <Title>handle zone</Title>
                <HandleCount />  <br />
                <HandleText />
            </Section>

        </Container>
    )
};

export default Main;


const Container = styled.div`
    padding: 100px;
`
const Section = styled.div`
    margin-bottom: 50px;
`
const Title = styled.h1`
    color: #454545;
`
