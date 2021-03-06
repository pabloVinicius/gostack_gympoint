import * as Yup from 'yup';
import { Op } from 'sequelize';
import { Student } from '../models';

class StudentController {
  async index(req, res) {
    const { perPage = 5, page = 0, q = null } = req.query;

    const whereParam = q ? { where: { name: { [Op.iLike]: `%${q}%` } } } : {};

    const { rows: students, count } = await Student.findAndCountAll({
      attributes: ['name', 'email', 'age', 'id'],
      offset: page * perPage, // witch page we are looking for
      limit: perPage, // number of entries for page
      ...whereParam,
    });

    if (students.length === 0) {
      return res.status(404).json({ error: 'No students found' });
    }

    const pages = Math.ceil(count / perPage);
    return res.json({ students, pages, count });
  }

  async read(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const { name, email, age, height, weight } = student;

    return res.json({ student: { name, email, age, height, weight } });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .positive()
        .max(150)
        .required(),
      height: Yup.number().required(),
      weight: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already registered' });
    }

    const { id, name, age, height, weight } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .integer()
        .max(150)
        .positive(),
      height: Yup.number().positive(),
      weight: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    if (!(req.body && Object.entries(req.body).length > 0)) {
      return res.status(400).json({
        error:
          'At least one of the following fields is required: name, email, age, height, weight',
      });
    }

    const fields = ['name', 'email', 'age', 'height', 'width'];
    const bodyFields = Object.keys(req.body);
    const intersection = fields.filter(el => bodyFields.includes(el));
    if (intersection.length === 0) {
      return res.status(400).json({
        error:
          'At least one of the following fields is required: name, email, age, height, weight',
      });
    }

    const { email } = req.body;

    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student does not exists' });
    }

    if (email && email !== student.email) {
      const registered = await Student.findOne({ where: { email } });
      if (registered) {
        return res.status(404).json({ error: 'Email is already in use' });
      }
    }

    const updated = await student.update(req.body);
    return res.json(updated);
  }
}

export default new StudentController();
