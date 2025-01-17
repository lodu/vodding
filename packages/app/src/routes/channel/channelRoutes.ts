import express from "express";
import videoRouter from "./videoRoutes";
import chatRouter from "./chatRoutes";
import UserController from "../../controllers/UserController";

const channelRouter = express.Router();

channelRouter.get("/", async (req, res) => {
  res.send("Channel routes route");
});
channelRouter.get("/:channelName", async (req, res) => {
  const channelName = req.params.channelName;
  const user = await UserController.getVoddingTwitchUser(channelName);
  if (!user) {
    res.status(404).json({ error: "Channel not found" });
  }
  res.send(user);
});

channelRouter.use("/:channelName/video", videoRouter);
channelRouter.use("/:channelName/chat", chatRouter);

export default channelRouter;
