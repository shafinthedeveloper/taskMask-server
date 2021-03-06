const RoomModel = require("../model/Room.js");

exports.getRoomByOwnerid = getRoomByOwnerid = async (req, res) => {
  const { roomAdminID } = req.params;
  try {
    const Rooms = await RoomModel.find({ roomAdminID: roomAdminID }).populate({
      path: "roomMembers",
      populate: { path: "userID" },
    });

    res.status(200).json(Rooms);
  } catch (error) {
    console.log(error);
  }
};
exports.createRoom = createRoom = async (req, res) => {
  const roomData = req.body;
  const newRoom = RoomModel(roomData);
  try {
    await newRoom.save();
    res.status(200).send(newRoom);
  } catch (error) {
    console.log(error);
  }
};

exports.getRoomInfoByRoomID = getRoomInfoByRoomID = async (req, res) => {
  const { roomid } = req.params;
  try {
    const roomInfo = await RoomModel.findById({ _id: roomid })
      .populate("roomAdminID")
      .populate({ path: "roomMembers", populate: { path: "userID" } });

    res.status(200).json(roomInfo);
  } catch (error) {
    console.log(error);
  }
};
exports.updateRoom = updateRoom = async (req, res) => {
  const { roomid } = req.params;
  const updatedRoomData = req.body;

  try {
    await RoomModel.findOneAndUpdate(
      { _id: roomid },
      { $push: { roomMembers: updatedRoomData } },
      {
        new: true,
      }
    );
    const roomData = await RoomModel.find({ _id: roomid })
      .populate("roomAdminID")
      .populate({ path: "roomMembers", populate: { path: "userID" } });
    res.status(200).json(roomData);
  } catch (error) { }
};

exports.removeMemberFromRoom = removeMemberFromRoom = async (req, res) => {
  const { roomid } = req.params;
  const roomData = req.body;

  try {
    const RoomData = await RoomModel.findByIdAndUpdate(
      { _id: roomid },
      {
        roomMembers: roomData,
      },
      {
        new: true,
      }
    );
    const roomsData = await RoomModel.find({ _id: roomid })
      .populate("roomAdminID")
      .populate({ path: "roomMembers", populate: { path: "userID" } });
    res.status(200).json(roomsData);
  } catch (error) {
    console.log(error);
  }
};

// delete room by id
exports.deleteRoom = deleteRoom = async (req, res) => {
  const { id } = req.params;
  await RoomModel.findByIdAndDelete(id);
  res.status(200).json(id);
}
