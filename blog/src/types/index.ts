import { z } from "astro:schema";

export const ProjectSchema = z.object({
    title: z.string(),
    stack: z.array(z.string()),
    github: z.string().url(),
    demo: z.string().url(),
    image: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
