import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ActiveRouteService } from '../services/active-route.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0}))
      ])
    ])
  ]
})


export class SidenavComponent implements OnInit {

  constructor (private route: ActivatedRoute, private activeRouteService: ActiveRouteService) {
    
  }

  activeRouteLabel: string = '';

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  returnRoute() {
    this.route.url.subscribe(urlSegments => {
      const childRoute = this.route.firstChild;
      let activeChild = childRoute?.snapshot.url.join('/');
      const menuItem = navbarData.find(item => item.routeLink === activeChild);
      console.log('Active Child Route:', menuItem?.label);
      if (menuItem) {
        this.activeRouteLabel = menuItem.label;
        this.activeRouteService.setActiveRouteLabel(menuItem.label);
      }
      else
      {
        this.activeRouteService.setActiveRouteLabel('');
      }
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
