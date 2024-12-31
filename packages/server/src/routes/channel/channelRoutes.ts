import express from "express";
import videoRouter from "./videoRoutes";
import chatRouter from "./chatRoutes";


const channelRouter = express.Router();

channelRouter.get("/", async (req, res) => {
    res.send("Channel routes route");
});
channelRouter.get("/:channelName", async (req, res) => {
    res.send("Channel route " + req.params.channelName);
});

channelRouter.use('/:channelName/video', videoRouter)
channelRouter.use('/:channelName/chat', chatRouter)

export default channelRouter;
