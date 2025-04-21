import { useState } from 'react';
import "./Login.css"
import Title from '../Title/Tlite';

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
    }
  };

  return (

     

    <div className="signup">

 <Title text="Welcome to CodeLeap Network!" theme={"h2"} />

    
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Please enter your username</label>
        <input style={{marginTop:"5px"}}
          type="text"
          placeholder="Enter your username"
          value={username}
           className="form-control  text-secondary"
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className='btn-login'>
        <button  disabled={!username} 
        type='submit'
        className={!username.trim() ? 'disabled' : ''}
        >ENTER</button>



        </div>
      
   
      </form>
    </div>

  );
};

export default Login;