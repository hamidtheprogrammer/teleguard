var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { db } from "../database/dbConfig.js";
import { authCache } from "../index.js";
const getAppointments = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const cachedUser = authCache.get(userId);
    if (cachedUser) {
      // Attach cached user to request
      res.status(200).json(cachedUser);
      return;
    }
    try {
      const appointments = yield db.appointment.findMany({ take: 6 });
      res.status(200).json(appointments);

      cache.set(userId, appointments, 600);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });
const createAppointment = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const {
    //   docInfo,
    //   patientInfo,
    //   status = "PENDING",
    //   doctorComment,
    //   patientComplaint,
    //   date,
    // } = req.body;

    try {
      const newAppointment = yield db.appointment.findFirst({
        where: { id: "674225fe5ed8a33d6ddab15d" },
      });
      // yield db.appointment.create({
      //   data: {
      //     docInfo,
      //     patientInfo,
      //     status,
      //     doctorComment,
      //     patientComplaint,
      //     date: new Date(date),
      //   },
      // });
      res.status(200).json(newAppointment);
      console.log(newAppointment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create appointment" });
    }
  });
const updateAppointment = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status, doctorComment, patientComplaint } = req.body;
    try {
      const updatedAppointment = yield db.appointment.update({
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
  });
export { getAppointments, createAppointment, updateAppointment };
