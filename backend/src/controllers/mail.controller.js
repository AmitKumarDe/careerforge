
import { sendEmail } from "../services/mail.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const sendTestEmail = asyncHandler(async (req, res) => {
    await sendEmail({
        to: "amitasn2021@gmail.com",
        subject: "CareerForge Email Test",
        html: `
            <h2>CareerForge Email Test</h2>
            <p>Resend email service is working successfully.</p>
        `,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Test email sent successfully"
        )
    );
});

export { sendTestEmail };