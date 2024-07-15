import { Component } from '@angular/core';
import { NewcourseService } from 'src/app/service/newcourse-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-addnewcourses',
  templateUrl: './addnewcourses.component.html',
  styleUrls: ['./addnewcourses.component.css']
})
export class AddnewcoursesComponent {

  department: string = "";
  course_name: string = "";
  // Batch: string = "";
  CourseCode: string = "";
  // capacity: string = "";
  discription: string = "";

  constructor(private newcourseService: NewcourseService, private route: ActivatedRoute,
    private cookieService: CookieService,  private router: Router) { }

    ngOnInit(): void {
      this.department = this.cookieService.get('department');
  
      this.route.params.subscribe(params => {
        this.department = params['department'] || this.department;
      });
    }

    logout() {
      // Clear cookies and navigate to the login page
      this.cookieService.delete('department');
      this.router.navigate(['/login']); // Replace '/login' with the path to your login page
    }

  save(): void {
    let courseData = {
      "department": this.department,
      "course_name": this.course_name,
      // "Batch": this.Batch,
      "CourseCode": this.CourseCode,
      // "capacity": this.capacity,
      "discription": this.discription,
    };

    this.newcourseService.addNewCourse(courseData).subscribe(
      (response) => {
        console.log('Course added successfully', response);
        alert('Course added successfully');
        // Optionally, reset the form or perform any other action upon success
        this.resetForm();
      },
      (error) => {
        console.error('Error adding course', error);
        alert('Error adding course. Please try again.');
      }
    );
  }

  private resetForm(): void {

    this.department = '';
    this.course_name = '';
    // this.Batch = '';
    this.CourseCode = '';
    // this.capacity = '';
    this.discription = '';
  }
}
