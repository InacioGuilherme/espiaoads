"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./home.css";

export default function Home() {
  const router = useRouter();
  const [numero, setNumero] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    // Apenas números – celular BR (11 dígitos)
    const soNumeros = e.target.value.replace(/\D/g, "").slice(0, 11);
    setNumero(soNumeros);
  };

  const formatNumber = (value) => {
    if (!value) return "";
    const ddd = value.slice(0, 2);
    const p1 = value.slice(2, 3);
    const p2 = value.slice(3, 7);
    const p3 = value.slice(7, 11);

    return [ddd && `(${ddd})`, p1, p2 && `${p2}-${p3}`]
      .filter(Boolean)
      .join(" ");
  };

  const isValid = numero.length === 11;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    router.push(`/VideoStage?numero=${numero}`);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="alert-limited">
          ⚠️ Restam apenas 5 acessos disponíveis hoje
        </div>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="logo"
        />

        <h1>Sistema de Análise Privada</h1>

        <div className="step">
          <h3>Passo 1</h3>
          <p>Informe o número que deseja analisar.</p>
        </div>

        <div className="step">
          <h3>Passo 2</h3>
          <p>Realizamos a análise das informações vinculadas.</p>
        </div>

        <div className="step">
          <h3>Passo 3</h3>
          <p>Acesse o resultado de forma confidencial e segura.</p>
        </div>

        <form className="input-box" onSubmit={handleSubmit}>
          <label htmlFor="numero">
            Número do WhatsApp (Brasil 🇧🇷)
          </label>

          <div className="input-group">
            <span className="ddi">+55</span>
            <input
              type="text"
              id="numero"
              inputMode="numeric"
              placeholder="(11) 9 8765-4321"
              value={formatNumber(numero)}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              maxLength="16"
            />
          </div>

          {touched && !isValid && (
            <div className="error">
              ⚠️ Informe um número válido com DDD (11 dígitos).
            </div>
          )}

          <button
            type="submit"
            className={`reveal-btn ${isValid ? "active" : ""}`}
            disabled={!isValid}
          >
            Iniciar análise
          </button>
        </form>

        <footer>
          <p>© 2025 WhatsApp Monitor — Todos os direitos reservados</p>
          <p className="mini-footer">
            Política de Privacidade · Termos de Uso · Suporte Técnico
          </p>
        </footer>
      </div>
    </div>
  );
}
