import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;
  const userIdInt = parseInt(userId);

  const resolutions = await prisma.resolution.findMany({
    where: {
      userId: userIdInt,
      isCompleted: false,

    }, 
  });
  return res.status(200).json(resolutions);
}
