import { Component, OnInit } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { createPost } from '../../../graphql';
import * as uuidv4 from 'uuid/v4';

@Component({
    selector: "ions-create-post",
    templateUrl: "./create-post.component.html",
    styleUrls: ["./create-post.component.scss"]
})
export class CreatePostComponent implements OnInit {

    showPosts: boolean = true;
    name: string = "Oak Soe";

    post_id: string = uuidv4();
    status: string = "";
    avatarUrl: string = "../../../../assets/profile.png";
    user_id: string = "12345";
    contentUrl: string[] = [];
    contentType: string = "status";
    contentTypes: string[] = ["Photos", "Videos", "Audio"];
    types: string = "";

    constructor(
        private apollo: Apollo
    ) { }

    ngOnInit() { }

    callCreatePost() {
        this.showPosts = false;
    }

    createPost() {
        if (this.status != "" || this.contentUrl.length > 0) {
            this.apollo.mutate({
                mutation: createPost,
                variables: {
                    post_id: this.post_id,
                    avatar: this.avatarUrl,
                    post_owner: this.user_id,
                    name: this.name,
                    contentUrl: this.contentUrl,
                    contentType: this.contentType,
                    status: this.status,
                    created_date: new Date().toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }),
                    time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
                }
            }).subscribe();
            this.showPosts = true;
        }
    }

    createPostCancel() {
        this.showPosts = true;
    }

    uploadPhoto(event) {
        this.contentType = event.target.files[0].type;
        for (var i = 0; i < event.target.files.length; i++) {
            this.contentUrl.push("../../../../assets/" + event.target.files[i].name);
        }
        console.log(event.target.files[0].type);
    }

    uploadVideos(event) {
        this.contentType = event.target.files[0].type;
        for (var i = 0; i < event.target.files.length; i++) {
            this.contentUrl.push("../../../../assets/" + event.target.files[i].name);
        }
        console.log(event.target.files[0].type);
    }

    uploadAudio(event) {
        this.contentType = event.target.files[0].type;
        for (var i = 0; i < event.target.files.length; i++) {
            this.contentUrl.push("../../../../assets/" + event.target.files[i].name);
        }
        console.log(event.target.files[0].type);
    }
}
