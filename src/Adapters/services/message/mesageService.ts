import { IMessageService } from "../../../Application/Ports/services/IMessageService";

export class MessageService implements IMessageService{
  getGlobalMessages(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getMessagesByRoom(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  saveMessage(message: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  editMessage(message: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteMessage(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
}