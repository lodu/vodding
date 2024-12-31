import express from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import Bun from "bun"; // Assuming Bun is a valid import

const videoRouter = express.Router();

videoRouter.get("/", async (req, res) => {
  const filePath =
    "./Chase & Status, Bou - Baddadan ft. IRAH, Flowdan, Trigga, Takura [rkjNL4dX-U4].mp4";
  type optionsType = {
    start: number | undefined;
    end: number | undefined;
  };
  const options: optionsType = {
    start: undefined,
    end: undefined,
  };

  let start: number;
  let end: number;

  const range = req.headers.range;
  if (range) {
    const bytesPrefix = "bytes=";
    if (range.startsWith(bytesPrefix)) {
      const bytesRange = range.substring(bytesPrefix.length);
      const parts = bytesRange.split("-");
      if (parts.length === 2) {
        const rangeStart = parts[0] && parts[0].trim();
        if (rangeStart && rangeStart.length > 0) {
          options.start = start = parseInt(rangeStart);
        }
        const rangeEnd = parts[1] && parts[1].trim();
        if (rangeEnd && rangeEnd.length > 0) {
          options.end = end = parseInt(rangeEnd);
        }
      }
    }
  }

  res.setHeader("content-type", "video/mp4");

  const videoFile = Bun.file(filePath);

  if (!(await videoFile.exists())) {
    res.status(StatusCodes.NOT_FOUND).send("Video File not found");
    return;
  }
  let contentLength = videoFile.size;

  if (req.method === "HEAD") {
    res.statusCode = 200;
    res.setHeader("accept-ranges", "bytes");
    res.setHeader("content-length", contentLength);
    res.end();
  } else {
    let retrievedLength: number;

    if (options.start !== undefined) {
      if (options.end !== undefined) {
        retrievedLength = options.end + 1 - options.start;
      } else {
        retrievedLength = contentLength - options.start;
      }
    } else if (options.end !== undefined) {
      retrievedLength = options.end + 1;
    } else {
      retrievedLength = contentLength;
    }

    res.statusCode =
      options.start !== undefined || options.end !== undefined
        ? StatusCodes.PARTIAL_CONTENT
        : StatusCodes.OK;

    res.setHeader("content-length", retrievedLength);

    if (range !== undefined) {
      res.setHeader(
        "content-range",
        `bytes ${options.start || 0}-${options.end || contentLength - 1}/${contentLength}`,
      );
      res.setHeader("accept-ranges", "bytes");
    }

    const fileStream = fs.createReadStream(filePath, options);
    fileStream.on("error", (error) => {
      console.log(`Error reading file ${filePath}.`);
      console.log(error);
      res.sendStatus(500);
    });

    fileStream.pipe(res);
  }
});

export default videoRouter;
