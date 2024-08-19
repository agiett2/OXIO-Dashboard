import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component'; // Replace with the correct path to your component

import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { IUserTableData } from '../../model/user-table.model';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty columns and data inputs', () => {
    expect(component.columns).toEqual([]);
    expect(component.data).toEqual([]);
  });

  it('should sort data in descendin order when sortOrder is true', () => {
    component.data = [
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com' },
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
    ];
    component.sortOrder = true;

    component.sortData('name');

    expect(component.data[0].name).toBe('John Doe');
    expect(component.data[1].name).toBe('Jane Doe');
  });

  it('should sort data in ascending order when sortOrder is false', () => {
    component.data = [
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com' },
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
    ];
    component.sortOrder = false;

    component.sortData('name');

    expect(component.data[0].name).toBe('Jane Doe');
    expect(component.data[1].name).toBe('John Doe');
  });

  it('should emit selectedUser event when selectUser is called', () => {
    spyOn(component.selectedUser, 'emit');
    const user: IUserTableData = { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' };

    component.selectUser(user);

    expect(component.selectedUser.emit).toHaveBeenCalledWith(user);
  });

  it('should toggle sortOrder when sortData is called', () => {
    component.sortOrder = true;
    component.sortData('name');

    expect(component.sortOrder).toBeFalse();
    component.sortData('name');

    expect(component.sortOrder).toBeTrue();
  });
});
