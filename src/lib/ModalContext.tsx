"use client";

import { createContext, useContext, useState } from "react";

interface ModalContextType {
  openOrcamento: () => void;
  closeOrcamento: () => void;
  isOrcamentoOpen: boolean;
}

const ModalContext = createContext<ModalContextType>({
  openOrcamento: () => {},
  closeOrcamento: () => {},
  isOrcamentoOpen: false,
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOrcamentoOpen, setIsOrcamentoOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOrcamentoOpen,
        openOrcamento: () => setIsOrcamentoOpen(true),
        closeOrcamento: () => setIsOrcamentoOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
