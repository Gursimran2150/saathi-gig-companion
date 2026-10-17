"use client";

import { useCallback, useId, useState, type FormEvent } from "react";
import { AnswerPanel } from "@/components/AnswerPanel";
import { Helplines } from "@/components/Helplines";
import { useLanguage } from "@/components/LanguageProvider";
import { MicButton } from "@/components/MicButton";
import { WorkTypeSelect } from "@/components/WorkTypeSelect";
import { useProfile } from "@/hooks/useAppData";
import { useStreamingText } from "@/hooks/useStreamingText";

const QUICK_SITUATIONS = [
  "Late night delivery in an unlit area",
  "Riding in heavy rain or flooded roads",
  "Working outdoors in a heat wave",
  "A customer is abusive or threatening",
  "I had a road accident during work",
  "Someone asked for my OTP or app login",
];

export function SafetyView() {
  const { t, language } = useLanguage();
  const situationId = useId();
  const [profile, setProfile] = useProfile();
  const [situation, setSituation] = useState("");
  const { text, status, error, run, stop, isStreaming } = useStreamingText("/api/safety");

  const appendTranscript = useCallback((s: string) => setSituation((v) => (v ? `${v} ${s}` : s)), []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!situation.trim() || isStreaming) return;
    void run({ workType: profile.workType, situation, language });
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={onSubmit} className="card flex flex-col gap-4">
        <WorkTypeSelect value={profile.workType} onChange={(workType) => setProfile({ ...profile, workType })} />
        <fieldset>
          <legend className="field-label">{t("safety.quick")}</legend>
          <div className="flex flex-wrap gap-2">
            {QUICK_SITUATIONS.map((s) => (
              <button key={s} type="button" onClick={() => setSituation(s)} className="btn-subtle">
                {s}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor={situationId} className="field-label">
            {t("safety.situation")}
          </label>
          <div className="flex gap-2">
            <textarea
              id={situationId}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder={t("safety.placeholder")}
              maxLength={1000}
              rows={3}
              required
              className="input"
            />
            <MicButton onTranscript={appendTranscript} />
          </div>
        </div>
        <div>
          {isStreaming ? (
            <button type="button" onClick={stop} className="btn-secondary">
              {t("common.stop")}
            </button>
          ) : (
            <button type="submit" disabled={!situation.trim()} className="btn-primary">
              🛡️ {t("safety.get")}
            </button>
          )}
        </div>
      </form>
      {status !== "idle" && <AnswerPanel text={text} status={status} error={error} />}
      <Helplines />
    </div>
  );
}
