import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // 🔹 Ícones MUI

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 🔹 Cria um usuário admin no localStorage se ainda não existir
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = users.some((user) => user.email === "admin");

    if (!adminExists) {
      const adminUser = {
        email: "admin",
        password: "1234",
        role: "admin",
        name: "Administrador",
      };

      users.push(adminUser);
      localStorage.setItem("users", JSON.stringify(users));
    }

    // 🔹 Se já estiver logado, redireciona para o menu
    // if (localStorage.getItem("auth")) {
    //   router.push("/menu");
    // }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔹 Busca usuários salvos no localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔹 Verifica se o usuário já existe
    const userFound = users.find((user) => user.email === email);

    if (userFound) {
      // 🔹 Se o usuário existir, verifica se a senha está correta
      if (userFound.password === password) {
        // 🔹 Salva os dados de login no localStorage
        localStorage.setItem("auth", "true");
        localStorage.setItem("usuario", userFound.name); // 🔹 Nome do usuário
        localStorage.setItem("role", userFound.role);

        router.push("/menu"); // 🔹 Redireciona para a página Menu
      } else {
        alert("Senha incorreta! Tente novamente.");
      }
    } else {
      // 🔹 Se não existir, cadastra o novo usuário
      const newUser = {
        email,
        password,
        role: "user",
        name: email, // 🔹 Usa o próprio email como nome por padrão
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // 🔹 Salva o login e redireciona
      localStorage.setItem("auth", "true");
      localStorage.setItem("usuario", newUser.name);
      localStorage.setItem("role", newUser.role);

      alert("Novo usuário cadastrado com sucesso!");
      router.push("/menu");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <img src="/logo.svg" alt="Logo" className={styles.logo} />

        <h1 className={styles.loginTitle}>Seja Bem Vindo</h1>
        <p className={styles.loginSubtitle}>Efetue seu login</p>

        <form className={styles.loginForm} onSubmit={handleLogin}>
          {/* 🔹 Campo de E-mail */}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="email"
              className={styles.loginInput}
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">E-mail ou usuário</label>
          </div>

          {/* 🔹 Campo de Senha */}
          <div className={styles.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={styles.loginInput}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Senha</label>
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          <button type="submit" className={styles.loginButton}>
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}
