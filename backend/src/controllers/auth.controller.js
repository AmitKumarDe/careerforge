import { User } from "../models/user.model.js";
import { changePasswordService, forgotPasswordService, loginServiceUser, logoutServiceUser, refreshAccessTokenService, registerUserService, resendVerificationEmailService, resetPasswordService, verifyEmailService } from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

const registerUser = asyncHandler(async (req, res) => {
    const user = await registerUserService(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, user, "User registered successfully"));
});


const loginUser = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await loginServiceUser(req.body);

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, {
            user,
            accessToken,
            refreshToken,
        }, "User logged in successfully"));
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Current user fetched successfully"
            )
        );
});


const logoutUser = asyncHandler(async (req, res) => {
    await logoutServiceUser(req.user?._id);

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});


const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    const {
        accessToken,
        refreshToken: newRefreshToken,
    } = await refreshAccessTokenService(refreshToken);

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", newRefreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                null,
                "Access token refreshed successfully"
            )
        );
});

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    await changePasswordService(
        req.user._id,
        currentPassword,
        newPassword
    );

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(
                200,
                null,
                "Password changed successfully. Please login again."
            )
        );
});

const forgotPassword = asyncHandler(async (req, res) => {
    await forgotPasswordService(req.body.email);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Password reset link sent successfully"
        )
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    await resetPasswordService(token, newPassword);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Password reset successfully. Please login again."
        )
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;

    await verifyEmailService(token);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Email verified successfully"
        )
    );
});

const resendVerificationEmail = asyncHandler(
    async (req, res) => {
        await resendVerificationEmailService(
            req.body.email
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Verification email sent successfully"
            )
        );
    }
);

export { registerUser, loginUser, getCurrentUser, logoutUser, refreshAccessToken, changePassword, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail };