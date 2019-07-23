import { InputType, Field, ObjectType } from 'type-graphql';

@InputType()
export class PostsInput {
    @Field()
    readonly post_id: string;
    @Field()
    readonly avatar: string;
    @Field()
    readonly post_owner: string;
    @Field()
    readonly name: string;
    @Field()
    readonly time: string;
    @Field(type => [String])
    readonly contentUrl!: string[];
    @Field()
    readonly contentType: string;
    @Field()
    readonly status: string;
    @Field(type => [String])
    readonly like: [String];
    @Field(type => [String])
    readonly comments: [string];
    @Field()
    readonly share: number;
    @Field()
    readonly liked: boolean;
    @Field()
    readonly created_date: string;
}

@ObjectType()
export class PostsType {
    @Field()
    readonly post_id: string;
    @Field()
    readonly avatar: string;
    @Field()
    readonly post_owner: string;
    @Field()
    readonly name: string;
    @Field()
    readonly time: string;
    @Field(type => [String])
    readonly contentUrl: string[];
    @Field()
    readonly contentType: string;
    @Field()
    readonly status: string;
    @Field(type => [String])
    readonly like: [String];
    @Field(type => [String])
    readonly comments: [string];
    @Field()
    readonly share: number;
    @Field()
    readonly liked: boolean;
    @Field()
    readonly created_date: string;
}
