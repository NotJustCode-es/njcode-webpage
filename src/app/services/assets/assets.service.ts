import { Injectable } from '@angular/core';
import { ConfigurationService } from '@core/services/configuration/configuration.service';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  readonly imgPath = `${this.configurationService.data.asset_url}/assets/img`;

  readonly iconsSolidPath = `${this.configurationService.data.asset_url}/assets/img/icons/solid`;

  constructor(private configurationService: ConfigurationService) {}

  getImgPath(img: string): string {
    return `${this.imgPath}/${img}`;
  }

  getIconSolidPath(icon: string): string {
    return `${this.iconsSolidPath}/${icon}.svg`;
  }
}
