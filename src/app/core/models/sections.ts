export const SECTIONS: Map<string, Function> = new Map([
  [
    'section-navbar',
    (): Promise<unknown> => import('@sections/section-navbar/section-navbar.module').then(m => m.SectionNavbarModule),
  ],
  [
    'section-hero',
    (): Promise<unknown> => import('@sections/section-hero/section-hero.module').then(m => m.SectionHeroModule),
  ],
  [
    'section-highlights',
    (): Promise<unknown> => import('@sections/section-highlights/section-highlights.module').then(m => m.SectionHighlightsModule),
  ],
  [
    'section-footer',
    (): Promise<unknown> => import('@sections/section-footer/section-footer.module').then(m => m.SectionFooterModule),
  ],
  [
    'section-process',
    (): Promise<unknown> => import('@sections/section-process/section-process.module').then(m => m.SectionProcessModule),
  ],
  [
    'section-projects',
    (): Promise<unknown> => import('@sections/section-projects/section-projects.module').then(m => m.SectionProjectsModule),
  ],
]);
