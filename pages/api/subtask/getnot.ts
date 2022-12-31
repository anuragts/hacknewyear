import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { resolutionIds } = req.body;
  const resolutionIdInt = parseInt(resolutionIds);

  const subtasks = await prisma.subtask.findMany({
    where: {
      resolutionId: resolutionIdInt,
      isCompleted: false,

    }, 
  });
  return res.status(200).json(subtasks);
}
