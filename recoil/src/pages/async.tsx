import React, { useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import NavBtn from '../components/nav/navBtn';
import { selectUserSelector, userListSelector } from '../state/selector/userSelectors';
import UserType from '../type/userType';

const Async = ({}) => {
    // loadable
    const userList = useRecoilValueLoadable(userListSelector);
    
    // refresh
    const refreshUserList = useRecoilRefresher_UNSTABLE(userListSelector);

    // common async - Suspense 필요
    // const userList = useRecoilValue(userListSelector);
    // const selectUser = useRecoilValue(selectUserSelector(1));

    // useEffect(() => {
    //     refreshUserList();
    // }, [])
    
    // useEffect(() => {
    //     fetchUserData();
    // }, []);
    // const fetchUserData = async () => {
    //     const res = await fetchApi(`users/1`, "GET");
    //     console.log(res);
    // }


    return(
        <Container>
            <Title>UserList</Title>
            <div>
                {
                    userList.state==="hasValue" && userList.contents.map((item:UserType) => {
                        return(
                            <UserEl key={item.id}>
                                {item.name}
                            </UserEl>
                        )
                    })
                }
            </div>
            <RefreshBtn onClick={refreshUserList}>Refresh UserData</RefreshBtn>


            <Title>First user data</Title>

            <NavBtn name=''/>
        </Container>
    )
};

export default Async;

const Container = styled.div`
    padding: 100px;
`
const Title = styled.h1`
    color:#454545;
`
const RefreshBtn = styled.button`
    background-color: #9fe5ff;
    border:0;
    padding: 10px;
`
const UserEl = styled.div`
    margin-bottom: 10px;
`