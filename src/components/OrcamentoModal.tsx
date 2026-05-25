"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Plus, Trash2, ChevronDown, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Persiana {
  id: number;
  modelo: string;
  acionamento: string;
  largura: string;
  altura: string;
}

interface FormData {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  persianas: Persiana[];
}

// ─── Options ─────────────────────────────────────────────────────────────────

const MODELOS = [
  { value: "translucida", label: "Translúcidas" },
  { value: "blackout",    label: "Blackout" },
  { value: "doubleVision",label: "Double Vision" },
];

const ACIONAMENTOS = [
  { value: "manual",     label: "Manual" },
  { value: "automatico", label: "Automático RF" },
  { value: "wifi",       label: "Wi-Fi / Alexa" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SelectBar({
  label,
  options,
  value,
  onChange,
  id,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] tracking-[0.25em] uppercase text-brand-cream/50 font-light">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white/5 border border-brand-cream/10 text-brand-cream
            text-sm rounded-sm px-4 py-3 pr-10
            focus:outline-none focus:border-brand-gold/60 focus:bg-white/8
            transition-all duration-200 cursor-pointer
            hover:border-brand-cream/20"
          style={{ colorScheme: "dark" }}
        >
          <option value="" disabled className="bg-[#131312] text-brand-cream/50">
            Selecione...
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#131312] text-brand-cream">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/40 pointer-events-none" />
      </div>
    </div>
  );
}

function InputField({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  suffix,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] tracking-[0.25em] uppercase text-brand-cream/50 font-light">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-brand-cream/10 text-brand-cream text-sm
            rounded-sm px-4 py-3 placeholder:text-brand-cream/25
            focus:outline-none focus:border-brand-gold/60 focus:bg-white/8
            transition-all duration-200"
          style={{ colorScheme: "dark" }}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-cream/35 font-light">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

function newPersiana(id: number): Persiana {
  return { id, modelo: "", acionamento: "", largura: "", altura: "" };
}

export default function OrcamentoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    persianas: [newPersiana(1)],
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [nextId, setNextId] = useState(2);

  // Fechar com ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Pausar Lenis para o scroll não vazar para a página
      if (lenis) lenis.stop();
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [isOpen, handleKeyDown]);

  // Reset ao fechar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm({ nome: "", telefone: "", email: "", endereco: "", persianas: [newPersiana(1)] });
        setStatus("idle");
        setErrorMsg("");
        setNextId(2);
      }, 350);
    }
  }, [isOpen]);

  // ─── Form helpers ─────────────────────────────────────────────────────────

  const updateField = (field: keyof Omit<FormData, "persianas">, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const updatePersiana = (id: number, field: keyof Omit<Persiana, "id">, value: string) =>
    setForm((f) => ({
      ...f,
      persianas: f.persianas.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));

  const addPersiana = () => {
    setForm((f) => ({ ...f, persianas: [...f.persianas, newPersiana(nextId)] }));
    setNextId((n) => n + 1);
  };

  const removePersiana = (id: number) =>
    setForm((f) => ({ ...f, persianas: f.persianas.filter((p) => p.id !== id) }));

  // ─── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro desconhecido.");
      
      setStatus("idle");
      toast.success("Orçamento enviado com sucesso! Entraremos em contato em breve.");
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao enviar.";
      setErrorMsg(message);
      setStatus("error");
      toast.error(message);
    }
  };

  if (!isOpen) return null;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label="Formulário de orçamento"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel — scroll isolado aqui, não vaza para a página */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0f0f0e] border border-brand-cream/8 rounded-sm shadow-2xl flex flex-col"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#0f0f0e] border-b border-brand-cream/8">
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-brand-gold font-light mb-0.5">
              LONM DECOR
            </p>
            <h2 className="font-serif text-xl text-brand-cream font-light tracking-wide">
              Solicitar Orçamento
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-brand-cream/40 hover:text-brand-cream transition-colors rounded-sm hover:bg-white/5"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── FORM ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="px-6 py-6 flex flex-col gap-5">

            {/* Seção: Dados pessoais */}
            <div>
                <p className="text-[9px] tracking-[0.35em] uppercase text-brand-gold font-light mb-4">
                  Dados do Cliente
                </p>
                <div className="flex flex-col gap-4">
                  <InputField
                    id="nome"
                    label="Nome completo *"
                    value={form.nome}
                    onChange={(v) => updateField("nome", v)}
                    placeholder="Ex: João da Silva"
                  />
                  <InputField
                    id="telefone"
                    label="Telefone / WhatsApp *"
                    value={form.telefone}
                    onChange={(v) => updateField("telefone", v)}
                    placeholder="Ex: (15) 99999-9999"
                    type="tel"
                  />
                  <InputField
                    id="email"
                    label="E-mail (opcional)"
                    value={form.email}
                    onChange={(v) => updateField("email", v)}
                    placeholder="Ex: contato@email.com"
                    type="email"
                  />
                  <InputField
                    id="endereco"
                    label="Endereço completo *"
                    value={form.endereco}
                    onChange={(v) => updateField("endereco", v)}
                    placeholder="Ex: Rua das Flores, 123 — Sorocaba/SP"
                  />
                </div>
              </div>

              {/* Divisor */}
              <div className="border-t border-brand-cream/6" />

              {/* Seção: Persianas */}
              <div className="flex flex-col gap-6">
                {form.persianas.map((p, index) => (
                  <div key={p.id} className="flex flex-col gap-4">
                    {/* Label da persiana */}
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] tracking-[0.35em] uppercase text-brand-gold font-light">
                        Persiana {index + 1}
                      </p>
                      {form.persianas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePersiana(p.id)}
                          className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-brand-cream/35 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remover
                        </button>
                      )}
                    </div>

                    {/* Modelo */}
                    <SelectBar
                      id={`modelo-${p.id}`}
                      label="Modelo *"
                      options={MODELOS}
                      value={p.modelo}
                      onChange={(v) => updatePersiana(p.id, "modelo", v)}
                    />

                    {/* Acionamento */}
                    <SelectBar
                      id={`acionamento-${p.id}`}
                      label="Tipo de acionamento *"
                      options={ACIONAMENTOS}
                      value={p.acionamento}
                      onChange={(v) => updatePersiana(p.id, "acionamento", v)}
                    />

                    {/* Medidas */}
                    <div className="grid grid-cols-2 gap-3">
                      <InputField
                        id={`largura-${p.id}`}
                        label="Largura do vão *"
                        value={p.largura}
                        onChange={(v) => updatePersiana(p.id, "largura", v)}
                        placeholder="ex: 180"
                        type="number"
                        suffix="cm"
                      />
                      <InputField
                        id={`altura-${p.id}`}
                        label="Altura do vão *"
                        value={p.altura}
                        onChange={(v) => updatePersiana(p.id, "altura", v)}
                        placeholder="ex: 220"
                        type="number"
                        suffix="cm"
                      />
                    </div>

                    {/* Divisor entre persianas */}
                    {index < form.persianas.length - 1 && (
                      <div className="border-t border-brand-cream/6 mt-1" />
                    )}
                  </div>
                ))}

                {/* Botão adicionar persiana */}
                <button
                  type="button"
                  onClick={addPersiana}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-brand-cream/15 text-brand-cream/45 text-[10px] tracking-[0.25em] uppercase rounded-sm hover:border-brand-gold/40 hover:text-brand-gold transition-all duration-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar persiana
                </button>
              </div>

              {/* Erro */}
              {status === "error" && (
                <p className="text-xs text-red-400 text-center font-light">{errorMsg}</p>
              )}
            </div>

            {/* Footer do form / botão submit */}
            <div className="sticky bottom-0 px-6 py-5 bg-[#0f0f0e] border-t border-brand-cream/8">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-brand-gold text-brand-dark
                  text-[10px] tracking-[0.3em] uppercase font-bold rounded-sm
                  hover:bg-brand-cream transition-all duration-400
                  disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Orçamento
                  </>
                )}
              </button>
              <p className="text-center text-[9px] text-brand-cream/25 mt-3 font-light tracking-wider">
                Seus dados são usados apenas para elaboração do orçamento.
              </p>
            </div>
          </form>
      </div>
    </div>
  );
}
