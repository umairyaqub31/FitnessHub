import * as React from 'react';
import {SignUp} from '@containers';

export default function SignUpScreen({navigation,route}) {
  return (
      <SignUp navigation={navigation} route={route}/>
  );
}
