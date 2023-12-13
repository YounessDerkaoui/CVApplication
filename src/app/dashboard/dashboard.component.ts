import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

interface DashbordContent {
  totalResumes: number;
  internResumes: number;
  externResumes: number;
  internProfiles: number;
  lastModifiedResumes: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  totalResumesCount: number = 0;
  internResumesCount: number = 0;
  externResumesCount: number = 0;
  lastModifiedResumesCount: number = 0;
  internProfilesCount: number = 0;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    console.log(1212)
    this.userService.getDashboardInfo().subscribe({
      next: (data: DashbordContent)=>{
        console.log(data)
        this.totalResumesCount = data.totalResumes;
        this.internResumesCount = data.internResumes;
        this.externResumesCount = data.externResumes;
        this.lastModifiedResumesCount = data.lastModifiedResumes;
        this.internProfilesCount = data.internProfiles;
      },
      error: (err)=>{
        console.log(err)
      }
    });
  }

}
