import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { User } from '../../../models/user';
import { Post } from 'src/app/models/post';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopNewpostcomponentComponent } from '../../popups-components/pop-newpostcomponent/pop-newpostcomponent.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profile: User = new User();
  posts: Array<Post> = [];
  idUser! : number
  isAuth! : boolean 
  loadingProfile : boolean = true;
  loadingPosts : boolean = true;
  constructor(private postService: PostService, private userService: AuthenticationService, private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    //this._snackBar.open('No se pudo obtener informacion del perfil.', 'OK');
    this.isAuth = this.userService.currentUserValue === null ? false : true; 
    if(this.isAuth )
    {
      
      this.idUser = 0;
    }
    else{
      this.route.queryParams.subscribe(params => {
        this.idUser = params['user'];
      });
    }

    this.getProfileInformation();
  }


  getProfileInformation(){
    this.loadingProfile = true;

    setTimeout(() => {
      this.userService.getProfileInformation(this.idUser).subscribe(data=>{
        this.profile = data;
        this.loadingProfile = false;
        this.getPostByUser(this.idUser);
      }, err=>{
        this._snackBar.open('No se pudo obtener informacion del perfil.', 'OK');
        this.loadingProfile = false;
      });
    }, 500);
  }

  getPostByUser(user: number){
    this.loadingPosts = true;

    setTimeout(() => {
      this.postService.getPostsByUser(this.idUser).subscribe(data=>{
        this.posts = data;
        this.loadingPosts = false;
      }, err=>{
        this._snackBar.open('No se pudo obtener publicaciones de este usuario.', 'OK');
        this.loadingPosts = false;
      });
    }, 1500);
  }

  

  createNewPost(){
    const dialogo1 = this.dialog.open(PopNewpostcomponentComponent, {
    });
  }
}
