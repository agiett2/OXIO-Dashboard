import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisComponent } from './analysis.component';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { UserDataService } from '../../../shared/services/user-data.service';
import { IUser } from '../../models/user-data.interface';
import { ChartModule } from 'primeng/chart';

describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;
  let mockUserDataService: jasmine.SpyObj<UserDataService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUserDataService = jasmine.createSpyObj('UserDataService', ['getSelectedUser$']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ChartModule],
      declarations: [AnalysisComponent],
      providers: [
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedUser and chartData on ngOnInit', () => {
    const mockUser: IUser = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      utilities: [
        { month: 'January', type: 'gas', usage: 100 },
        { month: 'February', type: 'electric', usage: 200 },
        { month: 'March', type: 'energy', usage: 150 },
      ],
    };
    mockUserDataService.getSelectedUser$.and.returnValue(new BehaviorSubject<IUser | null>(mockUser));

    component.ngOnInit();

    expect(component.selectedUser).toEqual(mockUser);
    expect(component.chartData).toBeDefined();
    expect(component.chartData?.labels).toEqual(['January', 'February', 'March']);
  });

  it('should not set selectedUser and chartData if selectedUser is null', () => {
    mockUserDataService.getSelectedUser$.and.returnValue(new BehaviorSubject<IUser | null>(null));

    component.ngOnInit();

    expect(component.selectedUser).toBeUndefined();
    expect(component.chartData).toBeUndefined();
  });

  it('should navigate to users list on navToUsersList', () => {
    component.navToUsersList();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('should correctly generate chart data in getChartData', () => {
    const mockUser: IUser = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      utilities: [
        { month: 'January', type: 'gas', usage: 100 },
        { month: 'February', type: 'electric', usage: 200 },
        { month: 'March', type: 'energy', usage: 150 },
      ],
    };

    const chartData = component['getChartData'](mockUser);

    expect(chartData).toBeDefined();

    if (chartData?.datasets) {
      expect(chartData.datasets.length).toBe(3);
      expect(chartData.datasets[0].label).toBe('Gas');
      expect(chartData.datasets[1].label).toBe('Electric');
      expect(chartData.datasets[2].label).toBe('Energy');
    }
  });

  it('should return undefined in getChartData if user is undefined', () => {
    const chartData = component['getChartData'](undefined);
    expect(chartData).toBeUndefined();
  });
});
