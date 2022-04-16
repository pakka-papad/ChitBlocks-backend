const users = new Map();
const bids = new Map();

/**
 * @param {String} userId Id of a User
 * @returns Room Id of a user if currently participating in auction else returns null
 */
const getRoomId = (userId) => {
    if(users.has(userId)) {
        return users[userId];
    } else {
        return null;
    }
}

/**
 * @param {user} user Add new user to auction
 */
const addUser = (user) => {
    users[user.id] = user.groupId;
}

/**
 * @param {String} userId remove a user from auction
 */
const removeUser = (userId) => {
    users.delete(userId);
}

/**
 * @param {bid} bid Update data and return maximum bid
 * @returns Maximum bid
 */
const getMaxBid = (bid) => {
    let date = new Date();
    let time = date.getMilliseconds();
    let maxBid = null;
    if(bids.has(bid.user.groupId)) {
        let previousBid = bids[bid.user.groupId];
        if(previousBid.amount < bid.amount) {
            bids[bid.user.groupId] = {...bid, timestamp: time};
            maxBid = bids[bid.user.groupId];
        } else {
            maxBid = previousBid;
        }
    } else {
        bid[bid.user.groupId] = {...bid, timestamp: time};
        maxBid = bids[bid.user.groupId];
    }
    return maxBid;
}

module.exports = {getRoomId, addUser, removeUser, getMaxBid};