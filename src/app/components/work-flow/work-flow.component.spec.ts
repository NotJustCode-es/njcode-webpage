import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkFlowComponent } from '@components/work-flow/work-flow.component';
import { Asset } from 'contentful';

describe('WorkFlowComponent', () => {
  let component: WorkFlowComponent;
  let fixture: ComponentFixture<WorkFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkFlowComponent],
    })
      .compileComponents();
    fixture = TestBed.createComponent(WorkFlowComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'test',
      title: 'test',
      description: 'test',
      checklist: ['test'],
      workflowImage: null as unknown as Asset,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
