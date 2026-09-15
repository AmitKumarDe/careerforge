import { Resend } from "resend";

let resend;
const getResendClient = () => {
    if (!resend) {
        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is not defined in environment variables");
        }
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
};

const sendEmail = async ({ to, subject, html }) => {
    const client = getResendClient();
    const { data, error } = await client.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to,
        subject,
        html,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export { sendEmail };