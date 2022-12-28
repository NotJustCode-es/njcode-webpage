import { SectionFooterModule } from '@sections/section-footer/section-footer.module';
import { SectionNavbarModule } from '@sections/section-navbar/section-navbar.module';

export const SECTIONS: Map<string, Function> = new Map([
  [
    'section-navbar',
    (): Promise<typeof SectionNavbarModule> => import('@sections/section-navbar/section-navbar.module').then(m => m.SectionNavbarModule),
  ],
  [
    'section-footer',
    (): Promise<typeof SectionFooterModule> => import('@sections/section-footer/section-footer.module').then(m => m.SectionFooterModule),
  ],
]);
