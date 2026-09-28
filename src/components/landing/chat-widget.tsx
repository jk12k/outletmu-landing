"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import styles from "./chat-widget.module.scss";

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hai! 👋 Saya asisten Outletmu. Tanya apa saja seputar aplikasi kasir, QR order, fitur, atau harga Outletmu.",
};

const QUICK_PROMPTS = [
  "Apa itu Outletmu?",
  "Berapa harga paketnya?",
  "Apa saja fiturnya?",
  "Cara pakai QR order meja?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, loading]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: nextMessages.slice(-7, -1).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; reply?: string; message?: string };
      const reply =
        data.reply ||
        data.message ||
        "Maaf, asisten sedang tidak tersedia. Coba lagi atau hubungi WhatsApp 081291960227.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, koneksi sedang bermasalah. Coba lagi atau hubungi WhatsApp 081291960227.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup asisten Outletmu" : "Buka asisten Outletmu"}
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
        {!open ? <span className={styles.launcherDot} aria-hidden="true" /> : null}
      </button>

      {open ? (
        <div className={styles.panel} role="dialog" aria-label="Asisten AI Outletmu">
          <div className={styles.header}>
            <span className={styles.avatar}>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <strong>Asisten Outletmu</strong>
              <small>AI · jawab seputar Outletmu</small>
            </div>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Tutup">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className={styles.messages} ref={scrollRef}>
            {messages.map((msg, index) => (
              <div
                key={`${index}-${msg.role}`}
                className={msg.role === "user" ? styles.bubbleUser : styles.bubbleBot}
              >
                {msg.content}
              </div>
            ))}
            {loading ? (
              <div className={styles.bubbleBot}>
                <span className={styles.typing} aria-label="Sedang menulis">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ) : null}
          </div>

          {messages.length <= 1 ? (
            <div className={styles.quick}>
              {QUICK_PROMPTS.map((prompt) => (
                <button key={prompt} type="button" onClick={() => send(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tanya seputar Outletmu..."
              maxLength={600}
              aria-label="Pesan"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Kirim">
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
          <p className={styles.disclaimer}>
            Asisten hanya menjawab seputar Outletmu. Untuk kebutuhan lain: WhatsApp 081291960227.
          </p>
        </div>
      ) : null}
    </>
  );
}
