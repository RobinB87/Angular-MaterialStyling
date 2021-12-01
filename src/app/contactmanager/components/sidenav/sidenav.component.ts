import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isScreenSmall!: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    // observe changes when the viewport resizes
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        // set isScreenSmall to if the state matches,
        // as we observe if the small custom defined breakpoint has been hit
        this.isScreenSmall = state.matches;
      });
  }
}
