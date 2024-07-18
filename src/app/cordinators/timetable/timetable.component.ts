import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
logout() {
throw new Error('Method not implemented.');
}
  reportdata: any[] = [];
  ReportArray: any[] = [];
  filteredData: any[] = [];
  batchOptions: string[] = [];
  selectedBatch: string = '';
  buildingOptions: string[] = [];
  selectedBuilding: string = '';
  selectedDay!: string;
  dayOptions: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Define dayOptions

  @ViewChild('tableToExport') tableToExport!: ElementRef;

  constructor(private http: HttpClient, private cookieService: CookieService) { } // Inject CookieService

  ngOnInit() {
    this.getAllReporDetails();
  }

  getAllReporDetails() {
    this.http.get<any>('5.181.217.67:8002/addreport/getAll')
      .subscribe(
        (resultData: any) => {
          this.ReportArray = resultData.data;
          this.selectedDay = '';
          this.populateBatchOptions();
          this.populateBuildingOptions();
          this.filterDataByDepartment(); // Filter by department
        },
        (error: any) => {
          console.error('Error fetching coordinator data:', error);
        }
      );
  }

  populateBatchOptions(): void {
    this.batchOptions = [...new Set(this.ReportArray.map(item => item.batch))];
  }

  populateBuildingOptions(): void {
    this.buildingOptions = [...new Set(this.ReportArray.map(item => item.nameofbuilding))];
  }
filterByBatch(): void {
  if (this.selectedBatch) {
    this.filteredData = this.ReportArray.filter(item => item.batch === this.selectedBatch && item.department === this.cookieService.get('department'));
  } else {
    this.filteredData = this.ReportArray.filter(item => item.department === this.cookieService.get('department'));
  }
}

  filterByBuilding(): void {
    if (this.selectedBuilding) {
      this.filteredData = this.ReportArray.filter(item => item.nameofbuilding === this.selectedBuilding);
    } else {
      this.filteredData = this.ReportArray;
    }
  }

  filterDataByDepartment(): void {
    const userDepartment = this.cookieService.get('department'); // Get user department from cookies
    if (userDepartment) {
      this.filteredData = this.ReportArray.filter(entry => entry.department === userDepartment);
    } else {
      // If user department is not found in cookies, show all data
      this.filteredData = this.ReportArray;
    }
  }

  getDayType(date: string): string {
    const dayOfWeek = new Date(date).getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[dayOfWeek];
  }
  filterByDay(): void {
    if (this.selectedDay) {
      this.filteredData = this.ReportArray.filter(item => this.getDayType(item.requestdate) === this.selectedDay);
    } else {
      this.filteredData = this.ReportArray;
    }
  }


  downloadAsPDF(): void {
    const doc = new jsPDF();
    const table = this.tableToExport.nativeElement;

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('timetable.pdf');
    });
  }
}
