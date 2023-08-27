const emailBody = (data, callback) => {
    const email = {
        email: data.email,
        subject: "Reset Password.",
        text: "Your Account has been reset",
        html:
            `<div>
                Your Account has been reset
            </div>`
    };

    callback(email);
}

module.exports = emailBody;