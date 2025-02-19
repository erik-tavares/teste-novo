import { useState } from "react";
import ModalIniciarProducao from "../components/ModalIniciarProducao";
import FinalizarProducaoModal from "../components/ModalFinalizarProducao";
import FinalizarEvento from "../components/FinalizarEvento";
import AdicionarEvento from "../components/AdicionarEvento";
import styles from "./menu.module.css";

export default function Menu() {
  const [modalOpen, setModalOpen] = useState(false);
  const [finalizarModalOpen, setFinalizarModalOpen] = useState(false);
  const [eventoModalOpen, setEventoModalOpen] = useState(false);
  const [adicionarEventoOpen, setAdicionarEventoOpen] = useState(false);
  const usuarioLogado = "Usuário Exemplo"; // 🔹 Simulando usuário logado

  return (
    <div className={styles.menuContainer}>
      {/* 🔹 Logo centralizada */}
      <img src="/logo-menu.svg" alt="Logo" className={styles.menuLogo} />

      {/* 🔹 Botões de ação */}
      <div className={styles.buttonContainer}>
        <button
          className={styles.menuButton}
          onClick={() => setModalOpen(true)}
        >
          Iniciar Produção
        </button>

        <button
          className={styles.menuButton}
          onClick={() => setAdicionarEventoOpen(true)}
        >
          Adicionar Evento
        </button>

        <button
          className={styles.menuButton}
          onClick={() => setFinalizarModalOpen(true)}
        >
          Finalizar Produção
        </button>

        <button
          className={`${styles.menuButton} ${styles.red}`}
          onClick={() => setEventoModalOpen(true)}
        >
          Finalizar Evento
        </button>
      </div>

      {/* 🔹 Modal de Iniciar Produção */}
      <ModalIniciarProducao
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        usuario={usuarioLogado}
      />

      {/* 🔹 Modal de Finalizar Produção */}
      <FinalizarProducaoModal
        isOpen={finalizarModalOpen}
        onClose={() => setFinalizarModalOpen(false)}
        onSubmit={(data) => console.log("Produção Finalizada:", data)}
      />

      {/* 🔹 Modal de Adicionar Evento */}
      <AdicionarEvento
        isOpen={adicionarEventoOpen}
        onClose={() => setAdicionarEventoOpen(false)}
        onSubmit={(data) => console.log("Evento Adicionado:", data)}
      />

      {/* 🔹 Modal de Finalizar Evento */}
      <FinalizarEvento
        isOpen={eventoModalOpen}
        onClose={() => setEventoModalOpen(false)}
        onSubmit={(data) => console.log("Evento Finalizado:", data)}
      />
      {/* 🔹 Logo Timer */}
      <img src="/logo-timer.svg" alt="Timer" className={styles.timerLogo} />
    </div>
  );
}
