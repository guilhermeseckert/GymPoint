import * as Yup from 'yup';
import Help_order from '../models/Help_order';
import Student from '../models/Student';
import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const help_order_id = req.params.id;
    const help_order = await Help_order.findByPk(help_order_id, {
      attributes: ['id', 'question', 'answer', 'answer_at'],
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!help_order) {
      return res.status(401).json({ error: 'Help Order does not exists' });
    }

    const { answer } = req.body;

    await help_order.update({
      answer,
      answer_at: new Date(),
    });

    // email envio
    // await Queue.add(AnswerMail.key, {
    //   answer,
    // });

    return res.json(help_order);
  }
}

export default new AnswerController();
