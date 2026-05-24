import { defineField, defineType } from "sanity";

export const lightControlSchema = defineType({
  name: "lightControl",
  title: "Controle de Luz (Slider)",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Título da Seção",
      type: "string",
      description: 'Ex: "Do sol escaldante à penumbra perfeita."',
    }),
    defineField({
      name: "sectionDescription",
      title: "Descrição da Seção",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "beforeImage",
      title: 'Foto "Antes" (Sol forte / sem persiana)',
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beforeLabel",
      title: 'Legenda do "Antes"',
      type: "string",
      description: 'Ex: "Sol Direto & Calor Excessivo"',
    }),
    defineField({
      name: "afterImage",
      title: 'Foto "Depois" (Com persiana / luz controlada)',
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "afterLabel",
      title: 'Legenda do "Depois"',
      type: "string",
      description: 'Ex: "Luz Suave & Térmica (LONM DECOR)"',
    }),
  ],
  preview: {
    select: { title: "sectionTitle", media: "afterImage" },
  },
});
