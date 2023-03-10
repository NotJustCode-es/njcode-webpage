import { AlertTypesEnum } from '@core/models/AlertTypes.Enum';

export interface AlertObject {
  type: AlertTypesEnum;
  message: string;
}
