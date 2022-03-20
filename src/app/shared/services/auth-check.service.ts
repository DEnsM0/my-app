import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})

export class AuthCheck implements CanActivate{
    constructor(
        private auth: AuthService,
        private router: Router
      ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
         ):Observable<boolean> | Promise<boolean> | boolean | any{
        if(this.auth.isAuthenticated()){
            return true
        } else {
            this.auth.logout()
            this.router.navigate(['/login'],{
                queryParams:{
                    loggedIn: true
                }
            })
        }
        
    }
}
