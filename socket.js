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
      socket.json.emit("message:add", {
        senderId: mess.senderId,
        text: mess.text
      });
      socket.broadcast.to(mess.roomId).json.emit("message:add", {
        senderId: socket.id,
        text: mess.text
      });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("users:leave", socket.id);
      delete connections[socket.id];
    });
  });
};
