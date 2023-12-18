import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IFormData} from './first-resume-template'
import {UserService} from "../../services/user.service";
import * as jsPDF from "jspdf";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-first-resume-template',
  templateUrl: './first-resume-template.component.html',
  styleUrls: ['./resume-template-style.scss','./first-resume-template.component.scss']
})
export class FirstResumeTemplateComponent implements OnInit{

  // @ts-ignore
  @ViewChild('appPreview', { static: false }) appPreview: ElementRef;
  userId!: string;
  formData: IFormData = {
    basicInfo: {
      firstName: '',
      lastName: '',
      occupation: '',
      yearsOfExp: 0,
      picture: '',
    },
    contactInfo: {
      email: '',
      linkedin: '',
      github: '',
      address: '',
    },
    skillsInfo: [],
    educationInfo: [],
    experienceInfo: [],
    languageInfo:[]
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.getUserDetails(this.userId).subscribe({
        next: (data)=>{
          this.formData = data;
          console.log(data)
        },
        error: (err)=>{
          console.log(err);
        }
      });
    });
  }

  downloadResume() {
    const element = this.appPreview.nativeElement;

    // Use html2canvas to capture the element with styles
    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jspdf.jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add the captured image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF or open it in a new tab as needed
      pdf.save('resume.pdf');
    });
  }
}
