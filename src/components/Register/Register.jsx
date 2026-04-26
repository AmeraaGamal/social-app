import React, { useState } from  'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schema = zod
  .object({
    name: zod
      .string()
      .nonempty('name is required')
      .min(3, 'min length is 3 chars')
      .max(10, 'max length is 10 chars'),

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

    rePassword: zod.string().nonempty('confirm password is required'),

    dateOfBirth: zod.string().refine((date) => {
      const userDate = new Date(date);
      const currentDate = new Date();
      return currentDate.getFullYear() - userDate.getFullYear() > 10;
    }),

    gender: zod.enum(['male', 'female']),
  })
  .refine(
    (object) => {
      return object.password === object.rePassword;
    },
    {
      message: 'Passwords do not match',
      path: ['rePassword'],
    }
  );

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: '',
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

async function handelRegister(data) {
  setIsLoading(true);
  setApiError(null); // نصيحة: صفر الخطأ في بداية المحاولة

  // 1. شيل الـ rePassword قبل ما تبعت للداتابيز لأنها مش بتحتاجه
  const { rePassword, ...sendData } = data;

  try {
    const res = await axios.post('http://localhost:3000/users', sendData);
    console.log('Registration successful:', res.data);

    // 2. الانتقال لصفحة اللوجن
navigate('/login', { replace: true });
  } catch (err) {
    console.error(err);
    // 3. تصحيح السطر ده (شيل الـ err اللي بعد الكومة)
    setApiError('Registration failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
}
  const { register, handleSubmit, formState } = form;

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl font-bold">Register Now</h1>
        {apiError && (
          <p className="bg-red-600 text-white m-5 mx-auto p-2 font-bold rounded-sm w-[400px]">
            {apiError}
          </p>
        )}
        <form
          onSubmit={handleSubmit(handelRegister)}
          className="max-w-md mx-auto my-7"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register('name')}
              type="text"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute start-[5px] top-[5px] text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]"
            >
              Enter Your Name
            </label>
            {formState.errors.name && formState.touchedFields.name && (
              <p className="bg-slate-100 text-red-500 text-sm p-1 m-2 rounded-sm font-bold">
                {formState.errors.name?.message}
              </p>
            )}
          </div>

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

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register('rePassword')}
              type="password"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="absolute start-[5px] top-[5px] text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]"
            >
              Enter Your Confirm Password
            </label>
            {formState.errors.rePassword && (
              <p className="bg-slate-100 text-red-500 text-sm p-1 m-2 rounded-sm font-bold">
                {formState.errors.rePassword.message}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register('dateOfBirth')}
              type="date"
              id="date"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="date"
              className="absolute start-[5px] top-[5px] text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]"
            >
              Enter Your Birthday
            </label>
            {formState.errors.dateOfBirth &&
              formState.touchedFields.dateOfBirth && (
                <p className="bg-slate-100 text-red-500 text-sm p-1 m-2 rounded-sm font-bold">
                  {formState.errors.dateOfBirth?.message}
                </p>
              )}
          </div>

          <div className="flex gap-4">
            <div className="flex items-center mb-4">
              <input
                {...register('gender')}
                id="male"
                type="radio"
                value="male"
                className="w-4 h-4"
              />
              <label htmlFor="male" className="ms-2 text-sm font-medium">
                Male
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                {...register('gender')}
                id="female"
                type="radio"
                value="female"
                className="w-4 h-4"
              />
              <label htmlFor="female" className="ms-2 text-sm font-medium">
                Female
              </label>
            </div>

            {formState.errors.gender && (
              <p className="text-red-500 bg-slate-100 text-sm p-1 m-2 rounded-sm font-bold">
                {formState.errors.gender.message}
              </p>
            )}
          </div>

          <button
          disabled= {isLoading}
            type="submit"
            className="text-white disabled:bg-slate-400 disabled:cursor-not-allowed bg-blue-500 rounded-2xl w-full hover:bg-blue-600 cursor-pointer px-4 py-2.5"
          >
            {isLoading ? 'loading...': 'Register'}
          </button>
        </form>
      </div>
    </>
  );
}
