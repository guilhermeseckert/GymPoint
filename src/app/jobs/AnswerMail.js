import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { student, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}`,
      subject: 'Resposta',
      template: 'Asnwer',

      context: {
        name: student.name,
        duration: plan.duration,
        price: plan.price,
        title: plan.title,
      },
    });
  }
}

export default new AnswerMail();
