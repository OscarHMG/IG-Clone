import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs/operators';
import { CommentService } from 'src/app/services/comments.service';
import { Comment } from '../../../models/comments';

@Component({
  selector: 'app-popup-comments',
  templateUrl: './popup-comments.component.html',
  styleUrls: ['./popup-comments.component.css'],
})
export class PopupCommentsComponent implements OnInit {
  comments: Array<Comment> = [];
  loading: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<PopupCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private commentService: CommentService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.loading = true;

    setTimeout(() => {
      this.commentService.getCommentsByPost(this.data).subscribe((response) => {
        this.comments = response;
        this.loading = false;
      },
      err=>{
        this.loading = false;
        this._snackBar.open('No se pudieron obtener los comentarios de este post.', 'OK');
      });
    }, 1000);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
