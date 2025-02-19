import { useState } from "react";
import styles from "../components/finalizarEvento.module.css";
import { IoClose } from "react-icons/io5";

export default function AdicionarEvento({ isOpen, onClose, onSubmit }) {
  const [solucao, setSolucao] = useState("");

  const handleSubmit = () => {
    if (!solucao.trim()) return;
    onSubmit(solucao);
    setSolucao("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={25} />
        </button>
        <h2 className={styles.modalTitle}>Solução</h2>
        <div className={styles.separator}></div>

        <textarea
          className={styles.textarea}
          placeholder="Descreva a solução do problema..."
          value={solucao}
          onChange={(e) => setSolucao(e.target.value)}
        ></textarea>

        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={handleSubmit}>
            ADICIONAR
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
}
