import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'reaction',
  templateUrl: './reaction-component.component.html',
  styleUrls: ['./reaction-component.component.css'],
  providers: [ReactionService]
})
export class ReactionComponentComponent implements OnInit {

  //@Input() itemId: string | undefined;
  @Input() itemId: number | undefined;
  showEmojis = false;
  emojiList!: string[];

  reactionCount: any;
  userReaction: any;

  subscription: any;

  constructor(private reactionSvc: ReactionService, private _snackBar: MatSnackBar) { 
    this.emojiList = this.reactionSvc.emojiList


  }

  ngOnInit() {
    this.emojiList = this.reactionSvc.emojiList

    
  }


  react(val: any) {
    this.reactionSvc.postReactionToPost(this.itemId, this.emojiList[val]).subscribe(data=>{
      this._snackBar.open('Has reaccionado al post.', 'OK');

    }, err=>{
      this._snackBar.open('No se pudo registrar reaccion al post.', 'OK');
    });
  }

  toggleShow(show: boolean) {
    //this.showEmojis = !this.showEmojis
    this.showEmojis  = show;
  }


  emojiPath(emoji: string) {
   return `assets/reactions/${emoji}.svg`
  }

  hasReactions(index:any) {
    return false;
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe()
  }
}
