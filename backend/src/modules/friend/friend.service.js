import { Friend } from "./friend.model.js";
import { User } from "../user/user.model.js";


// gui loi moi ket ban
export const sendFriendRequestService = async (requesterId, receiverId) => {
    if (requesterId == receiverId) {
        throw new Error("Không thể gửi lời mời cho chính mình");
    }
    const existing = await Friend.findOne(
        {
            // kiem tra da ket ban trc do chua
            $or: [
                {
                    requester: requesterId, receiver: receiverId
                },
                {
                    requester: receiverId, receiver: requesterId
                }
            ],

        },
    );
    if (existing) {
        throw new Error("Đã gửi hoặc đã có lời mời kết bạn trước đó");
    };

    // them moi 
    const request = await Friend.create({
        requester: requesterId,
        receiver: receiverId,
    });


    return request;
};

// chap nhan loi moi
export const acceptFriendRequestService = async (receiverId, requesterId) => {
    const request = await Friend.findOne(
        {
            requester: requesterId,
            receiver: receiverId,
            status: "pending",
        }
    );

    console.log("req", requesterId)
    console.log("rec", receiverId)

    if (!request) throw new Error("khong co loi moi ket ban!");

    // cap nhat trang thai va luu lai
    request.status = "accepted";
    await request.save();

    // cap nhat vao danh sach ban be 2 ben
    await User.findByIdAndUpdate(requesterId, { $addToSet: { friends: receiverId } });
    await User.findByIdAndUpdate(receiverId, { $addToSet: { friends: requesterId } });

    return request;
}

// tu choi loi moi ket ban
export const declineFriendRequestService = async (requesterId, receiverId) => {
    const request = await Friend.findOne(
        {
            requester: requesterId,
            receiver: receiverId,
            status: "pending",
        },
        { status: "rejected" },
        { new: true },
    );

    if (!request) throw new Error("khong co loi moi ket ban!");

    return request;
};


// huy ket ban
export const removeFriendService = async (userId, friendId) => {
    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

    await Friend.deleteMany({
        $or: [
            { requester: userId, receiver: friendId },
            { requester: friendId, receiver: userId },
        ],
    });
};

// lay danh sach loi moi
export const getPendingRequestsService = async (userId) => {
    const requests = await Friend.find({ receiver: userId, status: "pending" })
        .populate("requester", "displayName avatarUrl email");
    return requests;
};

// lay danh sach ban be
export const getFriendsService = async (userId) => {
    const user = await User.findById(userId).populate("friends", "displayName avatarUrl email");
    return user?.friends || [];
};
