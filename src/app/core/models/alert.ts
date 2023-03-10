import { AlertTypesEnum } from '@core/models/AlertTypes.Enum';

export interface Alert {
  type: AlertTypesEnum;
  message: string;
}
