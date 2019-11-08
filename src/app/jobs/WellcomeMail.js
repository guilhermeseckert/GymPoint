import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WellcomeMail {
  get key() {
    return 'WellcomeMail';
  }

  async handle({ data }) {
    const { student, plan, registers } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}`,
      subject: 'Agendamento Cancelado',
      template: 'register',

      context: {
        name: student.name,
        duration: plan.duration,
        price: plan.price,
        title: plan.title,

        // não esta funcionando não sei porque ainda
        attachments: [
          {
            filename: 'logo',
            path: (__dirname, '..', 'tmp'),
            cid: 'logo', // same cid value as in the html img src
          },
        ],
        date: format(
          parseISO(registers.start_date),
          "'Dia' dd 'de' MMMM', ás' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(registers.end_date),
          "'Dia' dd 'de' MMMM', ás' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new WellcomeMail();
