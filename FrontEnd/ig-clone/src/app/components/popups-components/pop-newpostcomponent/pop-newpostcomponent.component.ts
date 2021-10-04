import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-pop-newpostcomponent',
  templateUrl: './pop-newpostcomponent.component.html',
  styleUrls: ['./pop-newpostcomponent.component.css']
})
export class PopNewpostcomponentComponent implements OnInit {

  loading: boolean = false;
  
  form = this.fb.group({
    newPost: [null, Validators.required]
  });
  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<PopNewpostcomponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private postService: PostService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }


  onSubmit() {
    

    if (this.form.invalid) 
        return;
    this.loading = true;
    setTimeout(() => {
      this.postService.createNewPost(this.f.newPost.value).subscribe(data=>{
        
        this.loading = false;
        this.dialogRef.close(true);
        this._snackBar.open('Tu comentario fue agregado.','OK');
      },
      err=>{
        this.loading = false;
        this._snackBar.open('Ocurrio un error. No se pudo crear un comentario en el post.','OK');
      });
    }, 2000);

    

    
    

    
    
  } 
}
