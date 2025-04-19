import { z } from "zod";
import { registerSchema } from "./register.schema";

export type RegisterSchema = z.infer<typeof registerSchema>;
