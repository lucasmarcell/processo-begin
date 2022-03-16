/* eslint-disable import/no-anonymous-default-export */
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { nome, email, user, pass } = req.body;

  const hashPassword = await hash(pass, 10)

  await prisma.administrator.create({
    data: {
      nome,
      email,
      user,
      pass: hashPassword,
    }
  })

  return res.status(201).json({})
}