import { Component, Input } from '@angular/core';
import { ActiveRouteService } from '../services/active-route.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  activeRouteLabel: string = 'Tableau de bord';

  constructor(private activeRouteService: ActiveRouteService) {}

  ngOnInit() {
    this.activeRouteService.activeRouteLabel$.subscribe(label => {
      if(label) {this.activeRouteLabel = label;}
      else this.activeRouteLabel = 'Tableau de bord'
    });
  }

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    }
    else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

}
