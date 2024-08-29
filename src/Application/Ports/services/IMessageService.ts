
export interface IMessageService {
  getMessagesByRoom(id: string): Promise<any>;
  saveMessage(message: any): Promise<any>;
  editMessage(message: any): Promise<any>;
  deleteMessage(id: string): Promise<any>;
  getGlobalMessages(): Promise<any>;  
}