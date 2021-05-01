/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '@/utils/firebase';

const EditUser = ({ defaultValues, id }: { defaultValues: any, id: string }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const {
    handleSubmit, register, reset, formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = handleSubmit(async ({ username, favTeam }) => {
    if (errorMessage) setErrorMessage('');
    setUpdateMessage(() => '');

    try {
      db.ref(`users/${id}`).update({
        username,
        favTeam,
      });
      setUpdateMessage(() => 'Profile updated');
      // setData(() => ({ email, username, favTeam }))
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return <>
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-center justify-between w-full mb-2">
        <label>Email</label>
        <input
          type="text"
          disabled
          {...register('email', { required: 'Email is required' })}
          className="p-2 ml-2 text-right bg-gray-200 border-2 border-blue-100 rounded-md shadow-md cursor-not-allowed" />
        {errors.email && (
        <span role="alert">
          {errors.email.message}
        </span>
        )}
      </div>
      <div className="flex items-center justify-between w-full mb-2">
        <label>Username</label>
        <input
          type="text"
          {...register('username', { required: 'Username is required' })}
          className="p-2 ml-2 text-right border-2 border-blue-100 rounded-md shadow-md" />
        {errors.username && (
        <span role="alert">
          {errors.username.message}
        </span>
        )}
      </div>

      <div className="flex items-center justify-between w-full mb-2">
        <label>Favorite Team</label>
        <input
          type="text"
          {...register('favTeam')}
          className="p-2 ml-2 text-right border-2 border-blue-100 rounded-md shadow-md" />
        {errors.favTeam && (
        <span role="alert">
          {errors.favTeam.message}
        </span>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button type="submit" className="px-4 py-2 text-white rounded-md bg-gradient-to-tr from-blue-700 to-blue-400">Update</button>
      </div>
    </form>

    {updateMessage && (
    <p className="py-4 mt-6 text-center bg-opacity-50 rounded-md bg-blue-50">
      {updateMessage}
    </p>
    )}
    {errorMessage && (
    <p role="alert" className="w-64 mx-auto mt-4 text-xs text-center text-red-700">
      An error occurred. That username or email is probably already registered.
    </p>
    )}
  </>;
};

export default EditUser;
