import { useState, useEffect } from "react";
import styles from "./adicionarEvento.module.css";
import { IoClose } from "react-icons/io5";

export default function AdicionarEvento({ isOpen, onClose, onSubmit }) {
  const [eventoData, setEventoData] = useState({
    producao: "",
    operador: "",
    equipamento: "",
    tipoParada: "",
    motivo: "",
  });

  const [producoes, setProducoes] = useState([]);
  const [operadores, setOperadores] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 🔹 Recupera as produções salvas no localStorage
      const producoesSalvas =
        JSON.parse(localStorage.getItem("producoes")) || [];
      const opcoesProducoes = producoesSalvas.map(
        (p) => `${p.data} | ${p.maquina}`
      );
      setProducoes(opcoesProducoes);

      // 🔹 Recupera todos os usuários do localStorage (incluindo admin)
      const usuariosSalvos = JSON.parse(localStorage.getItem("users")) || [];

      // 🔹 Filtra apenas os nomes dos usuários (admin incluído)
      const listaUsuarios = usuariosSalvos.map((user) => user.name);

      setOperadores(listaUsuarios);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventoData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (Object.values(eventoData).some((value) => !value.trim())) return;
    onSubmit(eventoData);
    setEventoData({
      producao: "",
      operador: "",
      equipamento: "",
      tipoParada: "",
      motivo: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={25} />
        </button>
        <h2 className={styles.modalTitle}>Adicionar Evento</h2>
        <div className={styles.separator}></div>

        {/* 🔹 Selecionar Produção */}
        <div className={styles.inputWrapper}>
          <label>Selecionar Produção</label>
          <select
            className={styles.select}
            name="producao"
            value={eventoData.producao}
            onChange={handleChange}
          >
            <option value="">Selecione uma produção</option>
            {producoes.map((producao, index) => (
              <option key={index} value={producao}>
                {producao}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Selecionar Operador (Recuperado do localStorage) */}
        <div className={styles.inputWrapper}>
          <label>Operador</label>
          <select
            className={styles.select}
            name="operador"
            value={eventoData.operador}
            onChange={handleChange}
          >
            <option value="">Selecione um operador</option>
            {operadores.map((operador, index) => (
              <option key={index} value={operador}>
                {operador}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Equipamento */}
        <div className={styles.inputWrapper}>
          <label>Equipamento</label>
          <input
            className={styles.input}
            type="text"
            name="equipamento"
            value={eventoData.equipamento}
            onChange={handleChange}
            placeholder="Vibroprensa"
          />
        </div>

        {/* 🔹 Tipo de Parada */}
        <div className={styles.inputWrapper}>
          <label>Tipo de Parada</label>
          <input
            className={styles.input}
            type="text"
            name="tipoParada"
            value={eventoData.tipoParada}
            onChange={handleChange}
            placeholder="Ajuste"
          />
        </div>

        {/* 🔹 Motivo */}
        <div className={styles.inputWrapper}>
          <label>Motivo</label>
          <textarea
            className={styles.textarea}
            name="motivo"
            value={eventoData.motivo}
            onChange={handleChange}
            placeholder="Descrever o motivo da parada"
          ></textarea>
        </div>

        {/* 🔹 Botão de Adicionar */}
        <button className={styles.confirmButton} onClick={handleSubmit}>
          ADICIONAR
        </button>
      </div>
    </div>
  );
}
