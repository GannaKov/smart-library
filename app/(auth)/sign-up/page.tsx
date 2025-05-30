'use client';
import React from 'react';
import { signUpSchema } from '@/lib/validations';
import AuthForm from '@/components/AuthForm';
import { signUp } from '@/lib/actions/auth';

const page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: '',
      password: '',
      universityId: 0,
      universityCard: '',
      fullName: '',
    }}
    onSubmit={signUp}
  />
);

export default page;
