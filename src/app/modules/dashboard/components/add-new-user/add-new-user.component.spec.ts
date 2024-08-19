import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { AddNewUserComponent } from './add-new-user.component';
import { UserDataService } from '../../../shared/services/user-data.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AddNewUserComponent', () => {
  let component: AddNewUserComponent;
  let fixture: ComponentFixture<AddNewUserComponent>;
  let mockUserDataService: jasmine.SpyObj<UserDataService>;
  let formBuilder: FormBuilder;
  let mockModalService: jasmine.SpyObj<NgbActiveModal>;

  beforeEach(async () => {
    mockUserDataService = jasmine.createSpyObj('UserDataService', ['addUser']);
    formBuilder = new FormBuilder();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddNewUserComponent, ModalComponent],
      providers: [
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: NgbActiveModal, useValue: mockModalService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.addUserForm).toBeDefined();
    expect(component.addUserForm.controls['name']).toBeTruthy();
    expect(component.addUserForm.controls['username']).toBeTruthy();
    expect(component.addUserForm.controls['email']).toBeTruthy();
    expect(component.addUserForm.controls['street']).toBeTruthy();
    expect(component.addUserForm.controls['city']).toBeTruthy();
    expect(component.addUserForm.controls['zipcode']).toBeTruthy();
  });

  it('should return form validity', () => {
    component.ngOnInit();
    expect(component.isFormValid).toBeFalse();

    component.addUserForm.setValue({
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      street: '123 Main St',
      city: 'Houston',
      zipcode: '77001',
    });

    expect(component.isFormValid).toBeTrue();
  });

  it('should call addUser with new user data when AddNewUser is called', () => {
    component.ngOnInit();
    spyOn(Math, 'floor').and.returnValue(42); // Mock random ID generation

    component.addUserForm.setValue({
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      street: '123 Main St',
      city: 'Houston',
      zipcode: '77001',
    });

    const expectedUser = {
      id: 43, // ID will be 42 + 1
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'Houston',
        zipcode: '77001',
      },
    };

    component.AddNewUser();

    expect(mockUserDataService.addUser).toHaveBeenCalledWith(expectedUser);
  });

  it('should initialize the form with correct controls and validators', () => {
    const form = component.initForm();

    expect(form.controls['name'].valid).toBeFalse();
    expect(form.controls['username'].valid).toBeFalse();
    expect(form.controls['email'].valid).toBeFalse();
    expect(form.controls['street'].valid).toBeFalse();
    expect(form.controls['city'].valid).toBeFalse();
    expect(form.controls['zipcode'].valid).toBeFalse();

    form.controls['name'].setValue('John Doe');
    form.controls['username'].setValue('johndoe');
    form.controls['email'].setValue('john@example.com');
    form.controls['street'].setValue('123 Main St');
    form.controls['city'].setValue('Houston');
    form.controls['zipcode'].setValue('77001');

    expect(form.valid).toBeTrue();
  });
});
