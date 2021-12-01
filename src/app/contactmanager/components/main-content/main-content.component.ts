import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  user!: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      // userById does not get user when being on a user and then refresh the page
      // this is due to race condition, as sidenav component still did not have loaded the users
      // and the maincontent component that is trying to fetch the user
      //
      // since the userservice already exposes the users as an observable
      // take advantage of that by subscribing here as well
      this.userService.users.subscribe((users) => {
        if (users.length == 0) return;

        this.user = this.userService.userById(id);
      });
    });
  }
}
