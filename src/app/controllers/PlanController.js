import * as Yup from 'yup';
import { Plan } from '../models';
import { haveAtLeastOneParameter } from '../helpers/CommonHelpers';

class PlanController {
  async index(req, res) {
    const { perPage = 20, page = 0 } = req.params;

    const plans = await Plan.findAll({
      where: { disabled_at: null },
      offset: page * perPage, // witch page we are looking for
      limit: perPage, // number of entries for page
    });

    if (plans.length) {
      return res.json({ plans });
    }

    return res.status(404).json({ error: 'No plan found' });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .integer()
        .max(12)
        .required(),
      price: Yup.number() // price in cents
        .positive()
        .integer()
        .required(),
    });

    /*
      Check schema validation
    */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const plan = await Plan.create(req.body);

    return res.json({ plan });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number()
        .integer()
        .positive()
        .max(12),
      price: Yup.number() // price in cents
        .positive()
        .integer(),
    });

    /*
      Check schema validation
    */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    /*
      Check if user has sent at least one parameter
    */
    const parameters = ['title', 'duration', 'price'];
    if (!haveAtLeastOneParameter(parameters, req.body)) {
      return res.status(400).json({
        error: `You have to send at least one of the following parameters: ${parameters.join(
          ', '
        )}`,
      });
    }

    const { disabled_at } = req.body;

    const plan =
      disabled_at === undefined
        ? // normal updating
          await Plan.findOne({
            where: { id: req.params.id, disabled_at: null },
          })
        : // trying to enable registration again
          await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    /*
      Check if user has passed disabled_at and it is null (to enable plan again)
    */
    if (disabled_at !== undefined && disabled_at !== null) {
      return res.status(400).json({
        error:
          'You can only pass disabled_at if it have null value in order to enable plan again.',
      });
    }

    const updated = await plan.update(req.body);
    return res.json(updated);
  }

  async delete(req, res) {
    /*
      Check if registration exists
    */
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    plan.disabled_at = new Date();

    await plan.save();

    return res.json({ ok: 'Plan disabled.' });
  }
}

export default new PlanController();
