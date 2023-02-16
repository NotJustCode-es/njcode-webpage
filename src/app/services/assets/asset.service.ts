import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  readonly iconsSolidPath = 'assets/theme/img/icons/solid';

  getIconSolidPath(icon: string): string {
    return `${this.iconsSolidPath}/${icon}.svg`;
  }
}
