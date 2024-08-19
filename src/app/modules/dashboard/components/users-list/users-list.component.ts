import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data.service';
import { IUser } from '../../models/user-data.interface';
import { IUserTableData } from '../../../shared/model/user-table.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public data: IUserTableData[] = [];
  public columns: string[] = ['ID', 'Name', 'Username', 'Email'];
  private users: IUser[] = [];

  constructor(private _dataService: UserDataService, private _router: Router, private _modalService: NgbModal) { }

  ngOnInit(): void {
    this._dataService.getUsersData$()?.subscribe({
      next: (users: IUser[]) => {
        this.users = users;
        this._dataService.setUsers(users);
        users.map((user: IUser) =>
          this.data.push({
            id: user.id ?? 0,
            name: user.name ?? '',
            username: user.username ?? '',
            email: user.email ?? '',
          })
        );
      },
    });

    this._dataService.getUsers$()?.subscribe({
      next: (users: IUser[] | null) => {
        if (!users) {
          return;
        }
        this.users = users;
      }
    })

    this._dataService.getNewUser$()?.subscribe({
      next: (newUser: IUser | null) => {
        if (!newUser) {
          return
        }
        this.data.push({
          id: newUser.id ?? 0,
          name: newUser.name ?? '',
          username: newUser.username ?? '',
          email: newUser.email ?? '',
        })

      }
    })
  }


  public selectUser(userValue: IUserTableData): void {
    const selectedUser: IUser | undefined = this.users.find(
      (user: IUser) => user.username === userValue.username
    );
    if (!selectedUser) {
      return;
    }
    this._dataService.setSelectedUser(selectedUser);
    this._router.navigate(['/user-analysis']);
  }

  public openAddUserModal(): void {
    const modalRef = this._modalService.open(AddNewUserComponent);
    modalRef.componentInstance.title = 'Add New User';
  }
}
