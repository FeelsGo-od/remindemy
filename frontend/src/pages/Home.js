import React from 'react';

import Profile from '../features/users/Profile';

function Home () {
  const userData = JSON.parse(localStorage.getItem('user'))
  const userId = JSON.parse(localStorage.getItem('userId'))

  return (
    <div>
      {userData ? 
        <Profile id={userId} />
      : 
        <div className='content'>You need to <a href='/login'>sign-in</a> or <a href='register'>sign-up</a> to use this app</div>
      }
    </div>
  );
}

export default Home;
