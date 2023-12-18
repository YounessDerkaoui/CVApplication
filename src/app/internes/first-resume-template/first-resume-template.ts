export interface IFormData {
  basicInfo: IBasicInfo;
  contactInfo: IContactInfo;
  skillsInfo: ISkillsInfo[];
  educationInfo: IEducationInfo[];
  experienceInfo: IExperienceInfo[];
  languageInfo: ILanguageInfo[];
}

export interface IBasicInfo {
  firstName: string;
  lastName: string;
  occupation: string;
  yearsOfExp: number;
  picture: string;
}

export interface IContactInfo {
  email: string;
  linkedin: string;
  github: string;
  address: string;
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
  internJobTitle: string;
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
  speak: string;
  read: string;
  write: string;
}


