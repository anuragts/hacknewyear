import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    title,
    description,
    userId,
    completeby,
  }: { title: string; description: string; userId: string ; completeby:string } = req.body;
  if (!title || !description || !userId) {
    return res.status(400).json({ message: "Missing some fields" });
  } else {
    const userIdInt:number = parseInt(userId);
    //  convert completeby to date
    const completebyDate:Date = new Date(completeby);
    const resolution = await prisma.resolution.create({
      data: {
        title,
        description,
        completeby:completebyDate,
        user: {
          connect: {
            id: userIdInt,  
          },
        },
      },
    });
    res.status(201).json(resolution);
  }
}
