const getUser = require('../database/sql/getUser');

const emailBody = (data, callback) => {
    getUser({ email: data.email }, (err, user) => {
        const email = {
            email: user.email,
            subject: "Verify Your Account.",
            text: "Activate Your Account",
            html:
                `<h1>
                    Activate Your Account
                </h1><br>
                <div>
                    We just need to validate your email address to activate your Mailjet account. 
                    Simply click the following button:
                </div><br>
                <div style="text-align:center">
                    <a target="_blank" type="button" style="text-decoration:none" 
                    href="http://localhost:5173/verifyEmail/${user.id}">
                        Activate Your Account
                    </a>
                </div>`
        };

        callback(email);
    });
};

module.exports = emailBody;