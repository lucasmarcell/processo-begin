/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, administrator, cep, country, state, city, district, street, number, complement } = req.body;

  await prisma.institution.create({
    data: {
      name,
      administrator,
      cep,
      country,
      state,
      city,
      district,
      street,
      number,
      complement
    }
  })

  return res.status(201).json({})
}