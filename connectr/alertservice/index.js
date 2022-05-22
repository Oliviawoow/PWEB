const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport( {
    service: "hotmail",
    auth: {
        user: "testpweb123@outlook.com",
        pass: "mysafepass12"
    }
});

const options = {
    from: "testpweb123@outlook.com",
    to: "kher_mohamad@yahoo.com",
    subject: "test email with nodeJs",
    text: "I really hope this works"
};

transporter.sendMail(options, function(err, info) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Sent "+ info.response);
}
);