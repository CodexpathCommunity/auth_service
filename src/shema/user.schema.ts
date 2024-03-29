import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "password is too short - min 6 characters"),
    passwordConfirmation: string({
      required_error: "password confirmation is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const forgortPasswordSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email("not a valid email"),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    password: string({
      required_error: "password is required",
    }).min(6, "password is too short - min 6 characters"),
    passwordConfirmation: string({
      required_error: "password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match",
    path: ["passwordConfirmation"],
  }),
  params: object({
    id: string(),
    passwordResetCode: string(),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type VerifyUsernput = TypeOf<typeof verifyUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgortPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
