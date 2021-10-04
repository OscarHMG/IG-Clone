import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { User } from '../../../models/user';
import { Post } from 'src/app/models/post';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profile: User = new User();
  posts: Array<Post> = [];

  loadingProfile : boolean = true;
  loadingPosts : boolean = true;
  constructor(private postService: PostService, private userService: AuthenticationService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //this._snackBar.open('No se pudo obtener informacion del perfil.', 'OK');
    this.getProfileInformation();
  }


  getProfileInformation(){
    this.loadingProfile = true;

    setTimeout(() => {
      this.userService.getProfileInformation().subscribe(data=>{
        this.profile = data;
        this.loadingProfile = false;
        this.getPostByUser();
      }, err=>{
        this._snackBar.open('No se pudo obtener informacion del perfil.', 'OK');
        this.loadingProfile = false;
      });
    }, 500);

    
  }

  getPostByUser(){
    this.loadingPosts = true;

    setTimeout(() => {
      this.postService.getPostsByUser().subscribe(data=>{
        this.posts = data;
        this.loadingPosts = false;
      }, err=>{
        this._snackBar.open('No se pudo obtener publicaciones de este usuario.', 'OK');
        this.loadingPosts = false;
      });
    }, 1500);

    
  }
}
