"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Minimal typing for the Web Speech API (Chrome, Safari, Edge). */
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): SpeechRecognitionCtor | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export interface Dictation {
  supported: boolean;
  listening: boolean;
  /** Finalized text so far plus the current interim guess. */
  transcript: string;
  start: () => void;
  stop: () => void;
  reset: () => void;
  error?: string;
}

/** Browser dictation. Accumulates final results; exposes interim text while speaking. */
export function useDictation(): Dictation {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [finalText, setFinalText] = useState("");
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | undefined>();
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    setSupported(Boolean(getRecognitionCtor()));
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    setError(undefined);
    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let finals = "";
      let partial = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (!result) continue;
        const text = result[0]?.transcript ?? "";
        if (result.isFinal) finals += text;
        else partial += text;
      }
      if (finals) setFinalText((prev) => `${prev}${prev && !prev.endsWith(" ") ? " " : ""}${finals.trim()}`);
      setInterim(partial);
    };
    recognition.onerror = (event) => {
      setError(event.error === "not-allowed" ? "Microphone access was blocked." : event.error);
      setListening(false);
    };
    recognition.onend = () => {
      setInterim("");
      setListening(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, []);

  const reset = useCallback(() => {
    setFinalText("");
    setInterim("");
  }, []);

  useEffect(() => () => recognitionRef.current?.abort(), []);

  return {
    supported,
    listening,
    transcript: interim ? `${finalText}${finalText ? " " : ""}${interim}` : finalText,
    start,
    stop,
    reset,
    error,
  };
}
