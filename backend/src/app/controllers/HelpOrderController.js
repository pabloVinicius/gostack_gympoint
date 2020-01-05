import * as Yup from 'yup';
import { HelpOrder, Student } from '../models';

class HelpOrderController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 0, perPage = 5 } = req.query;

    /*
      Check if Student exists
    */
    const user = await Student.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const { rows: helpOrders, count } = await HelpOrder.findAndCountAll({
      where: { student_id: id },
      offset: page * perPage,
      limit: perPage,
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
      include: [
        {
          model: Student,
          foreignKey: 'student_id',
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (helpOrders.length === 0) {
      return res
        .status(404)
        .json({ error: 'No help orders found for this student.' });
    }
    const pages = Math.ceil(count / perPage);
    return res.json({ helpOrders, pages, count });
  }

  async store(req, res) {
    const { id } = req.params;

    /*
      Check if Student exists
    */
    const user = await Student.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const schema = Yup.object().shape({
      question: Yup.string().min(10),
    });

    /*
      Check schema validation
    */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const helpOrder = await HelpOrder.create({
      ...req.body,
      student_id: id,
    });

    return res.json({ helpOrder });
  }
}

export default new HelpOrderController();
