import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const listStudents = await Student.findAll({
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(listStudents);
  }

  async store(req, res) {
    const studentExist = await Student.findOne({
      where: { email: req.body.email },
    });
    if (studentExist) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, email, age, height, weitht } = await Student.create(
      req.body
    );
    return res.json({
      id,
      name,
      email,
      age,
      height,
      weitht,
    });
  }

  // User.update();
  async update(req, res) {
    const { id, name, email, age, Weight, height } = Student.update(
      {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        height: req.body.height,
        Weight: req.body.Weight,
      },
      { where: { id: req.body.id } }
    );
    return res.json({
      id,
      name,
      email,
      age,
      height,
      Weight,
    });
  }
}
export default new StudentController();
