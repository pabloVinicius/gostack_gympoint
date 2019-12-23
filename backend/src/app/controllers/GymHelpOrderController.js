import * as Yup from 'yup';
import { HelpOrder, Student } from '../models';
import { haveAtLeastOneParameter } from '../helpers/CommonHelpers';
import { Queue } from '../../lib';
import { HelpOrderAnswerMail } from '../jobs';

class GymHelpOrderController {
  async index(req, res) {
    const { page = 0, perPage = 5 } = req.query;

    const { rows: helpOrders, count } = await HelpOrder.findAndCountAll({
      where: { answer_at: null },
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

  async update(req, res) {
    const { id } = req.params;

    /*
      Check if Help Order exists
    */
    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          foreignKey: 'student_id',
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    if (!helpOrder) {
      return res.status(404).json({ error: 'Help order not found.' });
    }

    /*
      Check if user has sent at least one parameter
    */
    const parameters = ['answer'];
    if (!haveAtLeastOneParameter(parameters, req.body)) {
      return res.status(400).json({
        error: `You have to send at least one of the following parameters: ${parameters.join(
          ', '
        )}`,
      });
    }

    const schema = Yup.object().shape({
      answer: Yup.string().min(10),
    });

    /*
      Check schema validation
    */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    await helpOrder.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    const { student, id: helpOrderId, answer, answer_at, question } = helpOrder;

    await Queue.add(HelpOrderAnswerMail.key, {
      id: helpOrderId,
      student,
      answer,
      question,
      answer_at,
    });

    return res.json({ helpOrder });
  }
}

export default new GymHelpOrderController();
