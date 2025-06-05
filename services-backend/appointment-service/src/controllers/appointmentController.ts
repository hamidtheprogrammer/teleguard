import { Request, Response } from "express";
import { db } from "../database/dbConfig";

const getAppointments = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const appointments = await db.appointment.findMany({ take: 6 });

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

const createAppointment = async (req: Request, res: Response) => {
  const {
    docInfo,
    patientInfo,
    status = "PENDING",
    doctorComment,
    patientComplaint,
    date,
  } = req.body;

  try {
    const newAppointment = await db.appointment.create({
      data: {
        docInfo,
        patientInfo,
        status,
        doctorComment,
        patientComplaint,
        date: new Date(date),
      },
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to create appointment" });
  }
};

const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, doctorComment, patientComplaint } = req.body;

  try {
    const updatedAppointment = await db.appointment.update({
      where: { id },
      data: {
        status,
        doctorComment,
        patientComplaint,
      },
    });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to update appointment" });
  }
};

export { getAppointments, createAppointment, updateAppointment };
