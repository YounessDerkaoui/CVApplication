import {Component, Input} from '@angular/core';
import {IEducationInfo, ILanguageInfo, LanguageProficiency} from "../../first-resume-template";
import {FormControl, FormGroup} from "@angular/forms";
import {nanoid} from "nanoid";

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
    speak: LanguageProficiency.NOT_AT_ALL,
    read: LanguageProficiency.NOT_AT_ALL,
    write: LanguageProficiency.NOT_AT_ALL,
  };
  langInfo: ILanguageInfo = {...this.langInfoEmptyState};
  proficiencyOptions = Object.values(LanguageProficiency);

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
    this.langInfo = this.languageInfo.find((languageInfo: ILanguageInfo) => languageInfo.id === id)!;
    this.langForm.patchValue({
      language: this.langInfo.language,
      speak: this.langInfo.speak,
      read: this.langInfo.read,
      write: this.langInfo.write,
    });
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
