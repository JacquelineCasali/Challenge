import React, { useState } from 'react'
import "./Post.css"
import Title from '../Title/Tlite';
export default function CadastroPost({onSubmit}) {
    const [title,setTitle]=useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (title.trim() && content.trim()) {
          onSubmit({ title, content });
          setTitle('');
          setContent('');
        }
      };



  return (
    <section className='post-form '>
             <Title text="What’s on your mind?"  />

    <label htmlFor="">Title</label>
    <input style={{marginTop:"5px"}}
          type="text"
          placeholder="Hello world"
          value={title}
           className="form-control  text-secondary"
          onChange={(e) => setTitle(e.target.value)}
        />
      <div className='text'>
      <label htmlFor="">Content</label>
   <textarea 
     className="form-control  text-secondary"
    placeholder="Content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
          </div>
    <div className='btn-login'>
    <button 
        onClick={handleSubmit} 
        disabled={!title.trim() || !content.trim()}
        className={!title.trim() || !content.trim() ? 'disabled' : ''}
        >Create</button>
    </div>
   

  
        
    
  </section>
  )
}
