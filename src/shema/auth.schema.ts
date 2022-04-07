import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email("email or password is invalid"),
    password: string({
      required_error: "password is required",
    }).min(6, "password must be at least 6 characters long"),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];
