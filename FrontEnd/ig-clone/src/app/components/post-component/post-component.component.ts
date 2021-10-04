import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupCommentsComponent } from '../popups-components/popup-comments/popup-comments.component';
import { PopupNewcommentComponent } from '../popups-components/popup-newcomment/popup-newcomment.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit {

  @Input()
  postText!: string;
  @Input()
  postDate! : string
  @Input()
  postUserName! : string
  @Input()
  id!: number
  @Input()
  numberComments! :number
  @Input()
  numberReactions! :number

  isAuth! : boolean 
  constructor(public dialog: MatDialog, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.currentUserValue == null ? false : true;
  }

  openCommentsByPost(id: number) {

    
    const dialogo1 = this.dialog.open(PopupCommentsComponent, {
      data: id
    });

    
  }

  createNewComment(id: number){
    const dialogo1 = this.dialog.open(PopupNewcommentComponent, {
      data: id
    });
  }

}
