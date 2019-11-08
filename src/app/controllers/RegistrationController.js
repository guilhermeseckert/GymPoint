import * as Yup from 'yup';
import { startOfDay, parseISO, isBefore, addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';
import WellcomMail from '../jobs/WellcomeMail';
import Queue from '../../lib/Queue';

class RegisterController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const listRegistration = await Registration.findAll({
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(listRegistration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(401).json({ error: 'Plan does not exists' });
    }
    const dayStart = startOfDay(parseISO(start_date));
    if (isBefore(dayStart, new Date())) {
      return res.status(400).json({ error: 'past dates are not permitted' });
    }

    const registers = await Registration.create({
      student_id: req.body.student_id,
      plan_id: req.body.plan_id,
      start_date: parseISO(start_date),
      end_date: addMonths(parseISO(start_date), plan.duration),
      price: plan.price * plan.duration,
    });

    await Queue.add(WellcomMail.key, {
      student,
      plan,
      registers,
    });

    return res.json(registers);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { start_date, plan_id, student_id } = req.body;
    const plan = await Plan.findByPk(plan_id);

    const registers = await Registration.update(
      {
        start_date: parseISO(start_date),
        plan_id,
        student_id,
        end_date: addMonths(parseISO(start_date), plan.duration),
        price: plan.price * plan.duration,
      },
      { where: { id: plan_id } }
    );
    return res.json(registers);
  }

  async delete(req, res) {
    const registers = await Registration.findByPk(req.params.id);
    if (!registers) {
      return res.status(400).json({ error: 'registers is dont exist' });
    }
    await registers.destroy();
    return res.json(registers);
  }
}

export default new RegisterController();
