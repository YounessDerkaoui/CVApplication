import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
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
import {positions} from "../../shared/job-titles";
import {educationFormations} from "../../shared/education-formations";
import {projectsList} from "../../shared/projects-list";
import {skills} from "../../shared/skills";

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

  dataLoaded: boolean = false;
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
              public userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getInternalUsers().subscribe({
      next: (data) => {
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
        this.dataLoaded = true;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  ngAfterViewInit() {
    this.waitForDataToLoad().then(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private waitForDataToLoad(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkDataInterval = setInterval(() => {
        if (this.dataLoaded) {
          clearInterval(checkDataInterval);
          resolve();
        }
      }, 10);
    });
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
    if (this.files.length > 0) {
      this.resumeService.uploadResumesForInterns(this.files).subscribe(
        async (response) => {
          console.log('Resumes uploaded successfully!', response);
          this.files = []
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.dialog.closeAll()
          this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/internes']);
          });
        },
        (error) => {
          console.error('Error uploading resumes:', error);
        }
      );
    }
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
      data: { internesComponent: this }
    });
  }

  exportData() {
    const selectedObjectIds = this.dataSource.data
      .filter((obj:any) => obj.hasOwnProperty('isSelected') && obj.isSelected === true)
      .map((obj:any) => obj.id);

    if (selectedObjectIds.length != 0) {
      console.log(selectedObjectIds)
      this.userService.getUsersBasedOnIds(selectedObjectIds) .subscribe((response: ArrayBuffer) => {
        // Create a Blob from the response
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'user_data.xlsx';

        // Append the link to the document and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up: remove the link from the document
        document.body.removeChild(link);
      }, error => {
        console.error('Error downloading Excel file:', error);
      });
    }
  }

  navigateToGenerateResume() {
    const selectedObjectIds = this.dataSource.data
      .filter((obj:any) => obj.hasOwnProperty('isSelected') && obj.isSelected === true)
      .map((obj:any) => obj.id);
    if (selectedObjectIds.length == 1) {
      this.router.navigate(['/internes/template', selectedObjectIds[0]]);
    }
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
  projectsList: string[] = projectsList;

  post = new FormControl('');
  postList: string[] = positions;

  formations = new FormControl('');
  formationsList: string[] = educationFormations;

  skills = new FormControl('');
  skillsList: string[] = skills;

  constructor(public dialogRef: MatDialogRef<FilterDialog>,
              @Inject(MAT_DIALOG_DATA) public data: { internesComponent: InternesComponent }) {}

  async applyFilters() {
    this.data.internesComponent.documents = [];

    // Get the selected values when "Appliquer" is clicked
    const selectedProjects = this.projects.value;
    const selectedPost = this.post.value;
    const selectedFormations = this.formations.value;
    const selectedSkills = this.skills.value;

    if (selectedProjects) {
      console.log('Selected Projects:', selectedProjects);
      this.data.internesComponent.userService.getInternalUsersBasedOnProjectName(selectedProjects).subscribe({
        next: (data) => {
          console.log(data)

          data.users.forEach((user: UserData) => {
              // Check if the user with the same id already exists
              const existingUserIndex = this.data.internesComponent.documents
                .findIndex(existingUser => existingUser.id === user.id);

              if (existingUserIndex === -1) {
            this.data.internesComponent.documents.push({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              occupation: user.occupation,
            })}
          });

          this.data.internesComponent.rowCount = this.data.internesComponent.documents.length
          this.data.internesComponent.dataSource = new MatTableDataSource(this.data.internesComponent.documents);
          this.data.internesComponent.dataLoaded = true;
          this.data.internesComponent.dataSource.paginator = this.data.internesComponent.paginator;
          this.data.internesComponent.dataSource.sort = this.data.internesComponent.sort;
        },
        error: (err) => {
          console.log(err)
        }
      });
    }

    if (selectedFormations) {
      console.log('Selected Formations:', selectedFormations);
      this.data.internesComponent.userService.getInternalUsersBasedOnEducation(selectedFormations).subscribe({
        next: (data) => {
          console.log(data)

          data.users.forEach((user: UserData) => {
            // Check if the user with the same id already exists
            const existingUserIndex = this.data.internesComponent.documents
              .findIndex(existingUser => existingUser.id === user.id);

            if (existingUserIndex === -1) {
              this.data.internesComponent.documents.push({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                occupation: user.occupation,
              })}
          });

          this.data.internesComponent.rowCount = this.data.internesComponent.documents.length
          this.data.internesComponent.dataSource = new MatTableDataSource(this.data.internesComponent.documents);
          this.data.internesComponent.dataLoaded = true;
          this.data.internesComponent.dataSource.paginator = this.data.internesComponent.paginator;
          this.data.internesComponent.dataSource.sort = this.data.internesComponent.sort;
        },
        error: (err) => {
          console.log(err)
        }
      });
    }

    if (selectedSkills) {
      console.log('Selected skill:', selectedSkills);
      this.data.internesComponent.userService.getInternalUsersBasedOnSkills(selectedSkills).subscribe({
        next: (data) => {
          console.log(data)

          data.users.forEach((user: UserData) => {
            // Check if the user with the same id already exists
            const existingUserIndex = this.data.internesComponent.documents
              .findIndex(existingUser => existingUser.id === user.id);

            if (existingUserIndex === -1) {
              this.data.internesComponent.documents.push({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                occupation: user.occupation,
              })}
          });

          this.data.internesComponent.rowCount = this.data.internesComponent.documents.length
          this.data.internesComponent.dataSource = new MatTableDataSource(this.data.internesComponent.documents);
          this.data.internesComponent.dataLoaded = true;
          this.data.internesComponent.dataSource.paginator = this.data.internesComponent.paginator;
          this.data.internesComponent.dataSource.sort = this.data.internesComponent.sort;
        },
        error: (err) => {
          console.log(err)
        }
      });
    }

    if (selectedPost) {
      console.log('Selected post:', selectedPost);
      this.data.internesComponent.userService.getInternalUsersBasedOnPosition(selectedPost).subscribe({
        next: (data) => {
          console.log(data)

          data.users.forEach((user: UserData) => {
            // Check if the user with the same id already exists
            const existingUserIndex = this.data.internesComponent.documents
              .findIndex(existingUser => existingUser.id === user.id);

            if (existingUserIndex === -1) {
              this.data.internesComponent.documents.push({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                occupation: user.occupation,
              })}
          });

          this.data.internesComponent.rowCount = this.data.internesComponent.documents.length
          this.data.internesComponent.dataSource = new MatTableDataSource(this.data.internesComponent.documents);
          this.data.internesComponent.dataLoaded = true;
          this.data.internesComponent.dataSource.paginator = this.data.internesComponent.paginator;
          this.data.internesComponent.dataSource.sort = this.data.internesComponent.sort;
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
    // Close the dialog
    this.dialogRef.close();
  }

  delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}
