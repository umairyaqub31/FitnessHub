import * as React from 'react';
import {CreateNewPassword} from '@containers/Trainer';

export default function CreateNewPasswordScreen({navigation,route}) {
  return (
      <CreateNewPassword navigation={navigation} route={route}/>
  );
}

