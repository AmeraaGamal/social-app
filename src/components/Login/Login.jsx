import React, { useState } from  'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schema = zod
  .object({


    email: zod
      .email('invalid email')
      .regex(/^\S+@\S+$/i, 'invalid email format')
      .nonempty('email is required'),

    password: zod
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        'Password must contain uppercase, lowercase, number, special character and be 8-15 chars'
      )
      .nonempty('password is required'),

   
  })
 

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

 async function handelLogin(data) {
   setIsLoading(true);
   setApiError(null);

   try {
     const res = await axios.get('http://localhost:3000/users');

     const user = res.data.find(
       (u) => u.email === data.email && u.password === data.password
     );

     if (user) {
       console.log('Login successful:', user);

       // تخزين المستخدم
      // localStorage.setItem('user', JSON.stringify(user));

       navigate('/');
     } else {
       setApiError('Invalid email or password');
     }
   } catch (err) {
     console.log(err);
     setApiError('Something went wrong');
   } finally {
     setIsLoading(false);
   }
 }

  const { register, handleSubmit, formState } = form;

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl font-bold">Login </h1>
        {apiError && (
          <p className="bg-red-600 text-white m-5 mx-auto p-2 font-bold rounded-sm w-[400px]">
            {apiError}
          </p>
        )}
        <form
          onSubmit={handleSubmit(handelLogin)}
          className="max-w-md mx-auto my-7"
        >
          

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register('email')}
              type="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute start-[5px] top-[5px] text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]"
            >
              Enter Your Email
            </label>
            {formState.errors.email && formState.touchedFields.email && (
              <p className="bg-slate-100 text-red-500 text-sm p-1 m-2 rounded-sm font-bold">
                {formState.errors.email?.message}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register('password')}
              type="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute start-[5px] top-[5px] text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]"
            >
              Enter Your password
            </label>
            {formState.errors.password && formState.touchedFields.password && (
              <p className="bg-slate-100 text-red-500 rounded-sm p-1 m-2 font-bold">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          <button
          disabled= {isLoading}
            type="submit"
            className="text-white disabled:bg-slate-400 disabled:cursor-not-allowed bg-blue-500 rounded-2xl w-full hover:bg-blue-600 cursor-pointer px-4 py-2.5"
          >
            {isLoading ? 'loading...': 'Login'}
          </button>
        </form>
      </div>
    </>
  );
}
