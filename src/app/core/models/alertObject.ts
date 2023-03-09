import { AlertsEnum } from '@core/models/alerts.enum';

export interface AlertObject {
  type: AlertsEnum;
  message: string;
}
