import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from '../../utilities/firebase/firebase.utilities';

import SignUpForm from '../../components/sign-up.form/sign-up-form.component';

const SignIn = () => {

  // Setting up SignInWithRedirect()  
  /* useEffect( () => {
    const getRedirectResponse = async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }
    getRedirectResponse();
    //console.log(redirectResponse);
    }, []); */

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In With Google</button>

      <SignUpForm />
    </div>
  );
};

export default SignIn;
