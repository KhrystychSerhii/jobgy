const ImageOptions = {
  title: 'Select a Photo',
  cancelButtonTitle: 'CANCEL',
  takePhotoButtonTitle: 'Take Photo...',
  chooseFromLibraryButtonTitle: 'Choose from Gallery...',
  maxWidth: 1200, // photos only
  maxHeight: 1200, // photos only
  rotation: 360,
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default ImageOptions;
