import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(public router:Router,private service:ApiServiceService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
             if(localStorage.getItem('token') == null ) {
               
            //  console.log(this.service.id)
              // this.service.toastErr("You don't have permission");
              this.router.navigate(['login']);
              // this.service.logout()
         return false
        }
        else
        {
          return true;
      }
      
  }
}

