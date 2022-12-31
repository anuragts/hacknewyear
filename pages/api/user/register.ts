import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";
const bcrypt = require("bcryptjs");

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    name,
    email,
    password,
    password2,
  }: { name: string; email: string; password: string; password2: string } =
    req.body;
  const exists: Promise<Array<{ id: number }>> = prisma.user.findMany({
    where: { email },
  });
  if (!name || !email || !password || !password2) {
    res.status(400).json("Please enter all fields");
  } else if ((await exists).length > 0) {
    res.status(400).json("User already exists");
  } else if (password !== password2) {
    res.status(400).json("Passwords do not match");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  }
}
