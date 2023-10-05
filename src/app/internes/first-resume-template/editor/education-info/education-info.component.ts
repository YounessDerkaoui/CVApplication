import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {nanoid} from "nanoid";
import {FormGroup, FormControl} from '@angular/forms';
import {IEducationInfo} from "../../first-resume-template";

@Component({
  selector: 'app-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.scss']
})
export class EducationInfoComponent implements OnInit{

  @Input() educationInfo!: IEducationInfo[];
  educForm: FormGroup;
  educInfoEmptyState: IEducationInfo = {
    id: '',
    degreeTitle: '',
    institution: '',
    startingYear: '',
    onGoing: true,
    graduatingYear: '',
  };
  educInfo: IEducationInfo = {...this.educInfoEmptyState};
  isOnGoing: boolean = true;

  constructor() {
    this.educForm = new FormGroup({
      degreeTitle: new FormControl(''),
      institution: new FormControl(''),
      startingYear: new FormControl(''),
      onGoing: new FormControl(true),
      graduatingYear: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const onGoingControl = this.educForm.get('onGoing');
    if (onGoingControl) {
      onGoingControl.valueChanges.subscribe(value => {
        this.isOnGoing = value;
      });
    }
  }

  submitEducationInfo() {
    this.educInfo.id = nanoid();
    this.educInfo.degreeTitle = this.educForm.get('degreeTitle')?.value;
    this.educInfo.institution = this.educForm.get('institution')?.value;
    this.educInfo.startingYear = this.educForm.get('startingYear')?.value;
    this.educInfo.onGoing = this.educForm.get('onGoing')?.value;
    this.educInfo.graduatingYear = this.educForm.get('graduatingYear')?.value;
    this.educationInfo.push(this.educInfo);
    this.educInfo = {...this.educInfoEmptyState};
    this.educForm.patchValue({
      degreeTitle: this.educInfo.degreeTitle,
      institution: this.educInfo.institution,
      startingYear: this.educInfo.startingYear,
      onGoing: this.educInfo.onGoing,
      graduatingYear: this.educInfo.graduatingYear,
    });
  }

  editEducationInfo(id: string) {
    this.educInfo = this.educationInfo.find((educationInfo: IEducationInfo) => educationInfo.id === id)!;
    this.educForm.patchValue({
      degreeTitle: this.educInfo.degreeTitle,
      institution: this.educInfo.institution,
      startingYear: this.educInfo.startingYear,
      onGoing: this.educInfo.onGoing,
      graduatingYear: this.educInfo.graduatingYear,
    });
    const indexToRemove = this.educationInfo.findIndex((educationInfo: IEducationInfo) => educationInfo.id === id);
    if (indexToRemove !== -1) {
      this.educationInfo.splice(indexToRemove, 1);
    }
  }

  deleteEducationInfo(id: string) {
    const indexToRemove = this.educationInfo.findIndex((educationInfo: IEducationInfo) => educationInfo.id === id);
    if (indexToRemove !== -1) {
      this.educationInfo.splice(indexToRemove, 1);
    }
  }

  onKeyDown($event: KeyboardEvent) {
    if ($event.key === 'Enter') $event.preventDefault();
  }
}
