import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await prisma.user.findMany({
    include:{
        resolutions: {
            where:{
                isCompleted: true
            },
            select:{
                id: true,
            }
        },
        
    },
  });
  res.status(200).json(users);
}
