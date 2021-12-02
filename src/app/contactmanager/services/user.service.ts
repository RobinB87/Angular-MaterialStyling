import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // components are able to subscribe to this behaviorsubject
  // only internal, external components should not be able to manipulate this
  private _users!: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  // this property is exposed which allows components to subscribe to behaviorsubject
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  loadAll(): Subscription {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';

    return this.http.get<User[]>(usersUrl).subscribe(
      (data) => {
        this.dataStore.users = data;

        // call next on behaviorsubject to publish data to all subscribed components
        // do not push out internal datastore, as this would allow components to manipulate the data
        // so, create new object and copy all properties from datastore to this new object
        // and then just publish the users
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      (error) => {
        console.log('Failed to fetch users', error);
      }
    );
  }

  userById(id: number) {
    return this.dataStore.users.find((x) => x.id == id);
  }

  // just a simulation of adding a user
  addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);

      // notify subscribers
      this._users.next(Object.assign({}, this.dataStore).users);
      resolve(user);
    });
  }
}
