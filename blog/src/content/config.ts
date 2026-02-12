import { defineCollection, z } from "astro:content";
import { ProjectSchema } from "../types";

const projects = defineCollection({
    schema: ProjectSchema,
});

export const collections = { projects };
