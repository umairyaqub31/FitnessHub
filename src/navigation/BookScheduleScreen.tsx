import * as React from 'react';
import {BookSchedule} from '@containers';


export default function BookScheduleScreen({navigation,route}) {
  return (
      <BookSchedule navigation={navigation} route={route}/>
  );
}
