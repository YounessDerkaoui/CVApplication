import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle} from "ng-apexcharts";
import {educationFormations} from "../../shared/education-formations";
import {positions} from "../../shared/job-titles";
import {skills} from "../../shared/skills";
import {Router} from "@angular/router";
import {ActiveRouteService} from "../services/active-route.service";

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

  formationChartSeries: ApexNonAxisChartSeries = [];
  formationChartDetails: ApexChart = {
    type: "pie",
    toolbar: {
      show: true
    },
  };
  formationChartLabels = [];
  formationChartTitle: ApexTitleSubtitle = {
    text: "Répartition par Formation",
    align: "left"
  };

  postChartSeries: ApexNonAxisChartSeries = [];
  postChartDetails: ApexChart = {
    type: "donut",
    toolbar: {
      show: true
    },
  };
  postChartLabels = [];
  postChartTitle: ApexTitleSubtitle = {
    text: "Répartition par Poste",
    align: "left"
  };

  skillChartSeries: ApexNonAxisChartSeries = [];
  skillChartDetails: ApexChart = {
    type: "pie",
    toolbar: {
      show: true
    },
  };
  skillChartLabels = [];
  skillChartTitle: ApexTitleSubtitle = {
    text: "Répartition par Compétences",
    align: "left"
  };

  totalResumesCount: number = 0;
  internResumesCount: number = 0;
  externResumesCount: number = 0;
  lastModifiedResumesCount: number = 0;
  internProfilesCount: number = 0;

  constructor(private userService: UserService,
              private router: Router,
              private activeRouteService: ActiveRouteService) {
  }

  ngOnInit(): void {
    console.log(1212)
    this.userService.getDataForChart(educationFormations,positions,skills).subscribe({
      next: (data)=>{
        console.log(data)
        for (const item of data.formation) {
          // @ts-ignore
          this.formationChartLabels.push(item.degree_title);
          this.formationChartSeries.push(item.count);
        }
        for (const item of data.position) {
          // @ts-ignore
          this.postChartLabels.push(item.position_title);
          this.postChartSeries.push(item.count);
        }
        for (const item of data.skill) {
          // @ts-ignore
          this.skillChartLabels.push(item.skill_title);
          this.skillChartSeries.push(item.count);
        }
        this.formationChartDetails = { ...this.formationChartDetails };
        this.postChartDetails = { ...this.postChartDetails };
        this.skillChartDetails = { ...this.skillChartDetails };
      },
      error: (err)=>{
        console.log(err)
      }
    });
    this.userService.getDashboardInfo().subscribe({
      next: (data: DashbordContent)=>{
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

  changeToRoute(label: string) {
    if (label === "interns") {
      this.activeRouteService.setActiveRouteLabel("CV Internes")
      this.router.navigate(['/internes']);
    } else if (label === "externs") {
      this.activeRouteService.setActiveRouteLabel("CV Externes")
      this.router.navigate(['/externes']);
    }
  }
}
