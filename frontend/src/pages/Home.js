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
        <div className='content'>
          You need to <a href='/login'>sign-in</a> or <a href='register'>sign-up</a> to use this app
          <h3 className='align-left w-40 pt-43'>How this app works: </h3>
          <p className='align-left w-40 pt-23'>- You should create new or login to your account</p>
          <p className='align-left w-40 pt-23'>- Add new topic on profile page</p>
          <p className='align-left w-40 pt-23'>- You can add text, images, or link to the topic you want this app to remind you.</p>
          <p className='align-left w-40 pt-23'>- You should see that new topic on your profile page</p>
          <p className='align-left w-40 pt-23'>- You should also get email messages at specific time with 7-3-2-1 method for long-term memory.</p>
          <h4 className='pt-23'>P.s - last 3 features are under construction</h4>
        </div>
      }
    </div>
  );
}

export default Home;
