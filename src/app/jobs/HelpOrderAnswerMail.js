import { format, parseISO } from 'date-fns';
import { Mail } from '../../lib';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { id, student, answer, answer_at, question } = data;
    const { email, name } = student;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Seu pedido de auxílio foi respondido!',
      template: 'helpOrderAnswer',
      context: {
        student: name,
        orderId: id,
        answer,
        question,
        answer_at: format(parseISO(answer_at), 'dd/MM/yyyy'),
      },
    });
  }
}

export default new HelpOrderAnswerMail();
