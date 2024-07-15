// courses.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewcourseService } from 'src/app/service/courses.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  private apiUrl = 'http://localhost:8002/addcourse/getAll';
  public courses: any[] = [];
  searchTerm: string = '';
  public CourseCode: string = '';
  public description: string = '';
  public course_name: string = '';
  public department: string = "";
  filteredCourses: any[] = [];


  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
     private newCourseService: NewcourseService,
     private cookieService: CookieService) 
     { }


  ngOnInit(): void {
    this.department = this.cookieService.get('department');

    this.route.params.subscribe(params => {
      this.department = params['department'] || this.department;
    });
    this.getCourses();
  }
 

  private getCourses(): void {
    this.http.get<any>(this.apiUrl)
      .subscribe(
        (response) => {
          console.log(response); // Log response to the console
          this.courses = response.data || []; // Use response.data as courses (default to an empty array if not present)
          this.filteredCourses = this.courses.filter(entry => entry.department === this.department);
        },
        (error) => {
          console.error('Error fetching courses:', error);
        }
      );
  }
   // Add the deleteCourse method
   deleteCourse(data: any): void {
    this.http.delete("http://localhost:8002/addcourse/delete/" + data._id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Course Deleted");
      this.getCourses();
    });
  }
  logout() {
    // Clear cookies and navigate to the login page
    this.cookieService.delete('department');
    this.router.navigate(['/login']); // Replace '/login' with the path to your login page
  }


  // Rest of your existing code

  // save(): void {
  //   if (this.course_name !== '' && this.CourseCode !== '' && this.description !== '') {
  //     this.register();
  //   } else {
  //     alert("Please fill in all the fields");
  //   }
  // }

  // register(): void {
  //   let bodyData = {
  //     "course_name": this.course_name,
  //     "CourseCode": this.CourseCode,
  //     "description": this.description,
  //   };
  //   this.http.post("http://localhost:8002/addcourse/create", bodyData).subscribe((resultData: any) => {
  //     console.log(resultData);
  //     alert("Course Registered Successfully");
  //     this.getCourses();
  //     this.course_name = '';
  //     this.CourseCode = '';
  //     this.description = '';
  //   });
  // }

  // get filteredCourses() {
  //   return this.courses.filter(course =>
  //     course.course_name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }
}


