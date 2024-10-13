const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Parseamos el body de la solicitud
  const { firstName, lastName, email, phone, location, city, message, fileName, resume } = JSON.parse(event.body);

  // Configura el transportador de Nodemailer con tu cuenta de Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'humanresourcesteamkunlimitedco@gmail.com', // Tu correo de Gmail
      pass: 'lcom pnjb ydcs twni', // Tu contraseña de aplicación
    },
  });

  const mailOptions = {
    from: 'humanresourcesteamkunlimitedco@gmail.com',
    to: 'corpkunlimited@gmail.com',
    subject: `New Job Application from ${firstName} ${lastName}`,
    html: `
        <div style="font-size: 16px; color: black; font-family: Arial, sans-serif;">
            <h1 style="color: #333; font-size: 24px;">New Job Application</h1>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${location}, ${city}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr style="margin: 20px 0; border-top: 1px solid #ccc;">
            <footer style="display: flex; align-items: center; font-size: 12px; color: #666;">
                <div>
                    <p style="margin: 0; font-size: 14px; color: #333; font-weight: bold;">K Unlimited Corp Human Resources Team</p>
                    <p style="margin: 0; color: #555;">Email: <a href="mailto:corpkunlimited@gmail.com" style="color: #007bff; text-decoration: none;">corpkunlimited@gmail.com</a></p>
                </div>
            </footer>
        </div>
    `,
    attachments: [
      {
        filename: fileName,
        content: resume,
        encoding: 'base64',
      }
    ],
  };

  

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
