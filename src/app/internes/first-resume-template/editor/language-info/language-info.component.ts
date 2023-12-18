import {Component, Input} from '@angular/core';
import {IEducationInfo, ILanguageInfo} from "../../first-resume-template";
import {FormControl, FormGroup} from "@angular/forms";
import {nanoid} from "nanoid";
import {projectsList} from "../../../../../shared/projects-list";
import {LanguageProficiency} from "../../../../../shared/language-proficiency";

@Component({
  selector: 'app-language-info',
  templateUrl: './language-info.component.html',
  styleUrls: ['./language-info.component.scss']
})
export class LanguageInfoComponent {

  @Input() languageInfo!: ILanguageInfo[];
  langForm: FormGroup;
  langInfoEmptyState: ILanguageInfo = {
    id: '',
    language: '',
    speak: '',
    read: '',
    write: '',
  };
  langInfo: ILanguageInfo = {...this.langInfoEmptyState};
  proficiencyOptions: string[] = LanguageProficiency;
  selectedId: string = "";

  constructor() {
    this.langForm = new FormGroup({
      language: new FormControl(''),
      speak: new FormControl(''),
      read: new FormControl(''),
      write: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  submitLanguageInfo() {
    console.log(11)
    this.selectedId = "";
    this.langInfo.id = nanoid();
    this.langInfo.language = this.langForm.get('language')?.value;
    this.langInfo.speak = this.langForm.get('speak')?.value;
    this.langInfo.read = this.langForm.get('read')?.value;
    this.langInfo.write = this.langForm.get('write')?.value;
    console.log(this.langInfo)
    this.languageInfo.push(this.langInfo);
    this.langInfo = {...this.langInfoEmptyState};
    this.langForm.patchValue({
      language: this.langInfo.language,
      speak: '',
      read: '',
      write: '',
    });
  }

  editLanguageInfo(id: string) {
    // @ts-ignore
    this.selectedId = id;
    this.langInfo = this.languageInfo.find((languageInfo: ILanguageInfo) => languageInfo.id === id)!;
    console.log(this.langInfo)
    this.langForm.patchValue({
      language: this.langInfo.language,
      speak: this.langInfo.speak,
      read: this.langInfo.read,
      write: this.langInfo.write,
    });
    console.log(this.langForm)
    const indexToRemove = this.languageInfo.findIndex((languageInfo: ILanguageInfo) => languageInfo.id === id);
    if (indexToRemove !== -1) {
      this.languageInfo.splice(indexToRemove, 1);
    }
  }

  deleteLanguageInfo(id: string) {
    const indexToRemove = this.languageInfo.findIndex((languageInfo: ILanguageInfo) => languageInfo.id === id);
    if (indexToRemove !== -1) {
      this.languageInfo.splice(indexToRemove, 1);
    }
  }

  onKeyDown($event: KeyboardEvent) {
    if ($event.key === 'Enter') $event.preventDefault();
  }
}
