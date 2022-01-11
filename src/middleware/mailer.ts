import nodemailer from 'nodemailer';


export async function sendEmail(to: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    // console.log("testAccount", testAccount);
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "llh4flbylvymbu52@ethereal.email", // generated ethereal user
        pass: "Eqn5E2GrvHhmY7VtnP", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: to , // list of receivers, // Subject line
      subject: "Welcome" , // Subject line
      html: `
      <h1>Welcome</h1>
      <p>You have successfully signed up</p>
      `, // plain text body
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }