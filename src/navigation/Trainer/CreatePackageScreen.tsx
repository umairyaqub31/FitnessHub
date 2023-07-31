import * as React from 'react';
import {CreatePackage} from '@containers/Trainer';


export default function CreatePackageScreen({navigation, route}) {
  return (
      <CreatePackage navigation={navigation} route={route}/>
  );
}
