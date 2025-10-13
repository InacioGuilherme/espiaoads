import { Suspense } from "react";
import VideoStageClient from "./VideoStageClient";

export default function VideoStagePage() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#075e54" }}>
          Cargando...
        </div>
      }
    >
      <VideoStageClient />
    </Suspense>
  );
}
