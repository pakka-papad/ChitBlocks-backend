const http = require('http').createServer();
const {removeUser, getRoomId, addUser, getMaxBid} = require('./auctionData');

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join-room', (userId) => {

        let validUser = false;
        let groupId = "";
        /**
         * Check if user present in Mongodb
         * And if present get groupId of user
         */
        if(validUser){
            addUser({
                id: userId,
                groupId: groupId
            });
            socket.join(groupId);
            socket.in(groupId).emit('notification', {
                title: "room-join",
                description: `${userId} has joined the auction`
            } );
        } else {
            socket.emit('error', {
                error: "User not found",
                error_code: 100
            } );
        }
        
    });

    /**
     * Bid request
     */
    socket.on('make-bid', (bid) => {

        let roomId = getRoomId(bid.user.groupId);

        if(roomId != null){
            let maximumBid = getMaxBid(bid);
            socket.in(roomId).emit('notification', {
                title: "new bid",
                bid: maximumBid
            } );
        }
        
    });

    socket.on("disconnect", (userId) => {   

        removeUser(userId);
        console.log('a user left');

    });

});

http.listen(8081, () => console.log('listening on http://8081'));