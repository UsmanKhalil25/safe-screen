import { z } from "zod";
import { loginSchema } from "./login.schema";

export type LoginSchema = z.infer<typeof loginSchema>;
