import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActiveRouteService } from '../services/active-route.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  activeRouteLabel: string = 'Tableau de bord';

  constructor(private activeRouteService: ActiveRouteService, public dialog: MatDialog) {}

  ngOnInit() {
    this.activeRouteService.activeRouteLabel$.subscribe(label => {
      if (label) { this.activeRouteLabel = label; }
      else if (label === '') this.activeRouteLabel = 'Tableau de bord'
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogNotifications, {
      width: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    }
    else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'notifications-dialog.html',
  standalone: true,
  imports: [MatDialogModule],
  encapsulation: ViewEncapsulation.None
})
export class DialogNotifications {
  constructor(public dialogRef: MatDialogRef<DialogNotifications>) {}
}