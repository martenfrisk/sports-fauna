import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout';

const Signup = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit, register, watch, formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage('');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log(res)
      // console.log(data)
      if (res.ok) {
        router.push('/login');
      } else if (data.code) {
        setErrorMessage(() => data.message);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
  });

  return (
    <Layout>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center max-w-2xl">
          <h1 className="mb-6 text-xl">Sign up</h1>

          <form onSubmit={onSubmit}>
            <div className="flex items-end mt-2">
              <label className="w-1/3 mr-2">Email</label>
              <input
                className="w-2/3 px-2 py-1 rounded-md bg-blue-50"
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="email@example.com" />
              {errors.email && (
                <span role="alert" className="text-red-700">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex items-end mt-2">
              <label className="w-1/3 mr-2">Username</label>
              <input
                className="w-2/3 px-2 py-1 rounded-md bg-blue-50"
                type="text"
                {...register('username')}
                placeholder="Your Username" />
            </div>

            <div className="flex items-end mt-2">
              <label className="w-1/3 mr-2">Favorite team</label>
              <input
                className="w-2/3 px-2 py-1 rounded-md bg-blue-50"
                type="text"
                {...register('favTeam')}
                placeholder="Team name" />
            </div>

            <div className="flex items-end mt-2">
              <label className="w-1/3 mr-2">Password</label>
              <input
                className="w-2/3 px-2 py-1 rounded-md bg-blue-50"
                type="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Your password" />
              {errors.password && (
                <span role="alert" className="text-red-700">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex items-end mt-2">
              <label className="w-1/3 mr-2">Confirm password</label>
              <input
                className="w-2/3 px-2 py-1 rounded-md bg-blue-50"
                type="password"
                {...register('password', {
                  validate: (value) => value === watch('password') || 'Password does not match',
                })}
                placeholder="Confirm password" />
              {errors.password2 && (
                <span role="alert" className="text-red-700">
                  {errors.password2.message}
                </span>
              )}
            </div>

            <div className="flex justify-center w-full mt-4">
              <button type="submit" className="btn-blue">
                Sign up
              </button>
            </div>

            {errorMessage && (
              <p role="alert" className="text-red-700">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
