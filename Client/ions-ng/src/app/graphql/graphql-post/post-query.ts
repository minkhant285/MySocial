import gql from 'graphql-tag';

export const getPosts = gql`
query {
    posts {
      post_id
      avatar
      post_owner
      name
      time
      contentUrl
      contentType
      status
      like
      comments
      share
      liked
      created_date
    }
  }

`;

export const createPost = gql`
mutation($post_id:String!,$avatar:String!,$post_owner:String!,$name:String!,$contentUrl:[String!]!,$contentType:String!,$status:String!,$created_date:String!,$time:String!){
    postCreate(input:{
     post_id: $post_id,
     avatar: $avatar,
     post_owner: $post_owner,
     name: $name,
     contentUrl: $contentUrl,
     contentType: $contentType,
     status: $status,
     like: [],
     comments: [],
     share:0
     liked:false,
     created_date: $created_date,
     time: $time
   })
     {
       status
   }
   }
`;

export const likePosts = gql`
mutation($post_id:String!,$likeUser:String!){
    postLike(post_id:$post_id,likeUser:$likeUser){
      like
    }
  }`;

export const unlikePosts = gql`
  mutation($post_id:String!,$unlikeUser:String!){
      postUnLike(post_id:$post_id,unlikeUser:$unlikeUser){
        like
      }
    }`;
