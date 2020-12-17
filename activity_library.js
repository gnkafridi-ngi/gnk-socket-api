const activityLibrarySocket = socket => {
    socket.on('move-start', (data) => {
        socket.to(data.room).broadcast.emit('move-start', data);
    });
    socket.on('move-end', (data) => {
        socket.to(data.room).broadcast.emit('move-end', data);
    });
    socket.on('move-selected-start', (data) => {
        socket.to(data.room).broadcast.emit('move-selected-start', data);
    });
    socket.on('move-selected-end', (data) => {
        socket.to(data.room).broadcast.emit('move-selected-end', data);
    });

    socket.on("item-moved", (data) => {
        console.log("item-moved");
        socket.to(data.room).broadcast.emit('item-moved', data.item, data.type);
    });

    socket.on('started', (data) => {
        socket.to(data.room).broadcast.emit('start', data);
    });
}

module.exports = activityLibrarySocket;