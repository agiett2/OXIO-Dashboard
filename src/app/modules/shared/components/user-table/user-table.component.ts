import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUserTableColumn, IUserTableData } from '../../model/user-table.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() public columns: string[] = [];
  @Input() public data: IUserTableData[] = [];
  @Output() public selectedUser: EventEmitter<IUserTableData> =
    new EventEmitter();
  sortOrder: boolean = true;

  public sortData(sortBy: string): void {
    const key: string = sortBy.toLowerCase();
    this.sortOrder = !this.sortOrder;
    this.data.sort((a: any, b: any) => {
      return this.sortOrder
        ? a[key] > b[key]
          ? 1
          : -1
        : b[key] > a[key]
        ? 1
        : -1;
    });
  }

  public selectUser(user: IUserTableData): void {
    this.selectedUser.emit(user);
  }
}
