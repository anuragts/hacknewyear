import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function deleteSubtask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: { id: string } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing some fields" });
  } else {
    const subtasks = await prisma.subtask.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(subtasks);
  }
}
