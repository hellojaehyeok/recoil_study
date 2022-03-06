import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import HandleCount from '../components/count/handleCount';
import NavBtn from '../components/nav/navBtn';
import HandleText from '../components/text/handleText';
import countState from '../state/atom/countState';
import textState from '../state/atom/textState';
import sumCountSelector from '../state/selector/sumCountSelector';
import textLenSelector from '../state/selector/textLenSelector';

const Main = ({}) => {
    const count = useRecoilValue(countState);
    const countSelector = useRecoilValue(sumCountSelector);

    const text = useRecoilValue(textState);
    const textLength = useRecoilValue(textLenSelector);
    

    return(
        <Container>
            
            <Section>
                <Title>Atoms</Title>
                current count : {count} <br />
                current text : {text}
            </Section>

            <Section>
                <Title>Selector</Title>
                current count+1 : {countSelector} <br />
                current text Length: {textLength}
            </Section>
            
            <Section>
                <Title>handle zone</Title>
                <HandleCount />  <br />
                <HandleText />
            </Section>

            <NavBtn name='async' />
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
