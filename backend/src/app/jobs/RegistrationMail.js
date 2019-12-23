import { format, parseISO } from 'date-fns';
import { Mail } from '../../lib';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration, plan, student } = data;
    const { name, email } = student;
    const { start_date, textualPrice } = registration;
    const { duration, title } = plan;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Matrícula efetuada na Gympoint',
      template: 'registration',
      context: {
        student: name,
        plan: {
          duration,
          title,
        },
        registration: {
          start_date: format(parseISO(start_date), 'dd/MM/yyyy'),
          total_price: textualPrice,
        },
      },
    });
  }
}

export default new RegistrationMail();
