// @flow

export type PhotoType = {
  base64: string,
  height: number,  
  uri: string,
  width: number,
  pictureOrientation: 1 | 2 | 3 | 4,  
  deviceOrientation: 1 | 2 | 3 | 4,
}