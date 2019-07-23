export type Posts = {
    findPost: {
        post_id: string,
        avatar: string,
        post_owner: string,
        name: string,
        time: string,
        contentUrl: string[],
        contentType: string,
        status: string,
        like: string[],
        comments: string[],
        share: number,
        liked: boolean,
        created_date: string
    }
}
