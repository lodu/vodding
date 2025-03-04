import fs from 'node:fs';
import express from 'express';
import {StatusCodes} from 'http-status-codes';
import Bun from 'bun';
import logger from '@/utils/logger.js';

const videoRouter = express.Router(); // eslint-disable-line new-cap

videoRouter.get('/', async (request, response) => {
  const filePath =
    './Chase & Status, Bou - Baddadan ft. IRAH, Flowdan, Trigga, Takura [rkjNL4dX-U4].mp4';
  type OptionsType = {
    start: number | undefined;
    end: number | undefined;
  };
  const options: OptionsType = {
    start: undefined,
    end: undefined,
  };

  let start: number;
  let end: number;

  const range = request.headers.range;
  if (range) {
    const bytesPrefix = 'bytes=';
    if (range.startsWith(bytesPrefix)) {
      const bytesRange = range.slice(bytesPrefix.length);
      const parts = bytesRange.split('-');
      if (parts.length === 2) {
        const rangeStart = parts[0]?.trim();
        if (rangeStart && rangeStart.length > 0) {
          start = Number.parseInt(rangeStart, 10);
          options.start = start;
        }

        const rangeEnd = parts[1]?.trim();
        if (rangeEnd && rangeEnd.length > 0) {
          end = Number.parseInt(rangeEnd, 10);
          options.end = end;
        }
      }
    }
  }

  response.setHeader('content-type', 'video/mp4');

  const videoFile = Bun.file(filePath);

  if (!(await videoFile.exists())) {
    response.status(StatusCodes.NOT_FOUND).send('Video File not found');
    return;
  }

  const contentLength = videoFile.size;

  if (request.method === 'HEAD') {
    response.statusCode = 200;
    response.setHeader('accept-ranges', 'bytes');
    response.setHeader('content-length', contentLength);
    response.end();
  } else {
    let retrievedLength: number;

    if (options.start !== undefined) {
      retrievedLength =
        options.end === undefined
          ? contentLength - options.start
          : options.end + 1 - options.start;
    } else if (options.end === undefined) {
      retrievedLength = contentLength;
    } else {
      retrievedLength = options.end + 1;
    }

    response.statusCode =
      options.start !== undefined || options.end !== undefined
        ? StatusCodes.PARTIAL_CONTENT
        : StatusCodes.OK;

    response.setHeader('content-length', retrievedLength);

    if (range !== undefined) {
      response.setHeader(
        'content-range',
        `bytes ${options.start ?? 0}-${options.end ?? contentLength - 1}/${contentLength}`,
      );
      response.setHeader('accept-ranges', 'bytes');
    }

    const fileStream = fs.createReadStream(filePath, options);
    fileStream.on('error', (error) => {
      logger.info(`Error reading file ${filePath}.`);
      logger.info(error);
      response.sendStatus(500);
    });

    fileStream.pipe(response);
  }
});

export default videoRouter;
