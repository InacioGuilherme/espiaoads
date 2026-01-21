"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./videostage.css";

const WISTIA_ID = "pvnmrbn5a5";

export default function VideoStageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const numero = searchParams?.get("numero") || "";

  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [cidade, setCidade] = useState("");

  const steps = [
    "Verificando servidores privados...",
    "Estabelecendo conexão segura...",
    "Analisando dados encontrados...",
    "Sincronizando informações do WhatsApp...",
    "Processando resultados finais...",
  ];

  // 📞 Formatação BR: (11) 9 9999-9999
  const formatPhone = (num = "") => {
    const digits = num.replace(/\D/g, "");

    if (digits.length === 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(
        3,
        7
      )}-${digits.slice(7, 11)}`;
    }

    if (digits.length === 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(
        2,
        6
      )}-${digits.slice(6, 10)}`;
    }

    return "(--) ----- ----";
  };

  // 🇧🇷 WhatsApp BR
  const whatsappURL =
    numero && numero.length >= 10
      ? `https://wa.me/5527981091800?text=Quero%20realizar%20o%20teste%20do%20software`
      : "https://wa.me/5511999999999?text=Olá%2C+quero+mais+informações";


  // Simulação de progresso
  useEffect(() => {
    let current = 0;
    const totalTime = 100_000; // 100s
    const tick = Math.max(20, Math.floor(totalTime / 100));
    let mounted = true;

    const timer = setInterval(() => {
      if (!mounted) return;
      current = Math.min(100, current + 1);
      setProgress(current);

      const newIndex = Math.floor((current / 100) * steps.length);
      setStepIndex((prev) => (newIndex < steps.length ? newIndex : prev));

      if (current >= 100) {
        clearInterval(timer);
        setFinished(true);
      }
    }, tick);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [steps.length]);

  // Player Wistia (client-side)
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!document.getElementById("wistia-player-lib")) {
      const s1 = document.createElement("script");
      s1.src = "https://fast.wistia.com/player.js";
      s1.async = true;
      s1.id = "wistia-player-lib";
      document.body.appendChild(s1);

      const s2 = document.createElement("script");
      s2.src = `https://fast.wistia.com/embed/${WISTIA_ID}.js`;
      s2.async = true;
      s2.type = "module";
      s2.id = "wistia-embed-lib";
      document.body.appendChild(s2);
    }
  }, []);


  return (
    <div className="vs-container-lg">
      <div className="vs-card-lg">
        <h2 className="vs-title-lg">Iniciando varredura avançada...</h2>

        <div className="vs-video-wrap-lg">
          <style>{`
            wistia-player[media-id='${WISTIA_ID}']:not(:defined) {
              background: center / cover no-repeat url('https://fast.wistia.com/embed/medias/${WISTIA_ID}/swatch');
              display: block;
              padding-top: 125%;
              border-radius: 14px;
            }
          `}</style>
          <wistia-player
            media-id={WISTIA_ID}
            aspect="1.7777777777777777"
            style={{ width: "100%", height: "100%" }}
          ></wistia-player>
        </div>

        <div className="vs-profile-card-lg">
          <div className="vs-profile-phone">{formatPhone(numero)}</div>
          <div className="vs-profile-status">
            <span className="vs-green-dot" />
            {progress < 100
              ? "Análise em tempo real em andamento..."
              : "Clonagem concluída com sucesso"}
          </div>

        </div>

        <div className="vs-progress-area-lg">
          <div className="vs-progress-bar-lg">
            <div
              className="vs-progress-fill-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="vs-progress-text-lg">
            {Math.round(progress)}%
          </div>
        </div>

        {finished && (
          <div className="vs-actions-lg">
            <a
              className="vs-access-btn-big pulse"
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Liberar teste agora
            </a>
          </div>
        )}

        <div className="vs-status-box-lg">
          {steps.map((text, i) => (
            <div
              key={i}
              className={`vs-step-lg ${
                i < stepIndex
                  ? "done"
                  : i === stepIndex
                  ? "active"
                  : "pending"
              }`}
            >
              <span className="vs-step-icon-lg">
                {i < stepIndex ? "✅" : i === stepIndex ? "🔄" : "⏳"}
              </span>
              <div className="vs-step-text-lg">{text}</div>
            </div>
          ))}
        </div>

        {/* Comentários */}
        <div className="vs-comments-fb">
          <div className="vs-comments-title">
            🗨️ Relatos reais de usuários
          </div>

          <div className="vs-comment-fb">
            <img src="/pessoa1.jpg" alt="Emilia Garcia" className="vs-avatar-fb" />
            <div className="vs-comment-body">
              <strong>Emilia Garcia</strong>
              <p>
                Funcionou perfeitamente. Vi mensagens apagadas e conversas
                ocultas. Ferramenta absurda.
              </p>
            </div>
          </div>

          <div className="vs-comment-fb">
            <img src="/pessoa2.jpg" alt="María Fernández" className="vs-avatar-fb" />
            <div className="vs-comment-body">
              <strong>María Fernández</strong>
              <p>
                Achei que era impossível, mas depois de instalar apareceu tudo.
                Recomendo sem medo.
              </p>
            </div>
          </div>

          <div className="vs-comment-fb">
            <img src="/pessoa3.jpg" alt="José Martínez" className="vs-avatar-fb" />
            <div className="vs-comment-body">
              <strong>José Martínez</strong>
              <p>
                Descobri o que realmente estava acontecendo. Valeu cada centavo.
              </p>
            </div>
          </div>

          <div className="vs-comment-fb">
            <img src="/pessoa4.jpg" alt="Ana López" className="vs-avatar-fb" />
            <div className="vs-comment-body">
              <strong>Juan López</strong>
              <p>
                Localização e chats arquivados apareceram na hora. Tudo real.
              </p>
            </div>
          </div>

          <div className="vs-comment-fb">
            <img src="/pessoa5.jpg" alt="Carlos Díaz" className="vs-avatar-fb" />
            <div className="vs-comment-body">
              <strong>Carlos Díaz</strong>
              <p>
                Pensei que fosse golpe, mas funcionou e o suporte respondeu rápido.
              </p>
            </div>
          </div>
        </div>

        <footer className="vs-footer">
          <div className="vs-footer-email">
            📧 Suporte técnico por e-mail
          </div>
          <div className="vs-footer-copy">
            © 2025 Proteja Sua Relação. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
}
