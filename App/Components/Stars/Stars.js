import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';
import { Images } from '../../Themes'
import styles from './styles';

class Stars extends React.Component {

  render() {
    const {rating, onPress} = this.props;
    let stars = [];
    for (let i = 1, length = 5; i <= length; i++) {
      stars.push(i <= Math.ceil(rating));
    }
    return (
      <TouchableOpacity
        activeOpacity={!!onPress ? .2 : 1}
        style={styles.starWrapper}
        onPress={!!onPress ? onPress : null}
      >
        {
          stars.map((item, i) =>
            <Image key={i} source={Images.starIcon} style={[styles.star, item ? styles.activeStar : styles.disabledStar]} />
          )
        }
      </TouchableOpacity>
    )
  }
}

Stars.propTypes = {
  rating: PropTypes.number,
  onPress: PropTypes.func
};

export default Stars;
