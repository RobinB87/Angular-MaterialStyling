import { Direction } from '@angular/cdk/bidi';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { UserService } from './../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isScreenSmall!: boolean;
  isDarkTheme: boolean = false;
  direction: Direction = 'ltr';

  users$!: Observable<User[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router
  ) {}

  // reference to our sidenav which is in the html template file
  // this reference is shown as #sideNav
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  ngOnInit(): void {
    // observe changes when the viewport resizes
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        // set isScreenSmall to if the state matches,
        // as we observe if the small custom defined breakpoint has been hit
        this.isScreenSmall = state.matches;
      });

    this.users$ = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sideNav.close();
      }
    });
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDirection(): void {
    this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
  }
}
