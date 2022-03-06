import React, { useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import NavBtn from '../components/nav/navBtn';
import fetchApi from '../server/fetchApi';
import { selectUserSelector, userListSelector } from '../state/selector/userSelectors';

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

    useEffect(() => {
        if(userList.state==="hasValue"){
            console.log(userList.contents);
        }else if(userList.state==="loading"){
            console.log("loading...");
        }else if(userList.state==="hasError"){
            console.error("userList error");
        } 
    }, [userList])

    return(
        <Container>
            <Title>UserList</Title>
            <div>
                {
                    userList.state==="hasValue" && userList.contents.map((item:any) => {
                        return(
                            <UserEl key={item.id}>
                                {item.name}
                            </UserEl>
                        )
                    })
                }
            </div>
            <RefreshBtn onClick={refreshUserList}>refresh</RefreshBtn>

            <Title>First user data</Title>
            {/* <UserData>{selectUser.name}</UserData>
            <UserData>{selectUser.email}</UserData>
            <UserData>{selectUser.website}</UserData> */}

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