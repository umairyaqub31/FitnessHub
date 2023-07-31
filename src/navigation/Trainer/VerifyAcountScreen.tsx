import * as React from 'react';
import {VerifyAccount} from '@containers/Trainer';

export default function VerifyAccountScreen({navigation,route}) {
  return (
      <VerifyAccount navigation={navigation} route={route}/>
  );
}
