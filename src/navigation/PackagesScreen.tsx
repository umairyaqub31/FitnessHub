import * as React from 'react';
import {Packages} from '@containers';


export default function PackagesScreen({navigation,route}) {
  return (
      <Packages navigation={navigation} route={route}/>
  );
}
