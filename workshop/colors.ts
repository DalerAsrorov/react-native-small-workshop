export const PRIMARY_COLOR: string = '#f26522';
export const SECONDARY_COLOR: string = '#F5FCFF';
export const GREY_COLOR: string = '#BEBEBE';

export const PRIMARY_COLOR_NAME: string = 'primary';
export const SECONDARY_COLOR_NAME: string = 'secondary';
export const GREY_COLOR_NAME: string = 'grey';

interface ColorMapInterface {
  [key: string]: string;
}

const colorMap: ColorMapInterface = {
  [PRIMARY_COLOR_NAME]: PRIMARY_COLOR,
  [SECONDARY_COLOR_NAME]: SECONDARY_COLOR,
  [GREY_COLOR_NAME]: GREY_COLOR
};

export default colorMap;
