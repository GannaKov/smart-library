'use client';
import React from 'react';
import { signUpSchema } from '@/lib/validations';
import AuthForm from '@/components/AuthForm';

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
    // onSubmit={() => {}}
  />
);

export default page;
