import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post';
import { MatDialog } from '@angular/material/dialog';
import { PopupCommentsComponent } from '../../popups-components/popup-comments/popup-comments.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  posts: Array<Post> = [];
  constructor(private postService : PostService, private _snackBar: MatSnackBar) { }

 

  ngOnInit(): void {
    this.getPosts();

  }

  getPosts(): void {
    this.postService.getAllPosts().subscribe((data: Array<Post>)=>
    {
      this.posts = data;

    },
    err=>{
      this._snackBar.open('No se pudo obtener posts', 'OK');
    });
  }

  
}
