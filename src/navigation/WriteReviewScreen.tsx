import * as React from 'react';
import {WriteReview} from '@containers';

export default function WriteReviewScreen({navigation,route}) {
  return (
      <WriteReview navigation={navigation} route={route}/>
  );
}
