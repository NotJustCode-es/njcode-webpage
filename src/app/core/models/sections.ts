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
    'section-companies',
    (): Promise<unknown> => import('@sections/section-companies/section-companies.module').then(m => m.SectionCompaniesModule),
  ],
  [
    'section-clients',
    (): Promise<unknown> => import('@sections/section-clients/section-clients.module').then(m => m.SectionClientsModule),
  ],
  [
    'section-process',
    (): Promise<unknown> => import('@sections/section-process/section-process.module').then(m => m.SectionProcessModule),
  ],
  [
    'section-explanation',
    (): Promise<unknown> => import('@sections/section-explanation/section-explanation.module').then(m => m.SectionExplanationModule),
  ],
  [
    'section-explanation-collapsed',
    (): Promise<unknown> => import('@sections/section-explanation-collapsed/section-explanation-collapsed.module')
      .then(m => m.SectionExplanationCollapsedModule),
  ],
  [
    'section-review',
    (): Promise<unknown> => import('@sections/section-review/section-review.module').then(m => m.SectionReviewModule),
  ],
  [
    'section-contact-form',
    (): Promise<unknown> => import('@sections/section-contact-form/section-contact-form.module').then(m => m.SectionContactFormModule),
  ],
  [
    'section-legal',
    (): Promise<unknown> => import('@sections/section-legal/section-legal.module').then(m => m.SectionLegalModule),
  ],
  [
    'section-project',
    (): Promise<unknown> => import('@sections/section-project/section-project.module').then(m => m.SectionProjectModule),
  ],
  [
    'section-posts',
    (): Promise<unknown> => import('@sections/section-posts/section-posts.module').then(m => m.SectionPostsModule),
  ],
  [
    'section-steps',
    (): Promise<unknown> => import('@sections/section-steps/section-steps.module').then(m => m.SectionStepsModule),
  ],
]);
