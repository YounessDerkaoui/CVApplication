import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActiveRouteService} from "../services/active-route.service";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('toggleMenu', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('300ms ease-out')),
      transition('hidden => visible', animate('300ms ease-in')),
    ]),
  ],
})
export class NavBarComponent implements OnInit{

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  activeRouteLabel: string = '';
  username: string = localStorage.getItem("username")!
  id: string = localStorage.getItem("id")!
  isMenuOpen: boolean = false;
  profilePicture: string = "";

  constructor(private activeRouteService: ActiveRouteService,
              public dialog: MatDialog,
              private userService: UserService) {}

  ngOnInit() {
    // @ts-ignore
    this.userService.getProfilePicture().subscribe((imageBlob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // @ts-ignore
        this.profilePicture = reader.result;
      };
      reader.readAsDataURL(imageBlob);
    });
    this.activeRouteService.activeRouteLabel$.subscribe(label => {
      if (label === "Tableau de bord") {
        this.activeRouteLabel = "Tableau de bord"
      }else if (label) {
        this.activeRouteLabel = label;
      } else if (label === '') {
        const currentURL = window.location.href;
        if (currentURL.includes("dashboard")) {
          this.activeRouteLabel = "Tableau de bord"
        } else if (currentURL.includes("internes")) {
          this.activeRouteLabel = 'CV Internes'
        } else if (currentURL.includes("externes")) {
          this.activeRouteLabel = 'CV Externes'
        } else if (currentURL.includes("settings")) {
          this.activeRouteLabel = 'Paramètres'
        } else if (currentURL.includes("profile")) {
          this.activeRouteLabel = 'Résumé Personnel'
        }
      }
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

  toggleMenu() {
    // @ts-ignore
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
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
