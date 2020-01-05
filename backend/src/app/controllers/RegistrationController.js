import * as Yup from 'yup';
import { addMonths, parseISO, isBefore } from 'date-fns';
import { Registration, Student, Plan } from '../models';
import { haveAtLeastOneParameter } from '../helpers/CommonHelpers';
import { Queue } from '../../lib'; //import always the queue first
import { RegistrationMail } from '../jobs';

class RegistrationController {
  async index(req, res) {
    const { page = 0, perPage = 5 } = req.query;

    const { rows: registrations, count } = await Registration.findAndCountAll({
      where: { disabled_at: null },
      limit: perPage,
      offset: page * perPage,
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'textualPrice',
        'disabled_at',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price', 'textualPrice', 'duration'],
        },
      ],
    });

    if (registrations.length === 0) {
      return res.status(404).json({ error: 'No registration found.' });
    }

    const pages = Math.ceil(count / perPage);
    return res.json({ registrations, pages, count });
  }

  async read(req, res) {
    const { id } = req.params;

    const registration = await Registration.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'totalPrice', 'duration', 'price'],
        },
      ],
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    const { start_date, end_date, student, plan } = registration;

    return res.json({ registration: { start_date, end_date, student, plan } });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date()
        .min(new Date())
        .required(),
    });

    /*
      Check schema validation
    */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /*
      Check student exists
    */
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    /*
      Check plan exists
    */
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    const { duration, price: planPrice } = plan;
    const price = duration * planPrice;
    const registration = await Registration.create({
      ...req.body,
      end_date: addMonths(parseISO(start_date), duration),
      price,
    });

    await Queue.add(RegistrationMail.key, {
      registration,
      plan,
      student,
    });

    return res.json({ registration });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().integer(),
      plan_id: Yup.number().integer(),
      start_date: Yup.date(),
    });

    /*
      Check schema validation
    */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    /*
      Check if user has sent at least one parameter
    */
    const parameters = ['student_id', 'plan_id', 'start_date'];
    if (!haveAtLeastOneParameter(parameters, req.body)) {
      return res.status(400).json({
        error: `You have to send at least one of the following parameters: ${parameters.join(
          ', '
        )}`,
      });
    }

    const { start_date, student_id, plan_id, disabled_at } = req.body;

    /*
      Check if registration exists
    */
    const registration =
      disabled_at === undefined
        ? // normal updating
          await Registration.findOne({
            where: { id: req.params.id, disabled_at: null },
          })
        : // trying to enable registration again
          await Registration.findByPk(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found.' });
    }

    /*
      Check if date is before the creation date
    */
    const { createdAt } = registration;
    if (isBefore(parseISO(start_date), createdAt)) {
      return res.status(400).json({
        error:
          'You can not update the start_date with a date before the creation date.',
      });
    }

    /*
      Check if user has passed disabled_at and it is null (to enable registration again)
    */
    if (disabled_at !== undefined && disabled_at !== null) {
      return res.status(400).json({
        error:
          'You can only pass disabled_at if it have null value in order to enable registration again.',
      });
    }

    /*
      Check student exists
    */
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    /*
      Check plan exists
    */
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    const { duration, price: planPrice } = plan;
    const price = duration * planPrice;
    await registration.update({
      ...req.body,
      end_date: addMonths(parseISO(start_date), duration),
      price,
    });

    return res.json({ registration });
  }

  async delete(req, res) {
    /*
      Check if registration exists
    */
    const registration = await Registration.findByPk(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found.' });
    }

    registration.disabled_at = new Date();

    await registration.save();

    return res.json({ ok: 'Registration disabled.' });
  }
}

export default new RegistrationController();
