const { GlobalMsg } = require("../../models/global-msg.model");
const { User } = require("../../models/user.model");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../database");

class GlobalMessage {
  constructor() {}

  async insertMessage(user, msg) {
    try {
      const saved_msg = await GlobalMsg.create({
        msg,
        uid: user.data.id,
      });
      return saved_msg;
    } catch (error) {
      return false;
    }
  }

  async geMessages() {
    return await sequelize.query(
      "SELECT global_messages.id AS id_message, global_messages.msg AS message, global_messages.date AS date, users.id AS id_user, users.username AS username FROM global_messages INNER JOIN users ON users.id = global_messages.uid ORDER BY global_messages.date ASC",
      {
        type: QueryTypes.SELECT,
      }
    );
  }
}

module.exports = { GlobalMessage };
