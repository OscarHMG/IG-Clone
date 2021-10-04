import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupCommentsComponent } from '../popups-components/popup-comments/popup-comments.component';
import { PopupNewcommentComponent } from '../popups-components/popup-newcomment/popup-newcomment.component';

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
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
