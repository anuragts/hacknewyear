import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function completed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id , userId }: { id: string , userId:string } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing some fields" });
  } else {
    const resolution = await prisma.resolution.update({
      where: {
        id: parseInt(id),
      },
      data:{
        isCompleted: true,
      }
    });
    res.status(200).json(resolution);
  }
}
