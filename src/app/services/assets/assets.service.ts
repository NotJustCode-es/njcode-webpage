import { Injectable } from '@angular/core';
import { ConfigurationService } from '@core/services/configuration/configuration.service';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  readonly imgPath = `${this.assetsUrl}/assets/img`;

  readonly iconsSolidPath = `${this.assetsUrl}/assets/img/icons/solid`;

  readonly iconsLinealPath = `${this.assetsUrl}/assets/img/icons/lineal`;

  get assetsUrl(): string {
    return this.configurationService.configurationData.assetsUrl;
  }

  constructor(private configurationService: ConfigurationService) {}

  getImgPath(img: string): string {
    return `${this.imgPath}/${img}`;
  }

  getIconSolidPath(icon: string): string {
    return `${this.iconsSolidPath}/${icon}.svg`;
  }

  getIconLinealPath(icon: string): string {
    return `${this.iconsLinealPath}/${icon}.svg`;
  }
}
