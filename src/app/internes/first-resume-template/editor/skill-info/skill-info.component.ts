import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {nanoid} from "nanoid";
import {ISkillsInfo} from "../../first-resume-template";

@Component({
  selector: 'app-skill-info',
  templateUrl: './skill-info.component.html',
  styleUrls: ['./skill-info.component.scss']
})
export class SkillInfoComponent implements OnInit{

  @Input() skillsInfo!: ISkillsInfo[];
  skillForm: FormGroup;
  skillInfoEmptyState: ISkillsInfo = { id: '', content: '' };
  skillInfo: ISkillsInfo = {...this.skillInfoEmptyState};

  constructor() {
    this.skillForm = new FormGroup({
      content: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  AddInfo(event: KeyboardEvent): void {
    if (event.type === 'keydown' && event.key === 'Enter'){
      this.submitSkillInfo();
    }
  }

  submitSkillInfo(): void {
    this.skillInfo.id = nanoid();
    this.skillInfo.content = this.skillForm.get('content')?.value;
    this.skillsInfo.push(this.skillInfo);
    this.skillInfo = {...this.skillInfoEmptyState};
    this.skillForm.patchValue({
      content: this.skillInfo.content,
    });
  }

  editSkillInfo(id: String): void {
    this.skillInfo = this.skillsInfo.find((skillInfo: ISkillsInfo) => skillInfo.id === id)!;
    this.skillForm.patchValue({
      content: this.skillInfo.content,
    });
    const indexToRemove = this.skillsInfo.findIndex((skillInfo: ISkillsInfo) => skillInfo.id === id);
    if (indexToRemove !== -1) {
      this.skillsInfo.splice(indexToRemove, 1);
    }
  }

  deleteSkillInfo(id: string): void {
    const indexToRemove = this.skillsInfo.findIndex((skillInfo: ISkillsInfo) => skillInfo.id === id);
    if (indexToRemove !== -1) {
      this.skillsInfo.splice(indexToRemove, 1);
    }
  }

  handleEnterKey($event: KeyboardEvent) {
    if ($event.key === 'Enter') $event.preventDefault();
  }
}
