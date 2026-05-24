import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface Persiana {
  modelo: string;
  acionamento: string;
  largura: string;
  altura: string;
}

interface OrcamentoBody {
  nome: string;
  telefone: string;
  email?: string;
  endereco: string;
  persianas: Persiana[];
}

const modeloLabel: Record<string, string> = {
  translucida: "Translúcidas",
  blackout: "Blackout",
  doubleVision: "Double Vision",
};

const acionamentoLabel: Record<string, string> = {
  manual: "Manual",
  automatico: "Automático RF",
  wifi: "Wi-Fi / Alexa",
};

function buildHtml(body: OrcamentoBody): string {
  const persianaRows = body.persianas
    .map(
      (p, i) => `
      <tr>
        <td colspan="2" style="padding: 14px 0 6px; font-size: 13px; font-weight: 700;
          color: #C9A84C; text-transform: uppercase; letter-spacing: 2px;
          border-top: 1px solid #2a2a2a;">
          Persiana ${i + 1}
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #888; font-size: 13px; width: 160px;">Modelo</td>
        <td style="padding: 4px 0; color: #f0ece4; font-size: 13px;">${modeloLabel[p.modelo] ?? p.modelo}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #888; font-size: 13px;">Acionamento</td>
        <td style="padding: 4px 0; color: #f0ece4; font-size: 13px;">${acionamentoLabel[p.acionamento] ?? p.acionamento}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #888; font-size: 13px;">Largura</td>
        <td style="padding: 4px 0; color: #f0ece4; font-size: 13px;">${p.largura} cm</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #888; font-size: 13px;">Altura</td>
        <td style="padding: 4px 0; color: #f0ece4; font-size: 13px;">${p.altura} cm</td>
      </tr>
    `
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head><meta charset="UTF-8" /></head>
  <body style="margin:0; padding:0; background:#0C0C0B; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0C0C0B; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0"
            style="background:#131312; border: 1px solid #2a2a2a; border-radius: 4px; overflow: hidden;">

            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #1a1a18 0%, #131312 100%);
                padding: 32px 40px; border-bottom: 1px solid #C9A84C33;">
                <p style="margin: 0 0 4px; font-size: 9px; letter-spacing: 4px; color: #C9A84C;
                  text-transform: uppercase;">Solicitação de Orçamento</p>
                <h1 style="margin: 0; font-size: 22px; font-weight: 300; color: #f0ece4;
                  letter-spacing: 3px; text-transform: uppercase;">LONM DECOR</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 36px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">

                  <!-- Dados do Cliente -->
                  <tr>
                    <td colspan="2" style="padding-bottom: 10px; font-size: 11px; font-weight: 700;
                      color: #C9A84C; text-transform: uppercase; letter-spacing: 2px;">
                      Dados do Cliente
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #888; font-size: 13px; width: 160px;">Nome</td>
                    <td style="padding: 4px 0; color: #f0ece4; font-size: 13px;">${body.nome}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #888; font-size: 13px;">Telefone</td>
                    <td style="padding: 4px 0; color: #f0ece4; font-size: 13px;">${body.telefone}</td>
                  </tr>
                  ${body.email ? `
                  <tr>
                    <td style="padding: 4px 0; color: #888; font-size: 13px;">E-mail</td>
                    <td style="padding: 4px 0; color: #f0ece4; font-size: 13px;">${body.email}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 4px 0; color: #888; font-size: 13px;">Endereço</td>
                    <td style="padding: 4px 0; color: #f0ece4; font-size: 13px;">${body.endereco}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #888; font-size: 13px;">Nº de Persianas</td>
                    <td style="padding: 4px 0; color: #f0ece4; font-size: 13px;">${body.persianas.length}</td>
                  </tr>

                  <!-- Persianas -->
                  ${persianaRows}

                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px 40px; border-top: 1px solid #2a2a2a;
                font-size: 10px; color: #555; letter-spacing: 2px; text-transform: uppercase;">
                Enviado pelo site lonmdecor.com.br
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export async function POST(req: Request) {
  try {
    const body: OrcamentoBody = await req.json();

    // Validação básica
    if (!body.nome || !body.telefone || !body.endereco || !body.persianas?.length) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    for (const p of body.persianas) {
      if (!p.modelo || !p.acionamento || !p.largura || !p.altura) {
        return NextResponse.json({ error: "Dados de persiana incompletos." }, { status: 400 });
      }
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"LONM DECOR Site" <${process.env.GMAIL_USER}>`,
      to: "lonmservice@gmail.com",
      subject: `🪟 Novo Orçamento — ${body.nome}`,
      html: buildHtml(body),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ORCAMENTO API]", err);
    return NextResponse.json({ error: "Erro ao enviar e-mail." }, { status: 500 });
  }
}
