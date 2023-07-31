import * as React from 'react';
import {ClientRequest} from '@containers/Trainer';

export default function ClientRequestScreen({navigation,route}) {
  return (
      <ClientRequest navigation={navigation} route={route}/>
  );
}

