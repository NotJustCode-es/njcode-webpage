import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  readonly imgPath = `${environment.assetsUrl}/assets/img`;

  readonly iconsSolidPath = `${environment.assetsUrl}/assets/img/icons/solid`;

  getImgPath(img: string): string {
    return `${this.imgPath}/${img}`;
  }

  getIconSolidPath(icon: string): string {
    return `${this.iconsSolidPath}/${icon}.svg`;
  }
}
