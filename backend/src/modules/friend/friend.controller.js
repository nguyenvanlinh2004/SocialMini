import {
    sendFriendRequestService,
    getFriendsService,
    acceptFriendRequestService,
    declineFriendRequestService,
    removeFriendService,
    getPendingRequestsService
} from "./friend.service.js";


// gui loi moi ket ban
export const sendFriendRequest = async (req, res) => {
    try {
        const { userId } = req.params;
        const requesterId = req.user._id;
        if (!userId || !requesterId) return res.status(404).json({ message: "User khong ton tai!" });

        const request = await sendFriendRequestService(requesterId, userId);
        return res.status(200).json({ message: "Da gui loi moi ket ban", request })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message || "loi he thong" });
    }
};

// chap nhan loi moi ket ban
export const acceptFriendRequest = async (req, res) => {
    try {
        const { userId } = req.params;
        const receiverId = req.user._id;

        const request = await acceptFriendRequestService(receiverId, userId);
        res.status(200).json({ message: "Đã chấp nhận kết bạn", request });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// tu choi loi moi ket ban
export const declineFriendRequest = async (req, res) => {
    try {
        const { userId } = req.params;
        const receiverId = req.user._id;

        const request = await declineFriendRequestService(receiverId, userId);
        return res.status(200).json({ message: "Đã tu choi kết bạn", request });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// huy ket ban
export const removeFriend = async (req, res) => {
    try {
        const { userId } = req.params;
        await removeFriendService(req.user._id, userId);
        return res.status(200).json({ message: "Đã hủy kết bạn" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// danh sach ban be
export const listFriend = async (req, res) => {
    try {
        const list = await getFriendsService(req.user._id);
        return res.status(200).json({
            message: "danh sach ban be",
            total: list.length,
            list
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// danh sach loi moi ket ban
export const listFriendRequest = async (req, res) => {
    try {
        const list = await getPendingRequestsService(req.user._id);
        return res.status(200).json({
            message: "danh sach loi moi ket ban",
            total: list.length,
            list
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



