import * as Yup from 'yup';
import Help_order from '../models/Help_order';
import Student from '../models/Student';

class HelpOrdersController {
  async index(req, res) {
    const student_id = req.params.id;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const { page = 1 } = req.query;
    const list_help_order = await Help_order.findAll({
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    if (!list_help_order) {
      return res.status(400).json({ error: 'not have checkins' });
    }

    return res.json(list_help_order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const student_id = req.params.id;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    const { question } = req.body;

    const help_order = await Help_order.create({
      question,
      student_id,
    });
    return res.json(help_order);
  }
}

export default new HelpOrdersController();
