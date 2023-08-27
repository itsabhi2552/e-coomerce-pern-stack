const emailBody = (data, callback) => {
    const email = {
        email: data.email,
        subject: "Forgot Password.",
        text: "Verify Your Account",
        html:
            `<h1>
                Verify Your Account
            </h1><br>
            <div>
                We just need to verify your email address to reset your Mailjet account.
            </div><br>
            <div style="text-align:center">
                <a target="_blank" type="button" style="text-decoration:none" href="http://localhost:5173/verifyEmail/${data.token}/forgotPassword">
                    Reset Your Account Password
                </a>
            </div>`
    };
    callback(email);
}

module.exports = emailBody;