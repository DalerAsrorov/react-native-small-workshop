export const PRIMARY_COLOR: string = '#f26522';
export const SECONDARY_COLOR: string = '#F5FCFF';
export const GREY_COLOR: string = '#BEBEBE';
export const DARK_GREY_COLOR: string = '#909090';

export const PRIMARY_COLOR_NAME: string = 'primary';
export const SECONDARY_COLOR_NAME: string = 'secondary';
export const GREY_COLOR_NAME: string = 'grey';
export const DARK_GREY_COLOR_NAME: string = 'darkGrey';

interface ColorMapInterface {
  [key: string]: string;
}

const colorMap: ColorMapInterface = {
  [PRIMARY_COLOR_NAME]: PRIMARY_COLOR,
  [SECONDARY_COLOR_NAME]: SECONDARY_COLOR,
  [GREY_COLOR_NAME]: GREY_COLOR,
  [DARK_GREY_COLOR_NAME]: DARK_GREY_COLOR
};

export default colorMap;
