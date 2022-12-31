import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId }: { userId: string } = req.body;
  const userIdInt = parseInt(userId);
  const user = await prisma.user.findUnique({
    where: {
      id: userIdInt,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  const resolutions = await prisma.resolution.findMany({
    where: {
      userId: userIdInt,
      isCompleted: true,
    },
  });

  const completedResolutions = resolutions.length;

  res.json({ user, completedResolutions });
}
