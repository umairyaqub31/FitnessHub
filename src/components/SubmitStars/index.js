import React, {Component, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {colors} from '@config';
function SubmitStars(props) {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => props.setDefaultRating(item)}>
            {item <= props.defaultRating ? (
              <FontAwesome
                style={styles.stars}
                name="star"
                size={55}
                color={colors.primary}
              />
            ) : (
              <FontAwesome
                style={styles.stars}
                // name="star-o"
                name="star"
                size={55}
                color="#E9E9E9"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </>
  );
}

export default SubmitStars;
