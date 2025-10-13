"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./videostage.css";

const WISTIA_ID = "7c9ajesj6n";

export default function VideoStage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const numero = searchParams.get("numero") || "";

  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [cidade, setCidade] = useState("");

  const steps = [
    "Verificando servidores...",
    "Conexión segura...",
    "Analizando datos...",
    "Sincronizando información...",
    "Procesando resultados...",
  ];

  const formatPhone = (num = "") => {
    const p1 = num.slice(0, 3);
    const p2 = num.slice(3, 6);
    const p3 = num.slice(6, 9);
    return `+34 ${p1} ${p2} ${p3}`;
  };

  const whatsappURL = `https://wa.me/34${numero}?text=Hola%2C+quiero+instalar+el+software+de+monitoreo`;

  // Progresso da simulação
  useEffect(() => {
    let current = 0;
    const totalTime = 100_000;
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
  }, []);

  // Carrega player Wistia
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

  // Geolocalização por navegador + Nominatim
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=es`)
            .then((res) => res.json())
            .then((data) => {
              const cidadeDetectada =
                data?.address?.city ||
                data?.address?.town ||
                data?.address?.village ||
                data?.address?.municipality ||
                "";
              setCidade(cidadeDetectada);
            })
            .catch(() => setCidade(""));
        },
        () => setCidade("")
      );
    }
  }, []);

  return (
    <div className="vs-container-lg">
      <div className="vs-card-lg">
        <h2 className="vs-title-lg">Iniciando escaneo...</h2>

        <div className="vs-video-wrap-lg">
          <style>{`
            wistia-player[media-id='${WISTIA_ID}']:not(:defined) {
              background: center / cover no-repeat url('https://fast.wistia.com/embed/medias/${WISTIA_ID}/swatch');
              display: block;
              padding-top: 125%;
              border-radius: 14px;
            }
          `}</style>
          <wistia-player media-id={WISTIA_ID} aspect="1.7777777777777777"></wistia-player>
        </div>

        <div className="vs-profile-card-lg">
          <div className="vs-profile-name">Perfil WhatsApp</div>
          <div className="vs-profile-phone">{formatPhone(numero)}</div>
          <div className="vs-profile-status">
            <span className="vs-green-dot" />
            {progress < 100 ? "Analizando datos..." : "Clonado con éxito"}
          </div>
          <div className="vs-profile-meta">
            {cidade && (
              <div className="vs-meta-row">
                <span className="vs-meta-icon">📍</span>
                Ciudad: <strong>{cidade}</strong>
              </div>
            )}
            <div className="vs-meta-row">📶 Operadora: Movistar</div>
            <div className="vs-meta-row">🔒 Estado da cuenta: Activa</div>
          </div>
        </div>

        <div className="vs-progress-area-lg">
          <div className="vs-progress-bar-lg">
            <div
              className="vs-progress-fill-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="vs-progress-text-lg">{Math.round(progress)}%</div>
        </div>

        {finished && (
          <>
            <a
              className="vs-access-btn-big pulse"
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Obtener acceso al software
            </a>

            <div className="vs-actions-lg">
              <a
                className="vs-next-lg pulse"
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Obtener acceso al software
              </a>
            </div>
          </>
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

<div className="vs-comments-fb">
  <div className="vs-comments-title">
    🗨️ Comentarios recientes
  </div>

  <div className="vs-comment-fb">
    <img src="/pessoa1.jpg" alt="Luis García" className="vs-avatar-fb" />
    <div className="vs-comment-body">
      <strong>Luis García</strong>
      <p>Funciona perfectamente, vi todas las conversaciones eliminadas. Increíble herramienta.</p>
    </div>
  </div>

  <div className="vs-comment-fb">
    <img src="/pessoa2.jpg" alt="María Fernández" className="vs-avatar-fb" />
    <div className="vs-comment-body">
      <strong>María Fernández</strong>
      <p>Al principio dudé, pero después de instalarlo vi todo. Muy recomendable.</p>
    </div>
  </div>

  <div className="vs-comment-fb">
    <img src="/pessoa3.jpg" alt="José Martínez" className="vs-avatar-fb" />
    <div className="vs-comment-body">
      <strong>José Martínez</strong>
      <p>Gracias a esto descubrí lo que pasaba con mi pareja. Vale cada centavo.</p>
    </div>
  </div>

  <div className="vs-comment-fb">
    <img src="/pessoa4.jpg" alt="Ana López" className="vs-avatar-fb" />
    <div className="vs-comment-body">
      <strong>Ana López</strong>
      <p>La ubicación y los chats archivados se muestran al instante. Todo real.</p>
    </div>
  </div>

  <div className="vs-comment-fb">
    <img src="/pessoa5.jpg" alt="Carlos Díaz" className="vs-avatar-fb" />
    <div className="vs-comment-body">
      <strong>Carlos Díaz</strong>
      <p>Pensé que era una estafa, pero funcionó y el soporte fue rápido.</p>
    </div>
  </div>
</div>



        <footer className="vs-footer">
          <div className="vs-footer-email">📧 Soporte por correo electrónico</div>
          <div className="vs-footer-copy">
            © 2025 Protege Tu Relación. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
}
