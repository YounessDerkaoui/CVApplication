import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {nanoid} from "nanoid";
import {FormGroup, FormControl} from '@angular/forms';
import {IExperienceInfo, IAdditionalInfo} from "../../first-resume-template";

@Component({
  selector: 'app-experience-info',
  templateUrl: './experience-info.component.html',
  styleUrls: ['./experience-info.component.scss']
})
export class ExperienceInfoComponent implements OnInit{

  @Input() experienceInfo!: IExperienceInfo[];
  expForm: FormGroup;
  expInfoEmptState: IExperienceInfo = {
    id: '',
    jobTitle: '',
    company: '',
    startingYear: '',
    onGoing: true,
    endingYear: '',
    role: '',
    additionalInfo: [],
  };
  expInfo: IExperienceInfo = {...this.expInfoEmptState};
  isOnGoing: boolean = true;

  constructor() {
    this.expForm = new FormGroup({
      jobTitle: new FormControl(''),
      company: new FormControl(''),
      startingYear: new FormControl(''),
      onGoing: new FormControl(true),
      endingYear: new FormControl(''),
      role: new FormControl(''),
      currentInfoItem: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const onGoingControl = this.expForm.get('onGoing');
    if (onGoingControl) {
      onGoingControl.valueChanges.subscribe(value => {
        this.isOnGoing = value;
      });
    }
  }

  submitAdditionalInfo(event: any): void {
    let infoContent;
    if ((event.type === 'keydown' && event.key === 'Enter')
      || (event.type === 'click')){
      infoContent = this.expForm.get('currentInfoItem')?.value;
      this.expInfo.additionalInfo.push({
        id: nanoid(),
        content: infoContent,
      });
      this.expForm.get('currentInfoItem')?.reset();
    }
  }

  deleteAdditionalInfo(id: string) {
    this.expInfo.additionalInfo = this.expInfo.additionalInfo
      .filter((additionalInfo: IAdditionalInfo) => additionalInfo.id !== id);
  }

  submitExpInfo(): void {
    this.expInfo.id = nanoid();
    this.expInfo.jobTitle = this.expForm.get('jobTitle')?.value;
    this.expInfo.company = this.expForm.get('company')?.value;
    this.expInfo.startingYear = this.expForm.get('startingYear')?.value;
    this.expInfo.onGoing = this.expForm.get('onGoing')?.value;
    this.expInfo.endingYear = this.expForm.get('endingYear')?.value;
    this.expInfo.role = this.expForm.get('role')?.value;
    console.log(this.expForm.get('currentInfoItem')?.value)
    if (this.expForm.get('currentInfoItem')?.value) {
      this.expInfo.additionalInfo.push({
        id: nanoid(),
        content: this.expForm.get('currentInfoItem')?.value,
      });
      this.expForm.get('currentInfoItem')?.reset();
    }
    console.log(this.expInfo);
    this.experienceInfo.push(this.expInfo);
    this.expInfo = {...this.expInfoEmptState};
    this.expInfo.additionalInfo = [];
    this.expForm.patchValue({
      jobTitle: this.expInfo.jobTitle,
      company: this.expInfo.company,
      startingYear: this.expInfo.startingYear,
      onGoing: this.expInfo.onGoing,
      endingYear: this.expInfo.endingYear,
      role: this.expInfo.role,
    });
  }

  editExpInfo(id: string): void {
    this.expInfo = this.experienceInfo.find((expInfo: IExperienceInfo) => expInfo.id === id)!;
    this.expForm.patchValue({
      jobTitle: this.expInfo.jobTitle,
      company: this.expInfo.company,
      startingYear: this.expInfo.startingYear,
      onGoing: this.expInfo.onGoing,
      endingYear: this.expInfo.endingYear,
      role: this.expInfo.role,
    });
    const indexToRemove = this.experienceInfo.findIndex((expInfo: IExperienceInfo) => expInfo.id === id);
    if (indexToRemove !== -1) {
      this.experienceInfo.splice(indexToRemove, 1);
    }
  }

  deleteExpInfo(id: string): void {
    const indexToRemove = this.experienceInfo.findIndex((expInfo: IExperienceInfo) => expInfo.id === id);
    if (indexToRemove !== -1) {
      this.experienceInfo.splice(indexToRemove, 1);
    }
  }

  handleEnterKey($event: KeyboardEvent) {
    if ($event.key === 'Enter') $event.preventDefault();
  }
}
