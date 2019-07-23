import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { QueryRef, Apollo } from 'apollo-angular';
import { getPosts, likePosts, unlikePosts } from '../../../graphql';
import { Subscription } from 'rxjs';

@Component({
    selector: "ions-posts",
    templateUrl: "./posts.component.html",
    styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
    posts: any[];
    name: string = "Oak Soe";
    todoQuery: QueryRef<any>;
    todoSubscription: Subscription;
    post_id = 5;

    constructor(
        public dialog: MatDialog,
        private apollo: Apollo
    ) { }

    ngOnInit() {
        this.showPosts();
    }

    showPosts() {
        this.todoQuery = this.apollo
            .watchQuery({
                query: getPosts,
                // variables: {
                //     room_id: this.post_id
                // }
            });
        this.todoSubscription = this.todoQuery.valueChanges
            .subscribe(({ data }) => {
                this.posts = data.posts;
                //console.log(this.posts);
                for (var i = 0; i < this.posts.length; i++) {
                    if (this.posts[i].like.indexOf(this.name) == -1) {
                        this.posts[i].liked = false;
                    } else {
                        this.posts[i].liked = true;
                    }
                }
            });
    }

    like(position, post_id) {
        if (this.posts[position].like.indexOf(this.name) == -1) {
            this.apollo.mutate({
                mutation: likePosts,
                variables: { post_id: post_id, likeUser: this.name }
            }).subscribe();
            this.posts[position].like.push(this.name);
            this.posts[position].liked = true;
        } else {
            this.posts[position].liked = false;
            this.apollo.mutate({
                mutation: unlikePosts,
                variables: { post_id: post_id, unlikeUser: this.name }
            }).subscribe();
            var index = this.posts[position].like.indexOf(this.name);
            this.posts[position].like.splice(index, 1);
        }
    }

    likeList(position, post_id) {
        const dialogRef = this.dialog.open(CommentDialog, {
            width: "99%",
            data: { name: this.name, likes: this.posts[position].like, LC: false }
        });
    }

    comment(position, post_id): void {
        const dialogRef = this.dialog.open(CommentDialog, {
            width: "99%",
            data: { name: this.name, comments: this.posts[position].comments, LC: true }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.posts[position].comments.push(result);
            }
        });
    }

    share(position, post_id) {
        this.posts[position].share += 1;
    }
}

@Component({
    selector: "comment-dialog",
    templateUrl: "comment.dialog.html",
    styleUrls: ["./comment.dialog.scss"]
})
export class CommentDialog {
    constructor(
        public dialogRef: MatDialogRef<CommentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
