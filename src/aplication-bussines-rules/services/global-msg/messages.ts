const { GlobalMsg } = require("../../../enterprise-bussines-rules/models/global-msg.model");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../../frameworks-drivers/database");

export default class GlobalMessageService {
  constructor() {}

  async insertMessage(user : any, msg : any) {
    try {
      return await GlobalMsg.create({
        msg,
        uid: user.data.id,
      });
    } catch (error) {
      return false;
    }
  }

  async getMessagesBetween(first :  any, last : any) {}

  async geMessages() {
    return await sequelize.query(
      "SELECT global_messages.id AS id_message, global_messages.msg AS message, global_messages.date AS date, users.id AS id_user, users.username AS username FROM global_messages INNER JOIN users ON users.id = global_messages.uid ORDER BY global_messages.date ASC",
      {
        type: QueryTypes.SELECT,
      }
    );
  }
}


