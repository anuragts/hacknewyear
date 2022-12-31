import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    title,
    description,
    taskId,
  }: { title: string; description: string; taskId: string } = req.body;
  if (!title || !description || !taskId) {
    return res.status(400).json({ message: "Missing some fields" });
  } else {
    const taskIdInt:number = parseInt(taskId);
    const subtask = await prisma.subtask.create({
      data: {
        title,
        description,
        resolution: {
          connect: {
            id: taskIdInt,  
          },
        },
      },
    });
    res.status(201).json(subtask);
  }
}
