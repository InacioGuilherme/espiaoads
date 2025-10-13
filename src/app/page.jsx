"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./home.css";

export default function Home() {
  const router = useRouter();
  const [numero, setNumero] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, "").slice(0, 9);
    setNumero(soloNumeros);
  };

  const formatNumber = (value) => {
    if (!value) return "";
    const p1 = value.slice(0, 3);
    const p2 = value.slice(3, 6);
    const p3 = value.slice(6, 9);
    return [p1, p2, p3].filter(Boolean).join(" ");
  };

  const isValid = numero.length === 9;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    router.push(`/VideoStage?numero=${numero}`);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="alert-limited">⚠️ Quedan solo 5 accesos disponibles hoy</div>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="logo"
        />

        <h1>Sistema de Escaneo Privado</h1>

        <div className="step">
          <h3>Paso 1</h3>
          <p>Introduce el número que deseas analizar.</p>
        </div>

        <div className="step">
          <h3>Paso 2</h3>
          <p>Escaneamos la información del dispositivo.</p>
        </div>

        <div className="step">
          <h3>Paso 3</h3>
          <p>Accede al resultado confidencial y seguro.</p>
        </div>

        <form className="input-box" onSubmit={handleSubmit}>
          <label htmlFor="numero">Número de WhatsApp (España 🇪🇸)</label>
          <div className="input-group">
            <span className="ddi">+34</span>
            <input
              type="text"
              id="numero"
              inputMode="numeric"
              placeholder="600 123 456"
              value={formatNumber(numero)}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              maxLength="11"
            />
          </div>

          {touched && !isValid && (
            <div className="error">⚠️ Introduzca un número válido de 9 dígitos.</div>
          )}

          <button
            type="submit"
            className={`reveal-btn ${isValid ? "active" : ""}`}
            disabled={!isValid}
          >
            Revelar conversaciones
          </button>
        </form>

        <footer>
          <p>© 2025 WhatsApp Monitor — Todos los derechos reservados</p>
          <p className="mini-footer">
            Política de Privacidad · Términos de Servicio · Soporte técnico
          </p>
        </footer>
      </div>
    </div>
  );
}
