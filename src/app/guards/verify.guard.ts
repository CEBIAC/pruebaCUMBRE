import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(route: Route) {
    if (sessionStorage.getItem('infoSapiolab')) {
      return true;
    } else {
      alert('acceso denegado');
      this.router.navigate(['/home']);
      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot): any {
    if (sessionStorage.getItem('user')) {
      return true;
    } else {
      alert('acceso denegado');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
