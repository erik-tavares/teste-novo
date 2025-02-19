import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); // 🔹 Redireciona para /login automaticamente
  }, []);

  return <p>Redirecionando...</p>; // Exibe algo enquanto redireciona
}
