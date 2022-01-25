import React from 'react';
import {useStoreState} from 'easy-peasy';
import NavBarPrivate from './NavBarPrivate';


function Home() {
  const user=useStoreState(state=>state.user);
  return (
    <>
    <NavBarPrivate/>
    <h1>Welcome {`${user.username}`}</h1>
    </>
    );
}

export default Home;
