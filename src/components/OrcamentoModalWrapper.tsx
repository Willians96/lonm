"use client";

import OrcamentoModal from "./OrcamentoModal";
import { useModal } from "@/lib/ModalContext";

export default function OrcamentoModalWrapper() {
  const { isOrcamentoOpen, closeOrcamento } = useModal();
  return <OrcamentoModal isOpen={isOrcamentoOpen} onClose={closeOrcamento} />;
}
