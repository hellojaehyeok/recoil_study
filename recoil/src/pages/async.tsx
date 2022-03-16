import React, { useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import NavBtn from '../components/nav/navBtn';
import fetchApi from '../server/fetchApi';
import clickUserIdState from '../state/atom/clickUserIdState';
import { clickUserSelector, selectUserSelector, userListSelector } from '../state/selector/userSelectors';
import UserType from '../type/userType';

const Async = ({}) => {
    // loadable
    const userList = useRecoilValueLoadable(userListSelector);
    
    // refresh
    const refreshUserList = useRecoilRefresher_UNSTABLE(userListSelector);

    const [clickId, setClickId] = useRecoilState(clickUserIdState);
    const clickUserData = useRecoilValueLoadable(clickUserSelector);

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

    const onClickUser = (id: number) => {
        setClickId(id);
    }

    return(
        <Container>
            <Title>UserList</Title>
            <div>
                {
                    userList.state==="hasValue" && userList.contents.map((item:UserType) => {
                        return(
                            <UserEl key={item.id} onClick={() => onClickUser(item.id)}>
                                {item.name}
                            </UserEl>
                        )
                    })
                }
            </div>
            <RefreshBtn onClick={refreshUserList}>Refresh UserData</RefreshBtn>
            
            <Title>Click Data</Title>
            {
                clickUserData.state==="hasValue" ? 
                <>
                    <div>{clickUserData.contents.name}</div>
                    <div>{clickUserData.contents.email}</div>
                    <div>{clickUserData.contents.phone}</div>
                </>
                :
                <div>loading</div>
            }
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
    cursor: pointer;
`