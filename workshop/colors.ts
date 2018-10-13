export const PRIMARY_COLOR: string = '#f26522';
export const SECONDARY_COLOR: string = '#F5FCFF';

export const PRIMARY_COLOR_NAME: string = 'primary';
export const SECONDARY_COLOR_NAME: string = 'secondary';

interface ColorMapInterface {
  [key: string]: string;
}

const colorMap: ColorMapInterface = {
  [PRIMARY_COLOR_NAME]: PRIMARY_COLOR,
  [SECONDARY_COLOR_NAME]: SECONDARY_COLOR
};

export default colorMap;
