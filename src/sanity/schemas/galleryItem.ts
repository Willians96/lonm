import { defineField, defineType } from "sanity";

export const galleryItemSchema = defineType({
  name: "galleryItem",
  title: "Galeria de Projetos",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      description: "Número que define a posição na galeria (1, 2, 3...)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Título do Projeto",
      type: "string",
      description: 'Ex: "Varanda Integrada"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo / Descrição",
      type: "string",
      description: 'Ex: "Fechamento Completo em Persiana Rolô"',
    }),
    defineField({
      name: "image",
      title: "Foto do Projeto",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "image" },
  },
});
