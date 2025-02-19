import { useState, useEffect } from "react";
import styles from "./modalFinalizarProducao.module.css";
import { IoClose } from "react-icons/io5"; // Ícone de fechar

export default function FinalizarProducaoModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    producao: "",
    dataMaquina: "",
    ciclos: "",
    tempoProducao: "",
    solicitacoes: "",
    cimento: "",
    areia: "",
    brita: "",
    areiaIndust: "",
    aditivo: "",
  });
  const [opcoesDataMaquina, setOpcoesDataMaquina] = useState([]);

  const carregarProducoes = () => {
    if (typeof window !== "undefined") {
      const producoes = JSON.parse(localStorage.getItem("producoes")) || [];
      if (producoes.length > 0) {
        const opcoes = producoes.map((p) => {
          const dataSemHora = p.data.split(" ")[0];
          return `${dataSemHora} | ${p.maquina}`.replace(/,\s*\|/, " | ");
        });
        setOpcoesDataMaquina(opcoes);
        setFormData((prevData) => ({
          ...prevData,
          dataMaquina: opcoes[0],
        }));
      }
    }
  };

  useEffect(() => {
    carregarProducoes();
  }, []);

  useEffect(() => {
    const atualizarProducoes = () => {
      carregarProducoes();
    };
    window.addEventListener("storage", atualizarProducoes);
    return () => window.removeEventListener("storage", atualizarProducoes);
  }, []);

  const handleDataMaquinaChange = (e) => {
    setFormData((prevData) => ({ ...prevData, dataMaquina: e.target.value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const renderInputWithUnit = (name, placeholder, unit) => (
    <div className={styles.inputWithUnit}>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={(e) => {
          let value = e.target.value;
          if (
            [
              "ciclos",
              "solicitacoes",
              "cimento",
              "areia",
              "brita",
              "areiaIndust",
            ].includes(name)
          ) {
            value = value.replace(/\D/g, ""); // Apenas números
          } else if (name === "tempoProducao") {
            value = value
              .replace(/[^0-9:]/g, "")
              .replace(/^([0-9]{2})([0-9]{2})?$/, "$1:$2"); // Formato HH:MM
          } else if (name === "aditivo") {
            value = value.replace(/[^0-9.]/g, ""); // Apenas números e ponto
          }
          setFormData({ ...formData, [name]: value });
        }}
        placeholder={placeholder}
        className={styles.inputWithPadding}
      />
      {formData[name] && formData[name].trim() !== "" && (
        <span className={styles.inputUnit}>{unit}</span>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={25} />
        </button>
        <h2>Finalizar Produção</h2>
        <div className={styles.separator}></div>

        <div className={styles.inputWrapper}>
          <label>Selecionar Produção</label>
          <select
            className={styles.select}
            name="dataMaquina"
            value={formData.dataMaquina}
            onChange={handleDataMaquinaChange}
          >
            {opcoesDataMaquina.length === 0 ? (
              <option value="">Nenhuma produção encontrada</option>
            ) : (
              opcoesDataMaquina.map((opcao, index) => (
                <option key={index} value={opcao}>
                  {opcao}
                </option>
              ))
            )}
          </select>
        </div>

        <div className={styles.inputWrapper}>
          <label>Ciclos</label>
          {renderInputWithUnit("ciclos", "2300", "")}
        </div>

        <div className={styles.inputWrapper}>
          <label>Tempo de Produção</label>
          {renderInputWithUnit("tempoProducao", "9:00", "")}
        </div>

        <div className={styles.inputWrapper}>
          <label>Solicitações</label>
          {renderInputWithUnit("solicitacoes", "80", "")}
        </div>

        <div className={styles.inputGrid}>
          <div className={styles.inputWrapper}>
            <label>Cimento (KG)</label>
            {renderInputWithUnit("cimento", "1500", "KG")}
          </div>
          <div className={styles.inputWrapper}>
            <label>Areia (KG)</label>
            {renderInputWithUnit("areia", "1500", "KG")}
          </div>
        </div>

        <div className={styles.inputGrid}>
          <div className={styles.inputWrapper}>
            <label>Brita (KG)</label>
            {renderInputWithUnit("brita", "1500", "KG")}
          </div>
          <div className={styles.inputWrapper}>
            <label>Areia Indust. (KG)</label>
            {renderInputWithUnit("areiaIndust", "1500", "KG")}
          </div>
        </div>

        <div className={styles.inputWrapperAditivo}>
          <label>Aditivo (L)</label>
          {renderInputWithUnit("aditivo", "0.700", "L")}
        </div>

        <button className={styles.confirmButton} onClick={handleSubmit}>
          FINALIZAR
        </button>
      </div>
    </div>
  );
}
