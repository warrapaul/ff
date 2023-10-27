import { BroadcastEventMessage } from "../dto/event-messages.dto";

export interface ServetToClientEvents{
    newBroadcastMessage: (payload: BroadcastEventMessage)=> void
}