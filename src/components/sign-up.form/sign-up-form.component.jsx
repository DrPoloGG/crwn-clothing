import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utilities/firebase/firebase.utilities';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ( password !== confirmPassword ) {
        alert('Passwords do not match');
        return;
    }

    try {
        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        //const userAuth = { ...user, displayName: displayName };
        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
        //console.log(userAuth);
    } catch(error) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                alert ('Error: Email already exists!');
                break;
            default:
                console.log('user creation encountered an error', error);
                break;
        }
    }

}

  return (
    <div>
      <h1>Sign up with email and password</h1>
      <form onSubmit={ handleSubmit }>
        <label>Display Name</label>
        <input
          required
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
        />

        <label>E-mail</label>
        <input
          required
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          required
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          required
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
        />

        <button type='submit'>Create account</button>
      </form>
    </div>
  );
};

export default SignUpForm;
