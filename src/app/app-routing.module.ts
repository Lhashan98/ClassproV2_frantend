import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './page/login/login.component';
import { CodashComponent } from './cordinators/codash/codash.component';
import { AddnewcoursesComponent } from './cordinators/addnewcourses/addnewcourses.component';
import { CheckreportComponent } from './cordinators/checkreport/checkreport.component';
import { CoursesComponent } from './cordinators/courses/courses.component';
import {SettingComponent} from './cordinators/setting/setting.component';
import { TimetableComponent } from './cordinators/timetable/timetable.component';


const routes: Routes = [
 {path:'',component:HomeComponent},
 {path:'login',component:LoginComponent},
 {path: 'codash',component:CodashComponent},
 {path:'home',component:HomeComponent},
 {path:'addnewcourses',component:AddnewcoursesComponent},
 {path: 'Checkreport',component:CheckreportComponent},
 {path:'Codash',component:CodashComponent},
 {path:'courses',component:CoursesComponent},
 {path:'setting',component:SettingComponent},
 {path:'checktimetable',component:TimetableComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
