import {User} from "./User";
import {Mesasge} from "./Message";

export interface Room {
    id: string
    users: Array<User>
    messages: Array<Mesasge>
}