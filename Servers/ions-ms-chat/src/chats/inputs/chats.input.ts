import { InputType, Field } from 'type-graphql';

@InputType()
export class ChatsInput {
    @Field()
    readonly sender: string;
    @Field()
    readonly sender_name: string;
    @Field()
    readonly receiver: string;
    @Field()
    readonly receiver_name: string;
    @Field()
    readonly msg: string;
    @Field()
    readonly sendTime: string;
    @Field()
    readonly room_id: string;
    @Field()
    readonly receiveTime: string;
    @Field()
    readonly date: string;
}
