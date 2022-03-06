import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface INavBtn {
    name:string
}

const NavBtn = ({name}: INavBtn) => {
    const navigate = useNavigate();

    return (
        <Button onClick={() => navigate(`/${name}`)}>{name}</Button>
    )
};

export default NavBtn;

const Button = styled.button`
    margin: 20px;
    padding: 20px;
    border: 0;
    background-color: #454545;
    color: #fff;
`