import { z } from "zod";

export const workspaceSettingsSchema = z.object({
  name: z.string().trim().min(1, "Enter a workspace name.").max(80),
  currency: z.enum(["MYR", "SGD", "USD", "IDR"]),
});

export type WorkspaceSettingsInput = z.infer<typeof workspaceSettingsSchema>;
