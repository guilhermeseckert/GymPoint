import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const studentExist = await Student.findOne({
      where: { email: req.body.email },
    });
    if (studentExist) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, email, idade, peso, altura } = await Student.create(
      req.body
    );
    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }

  // User.update();
  async update(req, res) {
    const { id, name, email, idade, peso, altura } = Student.update(
      {
        name: req.body.name,
        email: req.body.email,
        idade: req.body.idade,
        peso: req.body.peso,
        altura: req.body.altura,
      },
      { where: { id: req.body.id } }
    );
    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }
}
export default new StudentController();
