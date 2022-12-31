import type{ NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";
const bcrypt = require("bcryptjs");

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password }: { email: string; password: string } = req.body;
  if (!email || !password) {
    res.status(400).send("Please fill all fields");
  } else {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },  
      },
    });
    if (!user) {
      res.status(401).send("User does not exist");
    } else if (!bcrypt.compareSync(password, user.password)) {
      res.status(400).send(JSON.stringify({ message: "Incorrect Passowrd" }));
    } else {
      res.status(200).json(user);
    }
  }
}
