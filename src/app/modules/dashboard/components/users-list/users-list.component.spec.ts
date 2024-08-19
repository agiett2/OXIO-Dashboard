


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of } from 'rxjs';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { UserDataService } from '../../../shared/services/user-data.service';
import { IUser } from '../../models/user-data.interface';
import { UserTableComponent } from '../../../shared/components/user-table/user-table.component';



describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let mockUserDataService: jasmine.SpyObj<UserDataService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    mockUserDataService = jasmine.createSpyObj('UserDataService', ['getUsersData$', 'setUsers', 'getUsers$', 'getNewUser$', 'setSelectedUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);

    await TestBed.configureTestingModule({
      declarations: [UsersListComponent, UserTableComponent],
      providers: [
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: Router, useValue: mockRouter },
        { provide: NgbModal, useValue: mockModalService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on ngOnInit', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com' },
    ];
    mockUserDataService.getUsersData$.and.returnValue(of(mockUsers));
    mockUserDataService.getUsers$.and.returnValue(new BehaviorSubject<IUser[] | null>(null));
    mockUserDataService.getNewUser$.and.returnValue(new BehaviorSubject<IUser | null>(null));

    component.ngOnInit();

    expect(mockUserDataService.setUsers).toHaveBeenCalledWith(mockUsers);
    expect(component.data.length).toBe(2);
    expect(component.data[0].name).toBe('John Doe');
  });

  it('should add new user data when getNewUser$ emits a value', () => {
    const newUser = { id: 3, name: 'Jim Doe', username: 'jimdoe', email: 'jim@example.com' };
    mockUserDataService.getNewUser$.and.returnValue(new BehaviorSubject<IUser | null>(newUser));
    component.ngOnInit();

    expect(component.data.length).toBe(1);
    expect(component.data[0].name).toBe('Jim Doe');
  });

  it('should call setSelectedUser and navigate when selectUser is called', () => {
    const mockUserValue = { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' };
    const mockUser = { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' };
    component['users'] = [mockUser];

    component.selectUser(mockUserValue);

    expect(mockUserDataService.setSelectedUser).toHaveBeenCalledWith(mockUser);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/user-analysis']);
  });

  it('should open AddNewUserComponent modal when openAddUserModal is called', () => {
    mockModalService.open.and.returnValue({ componentInstance: {} } as any);

    component.openAddUserModal();

    expect(mockModalService.open).toHaveBeenCalledWith(AddNewUserComponent);
  });
});