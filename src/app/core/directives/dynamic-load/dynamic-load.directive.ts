import {
  createNgModuleRef,
  Directive, Injector, Input, NgModuleRef, ViewContainerRef,
} from '@angular/core';
import { DynamicSection } from '@core/models/dynamic-section';
import { SectionDynamicComponent } from '@core/models/section-component';
import { SECTIONS } from '@core/models/sections';

@Directive({
  selector: '[appDynamicLoad]',
})
export class DynamicLoadDirective {
  @Input('appDynamicLoad')
  set dynamicLoad(dynamicSection: DynamicSection) {
    this.loadSection(dynamicSection);
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private inject: Injector,
  ) {}

  private loadSection(section: DynamicSection): void {
    if (this.existsSectionModule(section.id)) {
      this.createSection(section);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Section ${section.id} does not exist`);
    }
  }

  private existsSectionModule(sectionId: string): boolean {
    return SECTIONS.has(sectionId);
  }

  private async createSection(section: DynamicSection): Promise<void> {
    const { id, data } = section;
    const sectionModule = SECTIONS.get(id);
    if (sectionModule) {
      const module = await sectionModule();
      const moduleRef: NgModuleRef<SectionDynamicComponent> = createNgModuleRef(module, this.inject);
      this.viewContainerRef.clear();
      if (!module.component) {
        throw new Error(`Module ${id} does not have a static component property defined`);
      }
      const componentRef = this.viewContainerRef.createComponent<SectionDynamicComponent>(module.component, {
        ngModuleRef: moduleRef,
      });
      componentRef.instance['data'] = data;
      componentRef.hostView.detectChanges();
    }
  }
}
