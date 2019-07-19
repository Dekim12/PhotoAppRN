// @flow

export type PhotoType = {
  base64: string,
  height: number,
  uri: string,
  width: number,
  pictureOrientation: 1 | 2 | 3 | 4,
  deviceOrientation: 1 | 2 | 3 | 4
}

export type PhotoDataType = {
  filename: string,
  uri: string,
  height: number,
  width: number,
  isStored?: boolean,
  playableDuration: number
}

export type PhotoOrientationSizes = {
  photoWidth: number,
  photoHeight: number
}

export type PhotoSizes = {
  vertical: PhotoOrientationSizes,
  horizontal: PhotoOrientationSizes
}