import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

export interface ExternData {
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
export class ExternesComponent implements AfterViewInit {
  displayedColumns = ['isSelected', 'documentName', 'show', 'download'];
  documents: any[];
  dataSource: MatTableDataSource<ExternData>;
  files: File[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.documents = [
      {documentName: "CV_1.pdf"},
      {documentName: "CV_2.pdf"},
      {documentName: "CV_3.pdf"},
      {documentName: "CV_4.pdf"},
      {documentName: "CV_5.pdf"},
      {documentName: "CV_6.pdf"},
      {documentName: "CV_7.pdf"},
      {documentName: "CV_8.pdf"},
      {documentName: "CV_9.pdf"},
      {documentName: "CV_10.pdf"},
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ImportNotifications, {
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
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
