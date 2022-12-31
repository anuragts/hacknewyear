import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function completed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id , userId , completedAt }: { id: string , userId:string , completedAt:string } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing some fields" });
  } else { 
    const date:Date = new Date(completedAt)
    const resolution = await prisma.resolution.update({
      where: {
        id: parseInt(id),
      },
      data:{
        isCompleted: true,
        completedAt:date
      }
    });
    res.status(200).json(resolution);
  }
}
