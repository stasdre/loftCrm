const mongoose = require("mongoose");
const schema = require("../schemas/chat");

const Chat = mongoose.model("Chat");

module.exports = io => {
  const connections = {};

  io.on("connection", socket => {
    socket.on("users:connect", user => {
      const dataUser = {
        id: socket.id,
        username: user.username
      };
      connections[socket.id] = dataUser;

      socket.json.emit("users:list", Object.values(connections));
      socket.broadcast.emit("users:add", dataUser);
    });

    socket.on("message:add", mess => {
      // const { error, value } = schema.validate(mess);

      socket.json.emit("message:add", {
        senderId: mess.senderId,
        text: mess.text
      });
      socket.broadcast.to(mess.roomId).json.emit("message:add", {
        senderId: socket.id,
        text: mess.text
      });

      // if (!error) {
      //   const newChat = new Chat({
      //     ...value
      //   });

      //   newChat
      //     .save()
      //     .then(c => {
      //     })
      //     .catch(e => {
      //       console.log(e);
      //     });
      // }
    });

    socket.on("message:history", roomId => {
      Chat.find({ roomId: roomId }).then(c => {
        const history = c.map(item => item.transform());
        socket.json.emit("message:history", history);
      });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("users:leave", connections[socket.id].id);
      delete connections[socket.id];
    });
  });
};
