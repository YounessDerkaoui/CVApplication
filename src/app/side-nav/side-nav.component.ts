import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute} from "@angular/router";
import {ActiveRouteService} from "../services/active-route.service";
import {navbarData} from "./nav-data";
import {AuthService} from "../services/auth.service";


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
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
export class SideNavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  activeRouteLabel: string = '';
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  constructor (private route: ActivatedRoute,
               private activeRouteService: ActiveRouteService,
               private authService: AuthService) {
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  returnRoute(label: string) {
    if (label == "Se déconnecter") {
      this.authService.deauthenticate();
    } else {
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
  }
}
