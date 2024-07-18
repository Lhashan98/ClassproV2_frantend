import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { AddreportService } from 'src/app/service/addreport.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

interface Report {
  _id: string;
  department: string;
  course: string;
  module: string;
  batch: string;
  capacity: number;
  nameofbuilding: string;
  typeofclass: string;
  requestdate: Date;
  starttime: string;
  endtime: string;
  ClassNumber: boolean;
  State: string;
}

@Component({
  selector: 'app-checkreport',
  templateUrl: './checkreport.component.html',
  styleUrls: ['./checkreport.component.css']
})
export class CheckreportComponent implements OnInit {
  private apiUrl = '5.181.217.67:8002/addreport/getAll';
  public reports: Report[] = [];
  public filteredReports: Report[] = [];
  public searchTerm: string = '';
  public batchSearchTerm: string = '';
  public department: string = '';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve department from cookie
    this.department = this.cookieService.get('department');

    // Subscribe to route params to update department if provided in URL
    this.route.params.subscribe(params => {
      this.department = params['department'] || this.department;
    });

    // Fetch all reports
    this.getreport();
  }

  private getreport(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        console.log(response);
        this.reports = response.data || [];
        // Filter reports based on department
        this.filteredReports = this.reports.filter(entry => entry.department === this.department);
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  filterReports(): void {
    // Retrieve the department from the cookie
    const departmentFromCookie = this.cookieService.get('department');
  
    if (departmentFromCookie) {
      // Filter reports by the logged-in department
      this.filteredReports = this.reports.filter(report =>
        report.department.toLowerCase() === departmentFromCookie.toLowerCase() &&
        (report.batch.toLowerCase().includes(this.batchSearchTerm.toLowerCase()) ||
         report.course.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    } else {
      // If no department found in the cookie, clear filteredReports
      this.filteredReports = [];
    }
  }

  deletereport(data: Report): void {
    this.http.delete(`5.181.217.67:8002/addreport/delete/${data._id}`).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Course Deleted");
      // this.getreport();
    });
  }

  logout() {
    // Clear cookies and navigate to the login page
    this.cookieService.delete('department');
    this.router.navigate(['/login']); // Replace '/login' with the path to your login page
  }
}
