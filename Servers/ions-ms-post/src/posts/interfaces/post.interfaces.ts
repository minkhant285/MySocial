import { Document } from 'mongoose';

export interface Posts extends Document {
    readonly post_id: string,
    readonly avatar: string,
    readonly post_owner: string,
    readonly name: string,
    readonly time: string,
    readonly contentUrl: string[],
    readonly contentType: string,
    readonly status: string,
    readonly like: string[],
    readonly comments: string[],
    readonly share: number,
    readonly liked: boolean,
    readonly created_date: string
}