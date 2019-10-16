module.exports = io => {
  const connections = {};
  let users = [];

  const checkUser = id => {
    return users.find(item => id === item.userID);
  };

  io.on("connection", socket => {
    socket.on("users:connect", user => {
      //Check if user isset, remove old data
      // console.log("Connect", user, users, connections);

      // const oldUsers = checkUser(user.id);
      // if (oldUsers !== undefined) {
      //   socket.broadcast.emit("users:leave", connections[oldUsers.socketID].id);
      //   delete connections[oldUsers.socketID];
      //   users = users.filter(item => user.id !== item.userID);
      // }
      // users.push({ userID: user.id, socketID: socket.id });

      const dataUser = {
        id: user.id,
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
        senderId: connections[socket.id].id,
        text: mess.text
      });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("users:leave", connections[socket.id].id);
      delete connections[socket.id];
    });
  });
};
