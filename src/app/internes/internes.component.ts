import { AfterViewInit, Component, ViewChild } from '@angular/core';
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

export interface ExternData {
  isSelected: boolean;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  poste: string;
}

@Component({
  selector: 'app-internes',
  templateUrl: './internes.component.html',
  styleUrls: ['./internes.component.scss']
})

export class InternesComponent implements AfterViewInit {

  displayedColumns = ['isSelected', 'nom', 'prenom', 'email', 'phone', 'poste', 'show'];
  documents: any[];
  dataSource: MatTableDataSource<ExternData>;
  files: File[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.documents = [
      {
        nom: "Mohamed",
        prenom: "Mohamed",
        email: "mohamed@berexia.com",
        phone: "0623-456-789",
        poste: "Project Manager"
      },
      {
        nom: "Bader",
        prenom: "Bader",
        email: "bader@berexia.com",
        phone: "0623-456-789",
        poste: "BA"
      },
      {
        nom: "Hicham",
        prenom: "Hicham",
        email: "hicham@berexia.com",
        phone: "0623-456-789",
        poste: "Fullstack DEV"
      },
      {
        nom: "Hamid",
        prenom: "Hamid",
        email: "hamid@berexia.com",
        phone: "0623-456-789",
        poste: "Architect"
      },
      {
        nom: "Oussama",
        prenom: "Oussama",
        email: "oussama@berexia.com",
        phone: "0623-456-789",
        poste: "Odoo fonctionnel"
      },
      {
        nom: "Abdellah",
        prenom: "Abdellah",
        email: "abdellah@berexia.com",
        phone: "0623-456-789",
        poste: "Java DEV"
      },
      {
        nom: "Othmane",
        prenom: "Othmane",
        email: "othmane@berexia.com",
        phone: "0623-456-789",
        poste: "RH"
      },
      {
        nom: "Ayoub",
        prenom: "Ayoub",
        email: "ayoub@berexia.com",
        phone: "0623-456-789",
        poste: "Stage PFE"
      },
      {
        nom: "Yassine",
        prenom: "Yassine",
        email: "yassine@berexia.com",
        phone: "0623-456-789",
        poste: "Project Manager"
      },
      {
        nom: "Amine",
        prenom: "Amine",
        email: "amine@berexia.com",
        phone: "0623-456-789",
        poste: "BA"
      },
    ];

    this.dataSource = new MatTableDataSource(this.documents);
  }

  ngAfterViewInit() {
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