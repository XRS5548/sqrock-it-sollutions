import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = '"SQROCK IT Solutions" <noreply@sqrock.cloud>';

const templates: Record<string, { subject: string; html: (data: Record<string, string>) => string }> = {
  welcome: {
    subject: 'Welcome to SQROCK IT Solutions',
    html: (data) => `<h1>Welcome, ${data.name}!</h1><p>Thank you for joining SQROCK IT Solutions. We're excited to have you onboard.</p>`,
  },
  request_approved: {
    subject: 'Your Service Request Has Been Approved',
    html: (data) => `<h1>Request Approved</h1><p>Your request "${data.title}" has been approved. We'll get started on it shortly.</p>`,
  },
  request_rejected: {
    subject: 'Your Service Request Has Been Reviewed',
    html: (data) => `<h1>Request Update</h1><p>Your request "${data.title}" has been reviewed. Please contact us for more details.</p>`,
  },
  quotation_sent: {
    subject: 'Your Quotation is Ready',
    html: (data) => `<h1>Quotation Ready</h1><p>Your quotation for "${data.title}" is ready. Total amount: ${data.amount}. Valid until: ${data.validUntil}.</p><p><a href="${data.link}" style="background:#0070f3;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">View Quotation</a></p>`,
  },
  project_created: {
    subject: 'Your Project Has Been Created',
    html: (data) => `<h1>Project Created</h1><p>Your project "${data.name}" has been created and is now in progress.</p><p><a href="${data.link}" style="background:#0070f3;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">View Project</a></p>`,
  },
  milestone_completed: {
    subject: 'Milestone Completed',
    html: (data) => `<h1>Milestone Completed</h1><p>The milestone "${data.title}" for project "${data.project}" has been completed.</p>`,
  },
  invoice_generated: {
    subject: 'Invoice Generated',
    html: (data) => `<h1>Invoice Ready</h1><p>Your invoice #${data.number} for ${data.amount} has been generated. Due date: ${data.dueDate}.</p><p><a href="${data.link}" style="background:#0070f3;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">View Invoice</a></p>`,
  },
  ticket_reply: {
    subject: 'New Reply on Your Support Ticket',
    html: (data) => `<h1>Ticket Reply</h1><p>Your ticket "${data.subject}" has a new reply.</p><p><a href="${data.link}" style="background:#0070f3;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">View Ticket</a></p>`,
  },
};

export async function sendEmail(to: string, templateName: string, data: Record<string, string>) {
  const template = templates[templateName];
  if (!template) throw new Error(`Email template "${templateName}" not found`);
  try {
    await transporter.sendMail({
      from: FROM,
      to,
      subject: template.subject,
      html: template.html(data),
    });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

export async function sendRawEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({ from: FROM, to, subject, html });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
