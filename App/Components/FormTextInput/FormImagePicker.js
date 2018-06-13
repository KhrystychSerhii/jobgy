import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

import ImageOptions from '../../Config/ImagePickerConfig';

import ImagePicker from 'react-native-image-picker';

import I18n from '../../I18n'

import { Images } from '../../Themes';

import WhiteBlock from '../../Components/WhiteBlock';

import styles from './styles';

// const imageOptions = {
//   title: 'Select a Photo',
//   cancelButtonTitle: 'CANCEL',
//   takePhotoButtonTitle: 'Take Photo...',
//   chooseFromLibraryButtonTitle: 'Choose from Gallery...',
//   maxWidth: 1200, // photos only
//   maxHeight: 1200, // photos only
//   rotation: 360,
//   mediaType: 'photo',
//   storageOptions: {
//     skipBackup: true,
//     path: 'images'
//   }
// };

class FormImagePicker extends React.Component {

  state = {
    imageSelected: false
  };

  openImagePicker = () => {
    ImagePicker.showImagePicker(ImageOptions, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({imageSelected: true});
        console.log('response', response);
        console.log('response.uri', response.uri);
        this.props.onChange({
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });
        // const body = new FormData();
        // body.append('file', file);
        //
        // return Api.uploadFile('/api/Message/UploadFile', body)
        //   .then(response => {
        //     return response;
        //   }).catch((exception) => {
        //     throw exception;
        //   });
      }
    });
  };

  render() {
    const { disabled, valid, required, placeholder, ln, makeTouched } = this.props;
    return (
      <WhiteBlock style={[styles.imagePickerWrapper, this.state.imageSelected ? styles.withValueWrapper : disabled ? styles.disabledWrapper : styles.enabledWrapper]}>
        <TouchableOpacity style={styles.button} onPress={() => { this.openImagePicker(); !!makeTouched ? makeTouched() : null }}>
          <View style={[styles.textWrapper, {paddingLeft: 35}]}>
            <Text style={[styles.labelText, this.state.imageSelected ? {textAlign: 'right'} : {textAlign: 'center'}]}>{placeholder}</Text>
            {
              this.state.imageSelected ?
                <Text style={[styles.textInput, { textAlign: 'right'}]}>
                  {I18n.t('translation.imageSelected', {locale: ln})}
                </Text> : null
            }
          </View>
          <Image
            style={styles.cameraImage}
            resizeMode={'contain'}
            source={Images.camera}
          />
          {
            this.state.imageSelected ?
              <Image
                style={styles.validCheckmark}
                resizeMode={'contain'}
                source={Images.successCheckIcon}
              /> : null
          }
        </TouchableOpacity>
      </WhiteBlock>
    )
  }
}

FormImagePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  ln: PropTypes.string,
  makeTouched: PropTypes.func
};

export default FormImagePicker;

