import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import { Checkin, Student, Registration } from '../models';

class CheckinController {
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

    const { rows: checkins, count } = await Checkin.findAndCountAll({
      where: { student_id: id },
      offset: page * perPage,
      limit: perPage,
    });

    if (checkins.length === 0) {
      return res
        .status(404)
        .json({ error: 'No checkins found for this student.' });
    }
    const pages = Math.ceil(count / perPage);
    return res.json({ checkins, pages, count });
  }

  async store(req, res) {
    const { id } = req.params;

    /*
      Check if Student exists
    */
    const user = await Student.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const today = new Date();

    /*
      Check if Student has an active registration
    */
    const registrations = await Registration.findAll({
      where: {
        student_id: id,
        end_date: {
          [Op.gte]: today,
        },
        disabled_at: null,
      },
    });

    if (registrations.length === 0) {
      return res
        .status(400)
        .json({ error: 'The user has no active registration.' });
    }

    /*
      Check if Student has done more than 5 checkins in the last 7 days
    */
    const sevenDaysEarly = subDays(today, 6);
    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [sevenDaysEarly, today],
        },
      },
    });

    if (checkins.length >= 5) {
      return res.status(400).json({
        error: 'You have surpassed the 5 checkins limit within the last 7 days',
      });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json({ checkin });
  }
}

export default new CheckinController();
