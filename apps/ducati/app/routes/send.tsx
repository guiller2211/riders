import { json } from '@remix-run/node';
import { Resend } from 'resend';

const resend = new Resend('re_MhaL9QEp_A6tyMp6ftwx7cHhzKhTJArS5');

export const loader = async () => {
  console.log("paso")
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['valentinachourio23@gmail.com'],
    subject: 'Hello world',
    html: '<strong>It works!</strong>',

  });

  if (error) {
    return json({ error }, 400);
  }

  return json(data, 200);
};
