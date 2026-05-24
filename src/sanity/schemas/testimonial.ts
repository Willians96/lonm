import { defineField, defineType } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Depoimentos de Clientes",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      description: "Número que define a ordem dos depoimentos (1, 2, 3...)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Texto do Depoimento",
      type: "text",
      rows: 5,
      description: "O que o cliente disse sobre o serviço",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Nome do Cliente",
      type: "string",
      description: 'Ex: "Ana Carolina M."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "Cidade",
      type: "string",
      description: 'Ex: "Sorocaba, SP"',
    }),
    defineField({
      name: "project",
      title: "Tipo de Projeto",
      type: "string",
      description: 'Ex: "Residência em condomínio fechado"',
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
    select: { title: "authorName", subtitle: "city" },
  },
});
