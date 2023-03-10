import { AlertTypesEnum } from '@core/models/alert-types.enum';

export interface Alert {
  type: AlertTypesEnum;
  message: string;
}
