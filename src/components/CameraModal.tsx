"use client";

import { useEffect, useRef, useState } from "react";
import { frameToDataUrl } from "@/lib/image";

type Facing = "environment" | "user";

function explain(err: unknown): string {
  const name = err instanceof DOMException ? err.name : "";
  if (name === "NotAllowedError" || name === "SecurityError")
    return "Camera permission was denied. Allow camera access in your browser settings, or choose a photo instead.";
  if (name === "NotFoundError" || name === "OverconstrainedError")
    return "No camera was found on this device. Choose a photo instead.";
  if (name === "NotReadableError") return "The camera is busy in another app. Close it and try again.";
  return err instanceof Error ? err.message : "The camera could not be started.";
}

export function CameraModal({ onCapture, onClose }: { onCapture: (dataUrl: string) => void; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [facing, setFacing] = useState<Facing>("environment");
  const [status, setStatus] = useState<"starting" | "live" | "error">("starting");
  const [error, setError] = useState("");

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;
    Promise.resolve()
      .then(() => {
        if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia)
          throw new Error("Live camera needs a secure (https) page and a supported browser. Choose a photo instead.");
        return navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: facing }, width: { ideal: 1280 } },
          audio: false,
        });
      })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = s;
        const v = videoRef.current;
        if (v) {
          v.srcObject = s;
          void v.play();
        }
        setStatus("live");
      })
      .catch((e) => {
        if (cancelled) return;
        setError(explain(e));
        setStatus("error");
      });
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [facing]);

  const snap = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) {
      setError("The camera is not ready yet. Wait a second and try again.");
      return;
    }
    try {
      onCapture(frameToDataUrl(v));
    } catch (e) {
      setError(explain(e));
    }
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col bg-black" role="dialog" aria-label="Take a photo">
      <div className="relative flex-1 overflow-hidden">
        <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
        {status !== "live" && (
          <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-stone-200">
            {status === "starting" ? "Starting the camera..." : error}
          </p>
        )}
      </div>
      {status === "live" && error && <p className="bg-black px-4 py-2 text-center text-xs text-red-300">{error}</p>}
      <div className="flex items-center justify-between gap-2 bg-black p-3">
        <button onClick={onClose} className="rounded-lg border border-stone-600 px-3 py-2 text-sm text-white">
          Cancel
        </button>
        <button
          onClick={snap}
          disabled={status !== "live"}
          aria-label="Take photo"
          className="h-12 w-12 rounded-full border-4 border-white bg-white/90 disabled:opacity-40"
        />
        <button
          onClick={() => {
            setStatus("starting");
            setError("");
            setFacing((f) => (f === "environment" ? "user" : "environment"));
          }}
          className="rounded-lg border border-stone-600 px-3 py-2 text-sm text-white"
        >
          Switch
        </button>
      </div>
    </div>
  );
}
