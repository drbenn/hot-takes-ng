import { ChangeDetectorRef, Component, Input, OnInit, WritableSignal, signal } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService, User } from '@auth0/auth0-angular';
import { ButtonModule } from 'primeng/button';
import { PostsApiService } from '../../services/posts-api.service';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../types/posts.types';
import { AsyncPipe, DatePipe } from '@angular/common';



@Component({
  selector: 'comment',
  standalone: true,
  imports: [InputTextareaModule, FloatLabelModule, ButtonModule, FormsModule, DatePipe, AsyncPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  protected isUserLoggedIn: boolean = false;
  protected userName: string | undefined = undefined;
  protected comment: string = '';
  @Input() postId!: number;
  @Input() comments!: Comment[] | null | undefined;
  // protected commentSignal: WritableSignal<Comment[]> = signal([]);
  protected commentList: Comment[] = [];

  constructor(
    private auth: AuthService,
    private postsApiService: PostsApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.comments) {
      this.commentList = this.comments;
    };
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.isUserLoggedIn = true;
        this.getUsername();
      } else {
        this.isUserLoggedIn = false;
        this.userName = '';
      };
    }
  )};

  private getUsername() {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      console.log('logged in user subscriber info: ', user);
      if (user) {
        this.userName = user.name;
      };
    });
  };

  protected submitComment(): void {
    const commentBody: Comment = {
      post_id: this.postId,
      username: this.userName as string,
      comment: this.comment
    };
    this.comment = '';
    this.postsApiService.submitComment(commentBody).subscribe((post: any) => {
    });
    this.updateComments(commentBody);
  };

  protected loginUser():void {
    this.auth.loginWithRedirect();
  };

  private updateComments(newComment: Comment) {
    newComment['create_date'] = new Date();
    this.commentList.unshift(newComment);
    this.cdr.detectChanges();  
  };
  
}
