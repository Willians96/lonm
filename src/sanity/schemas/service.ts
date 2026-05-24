import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Serviços",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      description: "Número que define a ordem dos cards (1, 2, 3...)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Título do Serviço",
      type: "string",
      description: 'Ex: "Persianas Rolô Translúcidas"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
      description: 'Ex: "Tela Screen 1% e 3%"',
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "spec",
      title: "Especificação técnica",
      type: "string",
      description: 'Ex: "Redução de até 90% dos raios UV"',
    }),
    defineField({
      name: "image",
      title: "Foto do Card",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconName",
      title: "Ícone",
      type: "string",
      description: "Nome do ícone",
      options: {
        list: [
          { title: "Olho (Translúcidas)", value: "Eye" },
          { title: "Olho fechado (Blackout)", value: "EyeOff" },
          { title: "Camadas (Double Vision)", value: "Layers" },
          { title: "Escudo (Proteção)", value: "Shield" },
          { title: "Processador (Smart)", value: "Cpu" },
          { title: "Engrenagem (Instalação)", value: "Settings" },
        ],
      },
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
