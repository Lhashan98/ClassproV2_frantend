import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/app/page/login/login.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './page/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { CodashComponent } from './cordinators/codash/codash.component';
import { AddnewcoursesComponent } from './cordinators/addnewcourses/addnewcourses.component';
import { CheckreportComponent } from './cordinators/checkreport/checkreport.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CoursesComponent } from './cordinators/courses/courses.component';
import { SettingComponent } from './cordinators/setting/setting.component';
import { TimetableComponent } from './cordinators/timetable/timetable.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    CodashComponent,
    AddnewcoursesComponent,
    CheckreportComponent,
    CoursesComponent,
    SettingComponent,
    TimetableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Import ReactiveFormsModule
    HttpClientModule,
    NgxsModule.forRoot([AuthState]), // Assuming you have imported AuthState from 'src/app/page/login/login.state'
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
