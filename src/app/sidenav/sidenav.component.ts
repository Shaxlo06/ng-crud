import { animate, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ])
    ])
  ]
})

export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener("window:resize", ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth
    if (this.screenWidth <= 768) {
      this.collapsed = false
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth}) 
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed 
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth}) 
  }

  closeSideNav(): void {
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth}) 

  }
}
