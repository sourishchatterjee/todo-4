

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodo, editTodo } from '../Redux/todoSlice';
import "./Todo.css";

function Todo({ id, title, completed, image, date }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newImage, setNewImage] = useState(image);
  const [imagePreview, setImagePreview] = useState(image);
  const [newDate, setNewDate] = useState(date || ''); 

  const handleDelete = () => {
    dispatch(removeTodo(id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleSaveEdit = () => {
    console.log('Saving edit:', { title: newTitle, date: newDate });
    if (newTitle.trim() && newDate) {
      dispatch(editTodo({ id, title: newTitle, image: newImage, date: newDate }));
      setIsEditing(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewImage(imageUrl);
    }
  };

  return (
    <div className='fortodo'>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            placeholder="Edit Title"
          />
          <input 
            type="date" 
            value={newDate} 
            onChange={(e) => setNewDate(e.target.value)} 
          />
          <input 
            type="file" 
            onChange={handleImageChange} 
          />
          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
            />
          )}
          <button onClick={handleSaveEdit}>Save</button>
        </>
      ) : (
        <>
          <p>Title: {title}</p>
          <p>Due Date: {date ? new Date(date).toLocaleDateString() : 'No date set'}</p>
          {image && (
            <img 
              src={image} 
              alt={title} 
              style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
            />
          )}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <p>Completed: {completed ? "Yes" : "No"}</p>
      <button onClick={handleToggle}>{completed ? "Mark Incomplete" : "Mark Complete"}</button>
      <br/>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Todo;
