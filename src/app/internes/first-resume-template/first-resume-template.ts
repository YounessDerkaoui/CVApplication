export interface IFormData {
  basicInfo: IBasicInfo;
  skillsInfo: ISkillsInfo[];
  educationInfo: IEducationInfo[];
  experienceInfo: IExperienceInfo[];
  languageInfo: ILanguageInfo[];
}

export interface IBasicInfo {
  firstName: string;
  lastName: string;
  occupation: string;
  yearsOfExp: number
}

export interface ISkillsInfo {
  id: string;
  content: string;
}

export interface IEducationInfo {
  id: string;
  degreeTitle: string;
  institution: string;
  startingYear: string;
  onGoing: boolean;
  graduatingYear: string;
}

export interface IExperienceInfo {
  id: string;
  jobTitle: string;
  company: string;
  startingYear: string;
  onGoing: boolean;
  endingYear: string;
  role: string;
  additionalInfo: IAdditionalInfo[];
}

export interface IAdditionalInfo{
  id: string;
  content: string;
}

export interface ILanguageInfo {
  id: string;
  language: string;
  speak: LanguageProficiency;
  read: LanguageProficiency;
  write: LanguageProficiency;
}

export enum LanguageProficiency {
  VERY_GOOD = 'Très bien',
  GOOD = 'Bien',
  WEAK = 'Faible',
  NOT_AT_ALL = 'Pas du tout'
}

