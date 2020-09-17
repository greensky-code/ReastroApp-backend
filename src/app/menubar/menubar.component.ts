import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  permissions: any=[];



  constructor(private service:ApiServiceService,private router:Router) { }

  ngOnInit() {

    this.permissions=JSON.parse(localStorage.getItem('permissions'))
    console.log('permissionsddss',this.permissions[0].has_permission)

  }
//   reload(){
//     this.service.spiners()
//   location.reload();
// }

// rolemanage(){
// this.router.navigate(['manage-role'])
// // window.location.reload();
// }
// onClick(check){
//   //    console.log(check);
//       if(check==1){
//         this.tab = 'tab1';
//       }else if(check==2){
//         this.tab = 'tab2';
//       }else{
//         this.tab = 'tab3';AsaSasasasaSas
//       }    
    
//   }aSasasasasasaSassaasAsasas
// }
}
