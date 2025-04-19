import { z } from "zod";
import { fileSchema } from "./file.schema";

export type FileSchema = z.infer<typeof fileSchema>;
