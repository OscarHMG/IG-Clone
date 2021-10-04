import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-tab-component',
  templateUrl: './tab-component.component.html',
  styleUrls: ['./tab-component.component.css']
})
export class TabComponentComponent implements OnInit {
  isAuth : boolean = false;
  constructor(private authService: AuthenticationService, private route: ActivatedRoute,
    private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isAuth = this.authService.currentUserValue === null ? false : true;
  }


  tabClick(tab: any) {
    //Le da click al CERRAR SESION
    if(tab.index === 2){
      this.authService.logout();

      
      this.router.navigate(['/login']);
      this._snackBar.open('Session fue cerrada.','OK');
    }
  }
}
