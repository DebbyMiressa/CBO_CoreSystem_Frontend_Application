import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
[x: string]: any;
  user:string;


  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

//abdydidit
//this is our role localStorage.getItem('role');



// for modal purpose 
display: boolean = false;
  modules = JSON.parse(localStorage.getItem("allModules"));

public openDialog(config: any){
this.display = true;

}

//abdydiditends

  constructor(private classToggler: ClassToggleService, private router: Router) {
  
    super();
  }
  ngOnInit(){
    this.user = localStorage.getItem('name');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}

