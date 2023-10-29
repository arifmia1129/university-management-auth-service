import nodemailer from "nodemailer";
import config from "../config";

const sendEmail = async (to: string, link: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.app_pass,
    },
  });

  const htmlContent = `
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Password Reset</title>
        <style>
            /* Add your custom styles here */
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
            }
    
            .header {
                background-color: #007BFF;
                color: #fff;
                text-align: center;
                padding: 20px 0;
            }
    
            .header h1 {
                font-size: 24px;
            }
    
            .content {
                padding: 20px;
            }
    
            .button {
                display: inline-block;
                background-color: white;
                color: #007BFF; 
                padding: 10px 20px;
                text-decoration: none;
            }
            
    
            
    
            .footer {
                text-align: center;
                margin-top: 20px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Password Reset</h1>
            </div>
            <div class='content'>
                <p>Hello,</p>
                <p>You've requested a password reset for your account. To reset your password, click the button below:</p>
                <p><a class='button' href=${link}>Reset Password</a></p>
                <p>If you didn't request this reset, please ignore this email. Your password won't be changed.</p>
            </div>
            <div class='footer'>
                <p>&copy; 2023. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: "arif.vtti@gmail.com",
    to,
    subject: "Reset Password",
    html: htmlContent,
  });
};

export default sendEmail;
