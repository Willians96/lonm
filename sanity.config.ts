import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/index";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dbv3a4u9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "lonmdecor-studio",
  title: "LONM DECOR — Painel Administrativo",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("LONM DECOR")
          .items([
            S.listItem()
              .title("🪟 Serviços")
              .child(S.documentTypeList("service").title("Serviços")),
            S.listItem()
              .title("🖼️ Galeria de Projetos")
              .child(S.documentTypeList("galleryItem").title("Galeria")),
            S.listItem()
              .title("☀️ Controle de Luz (Slider)")
              .child(
                S.document()
                  .schemaType("lightControl")
                  .documentId("lightControlSingleton")
                  .title("Controle de Luz")
              ),
            S.listItem()
              .title("💬 Depoimentos de Clientes")
              .child(
                S.documentTypeList("testimonial").title("Depoimentos")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
