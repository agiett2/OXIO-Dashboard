import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from '../../dashboard/models/user-data.interface';
import { IUtilityData } from '../../dashboard/models/utility-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }
  private _users$: BehaviorSubject<IUser[] | null> = new BehaviorSubject<IUser[] | null>(
    null
  );
  private _selectedUser$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  private _newUser$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  public getUsersData$(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      map((userData: IUser[]) => {
        return userData.map((user: IUser) => ({
          ...user,
          utilities: this.generateRandomUtilityData(),
        }));
      })
    );
  }

  public setUsers(users: IUser[]): void {
    this._users$.next(users);
  }

  public setSelectedUser(users: IUser): void {
    this._selectedUser$.next(users);
  }

  public setNewUser(users: IUser): void {
    this._newUser$.next(users);
  }

  public getUsers$(): BehaviorSubject<IUser[] | null> {
    return this._users$;
  }

  public getSelectedUser$(): BehaviorSubject<IUser | null> {
    return this._selectedUser$;
  }
  public getNewUser$(): BehaviorSubject<IUser | null> {
    return this._newUser$;
  }

  public addUser(value: IUser): void {
    const newUser: IUser = {
      ...value,
      utilities: this.generateRandomUtilityData()
    }
    const currentListOfUsers: IUser[] | null = this._users$.value;
    if (!currentListOfUsers) {
      this._users$.next([newUser]);
      return
    }
    this._users$.next([...currentListOfUsers, newUser]);
    this._newUser$.next(newUser)
  }

  private generateRandomUtilityData(): IUtilityData[] {
    const types: ('energy' | 'electric' | 'gas')[] = [
      'energy',
      'electric',
      'gas',
    ];
    const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ];
    const data: IUtilityData[] = [];

    months.forEach((month) => {
      types.forEach((type) => {
        data.push({
          type,
          month,
          usage: parseFloat((Math.random() * 15).toFixed(2)),
        });
      });
    });

    return data;
  }
}
