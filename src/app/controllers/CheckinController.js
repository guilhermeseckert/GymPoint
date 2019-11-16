import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const student_id = req.params.id;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const check_Checkins = await Checkin.findAll({
      where: {
        student_id,
      },
    });

    if (!check_Checkins) {
      return res.status(400).json({ error: 'not have checkins' });
    }

    return res.json(check_Checkins);
  }

  async store(req, res) {
    const student_id = req.params.id;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const check_Checkins = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (check_Checkins) {
      if (check_Checkins.length >= 5) {
        return res.status(400).json({
          error: 'Student only 5 chekins in a period of 7 days',
        });
      }
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}
export default new CheckinController();
