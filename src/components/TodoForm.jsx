
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addTodo } from '../Redux/todoSlice';
import { nanoid } from '@reduxjs/toolkit';

import "./Form.css";

const schema = yup.object().shape({
  todo: yup.string().trim().required('Todo title is required'),
  date: yup.date().required('Due date is required').nullable(),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileSize', 'File too large', value => value && value[0] && value[0].size <= 2000000) // 2 MB limit
    .test('fileType', 'Unsupported Format', value => value && value[0] && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type))
});

function TodoForm() {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newTodo = {
      id: nanoid(),
      title: data.todo,
      completed: false,
      date: data.date.toISOString(), 
      image: data.image[0] ? URL.createObjectURL(data.image[0]) : null,
    };
    
    dispatch(addTodo(newTodo));
    reset();
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('todo')}
        placeholder="Enter a todo"
      />
      {errors.todo && <p style={{ color: 'red' }}>{errors.todo.message}</p>}
      
      <input
        type="date"
        {...register('date')} 
      />
      {errors.date && <p style={{ color: 'red' }}>{errors.date.message}</p>}
      
      <input
        type="file"
        accept="image/*"
        {...register('image')}
        onChange={handleImageChange}
      />
      {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
      
      {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '80px', height: '60px', borderRadius: '50%' }} />}
      
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;

