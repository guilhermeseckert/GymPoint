import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const listPlans = await Plan.findAll({
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(listPlans);
  }

  async store(req, res) {
    const planExist = await Plan.findOne({
      where: { title: req.body.title },
    });
    if (planExist) {
      return res.status(400).json({ error: 'Plan already exists.' });
    }
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
      duration: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);
    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
      id: Yup.number().required(),
      duration: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan is dont exist' });
    }
    const { id, title, duration, price } = await Plan.update(
      {
        title: req.body.title,
        duration: req.body.duration,
        price: req.body.price,
      },
      { where: { id: req.body.id } }
    );
    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan is dont exist' });
    }
    await plan.destroy();
    return res.json(plan);
  }
}

export default new PlanController();
