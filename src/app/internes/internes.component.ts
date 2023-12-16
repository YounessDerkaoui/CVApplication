import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf, NgFor} from '@angular/common';
import {ResumeService} from "../services/resume.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

export interface ExternData {
  isSelected: boolean;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  poste: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  occupation: string;
}

@Component({
  selector: 'app-internes',
  templateUrl: './internes.component.html',
  styleUrls: ['./internes.component.scss']
})

export class InternesComponent implements AfterViewInit, OnInit {

  displayedColumns = ['isSelected', 'nom', 'prenom', 'email', 'phone', 'poste', 'show'];
  documents: any[] = [];
  // @ts-ignore
  dataSource: MatTableDataSource<ExternData>;
  files: File[] = [];
  rowCount: number = 0

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
              private resumeService: ResumeService,
              private userService: UserService,
              private router: Router) {
  }
  ngOnInit() {
    this.userService.getInternalUsers().subscribe({
      next: (data)=>{
        data.users.forEach((user: UserData) => {
          this.documents.push({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            occupation: user.occupation,
          })
        });
        this.rowCount = this.documents.length
        this.dataSource = new MatTableDataSource(this.documents);

      },
      error: (err)=>{
        console.log(err)
      }
    });
  }

  async ngAfterViewInit() {
    await new Promise(resolve => setTimeout(resolve, 10));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectAll(event: MatCheckboxChange) {
    const isChecked = event.checked;

    for (const row of this.dataSource.data) {
      row.isSelected = isChecked;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

	onSelect(event: any) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event: any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  openImportDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ImportNotifications, {
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openFilterDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterDialog, {
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

@Component({
  selector: 'dialog-import',
  templateUrl: 'imports-dialog.html',
  styleUrls: ['./internes.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatProgressBarModule, MatIconModule]
})
export class ImportNotifications {
  constructor(public dialogRef: MatDialogRef<ImportNotifications>) {}
}

@Component({
  selector: 'dialog-filter',
  templateUrl: 'filter-dialog.html',
  styleUrls: ['./internes.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule , MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgIf, NgFor]
})
export class FilterDialog {

  projects = new FormControl('');
  projectsList: string[] = ['Forewriter', 'Portnet', 'BOA'];

  post = new FormControl('');
  postList: string[] = ['Dev', 'Manager', 'CEO'];

  formations = new FormControl('');
  formationsList: string[] = ['Ingénieur', 'Master', 'Licence'];

  constructor(public dialogRef: MatDialogRef<FilterDialog>) {}
}
