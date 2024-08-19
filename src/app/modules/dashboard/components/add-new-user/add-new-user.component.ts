import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../../models/user-data.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.scss'
})
export class AddNewUserComponent implements OnInit {
  public modalTitle: string = 'Add New User';
  public addUserBtnTxt: string = 'Add User';
  public addUserForm!: FormGroup;
  public constructor(private _userService: UserDataService, private _fb: FormBuilder, private _activeModalService: NgbActiveModal) { }

  public ngOnInit(): void {
    this.addUserForm = this.initForm();
  }

  public get isFormValid(): boolean {
    return this.addUserForm.valid;
  }


  public AddNewUser(): void {
    const { name, username, email, street, zipcode, city } = this.addUserForm.value;
    const id: number =  Math.floor(Math.random() * 100) + 1;
    const newUser: IUser = {
      id,
      name,
      username,
      email,
      address: {
        street,
        city,
        zipcode

      }
    }
  

    this._userService.addUser(newUser)
  }

  public initForm(): FormGroup {
    return this._fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required]

    })
  }

  public closeModal():void {
    this._activeModalService.dismiss();
  }
}
