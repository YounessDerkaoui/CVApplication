import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import {ResumeService} from "../services/resume.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

export interface ExternData {
  id: number,
  isSelected: boolean;
  documentName: string;
  show: string;
  download: string;
}

@Component({
  selector: 'app-externes',
  templateUrl: './externes.component.html',
  styleUrls: ['./externes.component.scss']
})
export class ExternesComponent implements AfterViewInit, OnInit{
  loading: boolean = true;
  displayedColumns = ['isSelected', 'documentName', 'show', 'download'];
  documents: any[] = [];
  // @ts-ignore
  dataSource: MatTableDataSource<ExternData>;
  rowCount: number = 0
  files: File[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
              private resumeService: ResumeService,
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit() {
    this.userService.getExternalUsers().subscribe({
      next: (data)=>{
        data.users.forEach((user: { id: number; resume: string; createdAt: string }) => {
          const resumePath = user.resume;
          const indexOfKeybr = resumePath.indexOf("keybr");
          let documentName = user.resume
          if (indexOfKeybr !== -1) {
            documentName = resumePath.substring(indexOfKeybr + "keybr".length);
          }
          this.documents.push({id: user.id, documentName: documentName, createdAt: user.createdAt})
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
		console.log(this.files);
		this.files.push(...event.addedFiles);
    console.log(this.files);
	}

	onRemove(event: any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.files.length > 0) {
      this.resumeService.uploadResumes(this.files).subscribe(
        async (response) => {
          console.log('Resumes uploaded successfully!', response);
          this.files = []
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.dialog.closeAll()
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/externes']);
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

  downloadResume(row: any) {
    console.log(row.id)
    this.resumeService.downloadResume(row.id);
    console.log(1212121)
    this.router.navigate(['/externes']);
  }

  downloadList() {
    // Assuming this.dataSource.data is your array of objects
    const selectedObjects = this.dataSource.data.filter((obj) => obj.hasOwnProperty('isSelected') && obj.isSelected === true);
    for (const selectedObject of selectedObjects) {
      this.downloadResume(selectedObject);
    }
  }

}

@Component({
  selector: 'dialog-import',
  templateUrl: 'imports-dialog.html',
  styleUrls: ['./externes.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatProgressBarModule, MatIconModule]
})
export class ImportNotifications {
  constructor(public dialogRef: MatDialogRef<ImportNotifications>) {}
}
