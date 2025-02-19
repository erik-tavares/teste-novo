import { useState, useEffect } from "react";
import styles from "./modalIniciarProducao.module.css";
import { IoClose } from "react-icons/io5"; // 🔹 Ícone de fechar

export default function ModalIniciarProducao({ isOpen, onClose }) {
  const [maquina, setMaquina] = useState("");
  const [receita, setReceita] = useState("");
  const [metaCiclos, setMetaCiclos] = useState("");
  const [usuarioLocal, setUsuarioLocal] = useState("");
  const [producoes, setProducoes] = useState([]);

  useEffect(() => {
    // 🔹 Recupera usuário do localStorage
    const usuarioLogado = localStorage.getItem("usuario");
    if (usuarioLogado) {
      setUsuarioLocal(usuarioLogado);
    }

    // 🔹 Recupera produções salvas no localStorage
    const producoesSalvas = JSON.parse(localStorage.getItem("producoes")) || [];
    setProducoes(producoesSalvas);
  }, []);

  // 🔹 Função para iniciar uma nova produção
  const iniciarProducao = () => {
    if (!maquina || !receita || !metaCiclos) {
      return; // ❌ Evita iniciar sem preencher todos os campos
    }

    const novaProducao = {
      operador: usuarioLocal,
      maquina,
      receita,
      metaCiclos,
      data: new Date().toLocaleDateString("pt-BR"),
    };

    // 🔹 Atualiza `localStorage` imediatamente
    const producoesAtualizadas = [...producoes, novaProducao];
    localStorage.setItem("producoes", JSON.stringify(producoesAtualizadas));

    // 🔹 Atualiza o estado com a nova produção
    setProducoes(producoesAtualizadas);

    // 🔹 Reseta os campos do formulário após salvar
    setMaquina("");
    setReceita("");
    setMetaCiclos("");

    onClose(); // 🔹 Fecha a modal após salvar
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 🔹 Botão de fechar */}
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={25} />
        </button>

        {/* 🔹 Título */}
        <h2>Iniciar Produção</h2>
        <div className={styles.separator}></div>

        {/* 🔹 Operador */}
        <div className={styles.inputWrapper}>
          <label>Operador</label>
          <input
            type="text"
            value={usuarioLocal}
            readOnly
            className={styles.input}
          />
        </div>

        {/* 🔹 Máquina */}
        <div className={styles.inputWrapper}>
          <label>Máquina</label>
          <select
            value={maquina}
            onChange={(e) => setMaquina(e.target.value)}
            className={styles.select}
          >
            <option value="">Selecione uma máquina</option>
            <option value="Máquina 01 | Máquina 02">
              Máquina 01 | Máquina 02
            </option>
            <option value="Máquina 03">Máquina 03</option>
            <option value="Máquina 04">Máquina 04</option>
            <option value="Máquina 05">Máquina 05</option>
          </select>
        </div>

        {/* 🔹 Receita */}
        <div className={styles.inputWrapper}>
          <label>Receita</label>
          <select
            value={receita}
            onChange={(e) => setReceita(e.target.value)}
            className={styles.select}
          >
            <option value="">Selecione uma receita</option>
            <option value="Piso Intertravado H6">
              Piso Intertravado H6 | Meio Fio
            </option>
            <option value="Meio Fio">Meio Fio</option>
          </select>
        </div>

        {/* 🔹 Meta Ciclos */}
        <div className={styles.inputWrapper}>
          <label>Meta Ciclos</label>
          <input
            type="text"
            value={metaCiclos}
            onChange={(e) => setMetaCiclos(e.target.value.replace(/\D/g, ""))}
            placeholder="2000"
            className={styles.input}
          />
        </div>

        {/* 🔹 Botão de "Iniciar" */}
        <button className={styles.confirmButton} onClick={iniciarProducao}>
          INICIAR
        </button>
      </div>
    </div>
  );
}
