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
      text: `Parabéns, você acaba de ser
      matriculado na Gympoint. Você escolheu o plano ${title},
      começando na data ${start_date}, com duração de ${duration} meses
      e com um custo total de ${textualPrice}`,
      //template: 'registration',
      //context: {},
    });
  }
}

export default new RegistrationMail();
