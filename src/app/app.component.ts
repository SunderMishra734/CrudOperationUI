import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentsListPageComponent } from "../components/students-list-page/students-list-page.component";
import { StudentNavComponent } from "../components/student-nav/student-nav.component";
import { CreateStudentPageComponent } from '../components/create-student-page/create-student-page.component';
import { ToasterMessageComponent } from "../components/toaster-message/toaster-message.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentsListPageComponent, StudentNavComponent, CreateStudentPageComponent, ToasterMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CrudOperation';
  isCreatePageVisible: boolean = false;
  isTaosterVisible: boolean = false;
  displayMsg: string = '';
  actionType: number = 0;

  showStudentCreatePage(isShow: boolean) {
    this.isCreatePageVisible = isShow;
  }

  showToasterMessage(actType: number){
    this.isTaosterVisible = true;
    this.actionType = actType;
    setTimeout(()=>{
      this.closeToasterMessage();
    }, 2500);
  }

  closeToasterMessage(){
    this.isTaosterVisible = false;
  }
}
