import { NextFunction, Request, Response } from "express";

import config from "@utils/config.js";

const rateLimits = new Map<string, { count: number; startTime: number }>();

const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;

  const currentRequestTime = Date.now();

  if (ip) {
    const ipKey = `ip:${ip}`;
    if (isLimited(ipKey, currentRequestTime)) {
      res.status(429).json({ message: "Too many requests, please try again later." });
      return;
    }
  }

  next();
};

const isLimited = (key: string, currentTime: number): boolean => {
  if (!rateLimits.has(key)) {
    rateLimits.set(key, { count: 1, startTime: currentTime });
    return false;
  }

  const requestData = rateLimits.get(key)!;
  if (currentTime > requestData.startTime + config.rateLimit.time) {
    rateLimits.set(key, { count: 1, startTime: currentTime });
    return false;
  }

  if (requestData.count < config.rateLimit.access) {
    requestData.count++;
    return false;
  }

  return true;
};

export default rateLimit;
