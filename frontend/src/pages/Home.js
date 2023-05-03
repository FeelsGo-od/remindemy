import React from 'react';

import Profile from '../features/users/Profile';

function Home () {
  const userData = JSON.parse(localStorage.getItem('user'))
  const userId = JSON.parse(localStorage.getItem('userId'))
  const userEmail = JSON.parse(localStorage.getItem('userEmail'))

  console.log(localStorage)

  // updating app for old users
  if(userEmail === null) localStorage.clear();

  return (
    <div>
      {userData ? 
        <Profile id={userId} email={userEmail} />
      : 
        <div className='content'>
          You need to <a href='/login'>sign-in</a> or <a href='register'>sign-up</a> to use this app
          <h3 className='align-left w-40 pt-43'>How this app works: </h3>
          <p className='align-left w-40 pt-23'>1. Create new account or login</p>
          <p className='align-left w-40 pt-23'>2. Add your topic(s) on profile page</p>
          <p className='align-left w-40 pt-23'>3. You can add text, images, or link to the topic you want this app to remind you.</p>
          <p className='align-left w-40 pt-23'>
            4. You will get email messages at specific time with 7-3-2-1 method for long-term memory.  
            <a href='https://bettermarketing.pub/use-the-7-3-2-1-method-to-improve-your-long-term-memory-829a43a040f7?gi=4af9ba595253'>Read about it</a>
          </p>
          <h4 className='pt-23'>P.s - last feature is under construction</h4>
        </div>
      }
    </div>
  );
}

export default Home;
