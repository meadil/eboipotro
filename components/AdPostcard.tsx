"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "eboipotro_ad_dismissed_date";
const AD_CONTAINER_ID = "container-40239d7862a4b6498e3306d71fb10104";
const AD_SCRIPT_SRC =
    "https://pl31163263.profitableratecpmnetwork.com/40239d7862a4b6498e3306d71fb10104/invoke.js";

export default function AdPostcard() {
    const [visible, setVisible] = useState(false);
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);
        const dismissedDate = localStorage.getItem(DISMISS_KEY);
        if (dismissedDate === today) return;

        const showTimer = setTimeout(() => setVisible(true), 6000);
        return () => clearTimeout(showTimer);
    }, []);

    useEffect(() => {
        if (visible) {
            const enterTimer = setTimeout(() => setEntered(true), 20);
            return () => clearTimeout(enterTimer);
        }
    }, [visible]);

    // Load the Adsterra native banner script once the card has actually appeared,
    // so it never loads for people who never see it.
    useEffect(() => {
        if (!entered) return;

        const container = document.getElementById(AD_CONTAINER_ID);
        if (!container || container.dataset.loaded === "true") return;

        const script = document.createElement("script");
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.src = AD_SCRIPT_SRC;
        container.parentElement?.insertBefore(script, container);
        container.dataset.loaded = "true";
    }, [entered]);

    const handleDismiss = () => {
        setEntered(false);
        setTimeout(() => setVisible(false), 300);
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem(DISMISS_KEY, today);
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:w-80 z-40 transition-all duration-300 ease-out ${entered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
        >
            <div className="relative bg-parchment-card rounded-3xl rounded-bl-lg p-5 shadow-[0_10px_40px_rgba(46,33,24,0.18)] border border-ink/5">
                <button
                    onClick={handleDismiss}
                    aria-label="বন্ধ করুন"
                    className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors text-sm"
                >
                    ✕
                </button>

                <p className="font-display text-lg text-ink/40 mb-1 pr-6">
                    একটু বিরতি নেবেন? ☕
                </p>
                <p className="text-[11px] text-ink-muted/70 mb-3 tracking-wide">
                    বিজ্ঞাপন
                </p>

                <div
                    id={AD_CONTAINER_ID}
                    className="rounded-2xl overflow-hidden min-h-[90px]"
                />
            </div>
        </div>
    );
}