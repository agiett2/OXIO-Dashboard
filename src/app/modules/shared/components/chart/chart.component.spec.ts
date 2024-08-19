import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component'; // Replace with actual path to your component
import { By } from '@angular/platform-browser';
import { ChartModule } from 'primeng/chart';
import { IChart } from '../../model/chart.interface';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartModule],
      declarations: [ChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize options on ngOnInit', () => {
    const mockDocumentStyle = {
      getPropertyValue: jasmine.createSpy().and.callFake((prop: string) => {
        switch (prop) {
          case '--text-color':
            return '#333333';
          case '--text-color-secondary':
            return '#555555';
          case '--surface-border':
            return '#cccccc';
          default:
            return '';
        }
      }),
    };
    spyOn(window, 'getComputedStyle').and.returnValue(mockDocumentStyle as any);

    component.ngOnInit();

    expect(component.options).toBeDefined();
    expect(component.options.maintainAspectRatio).toBeFalse();
    expect(component.options.aspectRatio).toBe(0.6);
    expect(component.options.plugins.legend.labels.color).toBe('#333333');
    expect(component.options.scales.x.ticks.color).toBe('#555555');
    expect(component.options.scales.x.grid.color).toBe('#cccccc');
    expect(component.options.scales.y.ticks.color).toBe('#555555');
    expect(component.options.scales.y.grid.color).toBe('#cccccc');
  });

  it('should accept input data', () => {
    const mockData: IChart = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [65, 59, 80],
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          type: 'bar'
        },
      ],
    };

    component.data = mockData;
    fixture.detectChanges();

    expect(component.data).toEqual(mockData);
  });
});
