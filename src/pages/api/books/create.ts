/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, edition, year, release, status, inventory, institution } = req.body;

  await prisma.book.create({
    data: {
      name,
      edition,
      year,
      release,
      status,
      inventory,
      institution,
    }
  })

  return res.status(201).json({})
}