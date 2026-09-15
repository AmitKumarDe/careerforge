import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "./mail.service.js";

const registerUserService = async ({ name, email, password, role = "USER", skills }) => {
    // Check if user already exists
    const existingUser = await User.findOne({
        email: email.toLowerCase(),
    });

    if (existingUser) {
        throw new ApiError(
            409,
            "User already exists with this email"
        );
    }

    // Create user
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role,
        skills
    });

    // Generate email verification token
    const verificationToken = crypto
        .randomBytes(32)
        .toString("hex");

    // Hash token before storing in database
    const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

    user.emailVerificationToken = hashedToken;

    user.emailVerificationExpires =
        Date.now() + 15 * 60 * 1000;

    await user.save({
        validateBeforeSave: false,
    });

    // Create verification URL
    const verificationUrl =
        `http://localhost:3000/verify-email/${verificationToken}`;

    // Send verification email
    await sendEmail({
        to: user.email,
        subject: "CareerForge - Verify Your Email",
        html: `
            <h2>Welcome to CareerForge!</h2>

            <p>Hello ${user.name},</p>

            <p>
                Please verify your email address to activate
                your CareerForge account.
            </p>

            <p>
                <a href="${verificationUrl}">
                    Verify Email
                </a>
            </p>

            <p>
                This verification link will expire in 15 minutes.
            </p>

            <p>
                If you did not create this account, you can ignore
                this email.
            </p>
        `,
    });

    // Remove sensitive fields from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while creating user"
        );
    }

    return createdUser;
};


const loginServiceUser = async ({ email, password }) => {

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password +refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isEmailVerified) {
        throw new ApiError(
            403,
            "Please verify your email before logging in. Check your inbox for the verification link."
        );
    }


    const accessToken = user.generateAccessToken()

    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return {
        user: loggedInUser,
        accessToken,
        refreshToken,
    }



}

const logoutServiceUser = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return true;
};

const refreshAccessTokenService = async (refreshToken) => {
    if (!refreshToken) {
        throw new ApiError(401, "Refresh token is required")
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decodedToken._id).select(
        "+refreshToken"
    );

    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }

    if (user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Refresh token is invalid or already used");
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;

    await user.save({
        validateBeforeSave: false,
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };


}

const changePasswordService = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect =
        await user.isPasswordCorrect(currentPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Current password is incorrect");
    }

    user.password = newPassword;

    // Invalidate existing refresh token
    user.refreshToken = undefined;

    await user.save();

    return true;
};

const forgotPasswordService = async (email) => {
    const user = await User.findOne({
        email: email.toLowerCase(),
    });

    if (!user) {
        throw new ApiError(404, "User not found with this email");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000;

    await user.save({
        validateBeforeSave: false,
    });

    const frontendUrl = process.env.CLIENT_URL || process.env.CORS_ORIGIN || "http://localhost:3000";
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    await sendEmail({
        to: user.email,
        subject: "CareerForge - Reset Your Password",
        html: `
            <h2>Password Reset Request</h2>

            <p>Hello ${user.name},</p>

            <p>
                We received a request to reset your CareerForge password.
            </p>

            <p>
                <a href="${resetUrl}">
                    Reset Password
                </a>
            </p>

            <p>This link will expire in 15 minutes.</p>

            <p>
                If you did not request this, you can safely ignore this email.
            </p>
        `,
    });
};

const resetPasswordService = async (token, newPassword) => {
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: Date.now(),
        },
    }).select("+passwordResetToken +passwordResetExpires");

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired password reset token"
        );
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshToken = undefined;

    await user.save();

    return true;
};

const verifyEmailService = async (token) => {
    if (!token) {
        throw new ApiError(400, "Verification token is required");
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpires: {
            $gt: Date.now(),
        },
    }).select(
        "+emailVerificationToken +emailVerificationExpires"
    );

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired verification token"
        );
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save({
        validateBeforeSave: false,
    });

    return true;
};


const resendVerificationEmailService = async (email) => {
    const user = await User.findOne({
        email: email.toLowerCase(),
    });

    if (!user) {
        throw new ApiError(404, "User not found with this email");
    }

    if (user.isEmailVerified) {
        throw new ApiError(
            400,
            "Email is already verified"
        );
    }

    const verificationToken = crypto
        .randomBytes(32)
        .toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

    user.emailVerificationToken = hashedToken;

    user.emailVerificationExpires =
        Date.now() + 15 * 60 * 1000;

    await user.save({
        validateBeforeSave: false,
    });

    const verificationUrl =
        `http://localhost:3000/verify-email/${verificationToken}`;

    await sendEmail({
        to: user.email,
        subject: "CareerForge - Verify Your Email",
        html: `
            <h2>Verify Your CareerForge Email</h2>

            <p>Hello ${user.name},</p>

            <p>
                Here is your new email verification link.
            </p>

            <p>
                <a href="${verificationUrl}">
                    Verify Email
                </a>
            </p>

            <p>
                This link will expire in 15 minutes.
            </p>
        `,
    });

    return true;
};

export { registerUserService, loginServiceUser, logoutServiceUser, refreshAccessTokenService, changePasswordService, forgotPasswordService, resetPasswordService, verifyEmailService, resendVerificationEmailService };