import {Component, Input} from '@angular/core';
import {IFormData} from "../first-resume-template";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent{

  @Input() formData!: IFormData;
  @Input() enableOverflowY: boolean = true;

  constructor(private userService: UserService) {
  }

  uploadData() {
    console.log(this.formData)
    this.userService.uploadUserDetails(this.formData).subscribe({
      next: (data)=>{
        console.log(data)
      },
      error: (err)=>{
        console.log(err)
      }
    });
  }
}


