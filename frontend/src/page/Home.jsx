import React, { useState } from 'react'
import { Head } from '../components/Head/Head'
import Login from '../components/Login/Login';

import Post from '../components/Post/Post';


export default function Home() {
  const [username, setUsername] = useState('');
  return (
    <>
  <Head />
  <section className='section'>

 

      {username ? (
        <Post username={username} />
      ) : (
        
        <Login onSubmit={setUsername} />
      )}
 </section>
  


  
  
    </>
  )
}