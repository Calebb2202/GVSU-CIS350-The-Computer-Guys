
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUserStore } from '../store/stores';
import { Logo } from './Icons';

interface SignInForm {
  email: string;
}

export const SignInPage = () => {
  const navigate = useNavigate();
  const signIn = useUserStore((state) => state.signIn);
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>();

  const onSubmit = (data: SignInForm) => {
    signIn(data.email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <Logo className="h-16 w-16 mx-auto" />
            <h1 className="text-3xl font-bold text-white mt-4">Welcome to Syntax Sensei</h1>
            <p className="text-slate-400 mt-2">Sign in to continue your learning journey.</p>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email Address (mock)
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address"
                    }
                })}
                defaultValue="learner@syntax.com"
                className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 transition-colors"
              >
                Sign In & Start Learning
              </button>
            </div>
          </form>
          <p className="text-center mt-6 text-xs text-slate-500">
            This is a mock sign-in. Any valid email format will work.
          </p>
        </div>
      </div>
    </div>
  );
};
