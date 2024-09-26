import {User} from "./User";
import {Message} from "./Message.entity";

export interface Room {
    id: string
    users: Array<User>
    messages: Array<Message>
}