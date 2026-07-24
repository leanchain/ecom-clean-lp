"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  Star,
} from "lucide-react";

function ChatGPTIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 75 75"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="m68.238281 31.726562c.410157-1.238281.6875-2.503906.828125-3.800781s.140625-2.59375.003906-3.890625c-.132812-1.296875-.40625-2.5625-.8125-3.800781s-.941406-2.421875-1.597656-3.546875c-.488281-.84375-1.035156-1.644531-1.648437-2.40625-.609375-.757812-1.277344-1.460938-2.003907-2.117188-.722656-.652343-1.492187-1.242187-2.308593-1.773437-.816407-.53125-1.671875-.996094-2.5625-1.394531-.886719-.394532-1.804688-.71875-2.746094-.972656-.941406-.25-1.894531-.425782-2.867187-.527344-.96875-.101563-1.9375-.125-2.910157-.074219-.976562.050781-1.9375.179687-2.890625.382813-.269531-.300782-.550781-.589844-.839844-.875-.292968-.28125-.589843-.554688-.898437-.820313-.308594-.261719-.625-.515625-.949219-.757813-.324218-.242187-.65625-.476562-.996094-.695312-.339843-.222656-.6875-.429688-1.039062-.628906-.351562-.199219-.710938-.386719-1.078125-.558594-.367187-.175781-.738281-.339844-1.113281-.488281-.375-.152344-.757813-.289063-1.140625-.414063-.386719-.128906-.777344-.238281-1.167969-.339844-.394531-.101562-.789062-.1875-1.1875-.261718-.398438-.074219-.796875-.136719-1.199219-.183594-.402343-.046875-.808593-.082031-1.210937-.105469-.40625-.019531-.808594-.027343-1.214844-.023437s-.808594.023437-1.214844.054687c-.402344.03125-.804687.074219-1.207031.132813s-.800781.128906-1.195313.210937c-.398437.085938-.789062.179688-1.179687.289063s-.777344.234375-1.160156.367187c-.382813.136719-.757813.28125-1.132813.441407-.371094.160156-.738281.332031-1.097656.515624-.363281.183594-.71875.378907-1.066406.585938s-.691406.421875-1.023438.652344c-.335937.230468-.660156.46875-.980468.71875-.316407.25-.628907.511718-.929688.78125-.300781.273437-.59375.550781-.878906.84375-.28125.289062-.554688.585937-.816406.894531-.265626.308594-.519532.625-.761719.949219-.242188.324218-.476563.65625-.695313.996094-.222656.339843-.433594.683593-.628906 1.039062-.199219.351562-.386719.710938-.5625 1.078125-.175781.363281-.335938.734375-.488281 1.113281-.152344.375-.289063.753906-.414063 1.140625-1.277344.261719-2.511718.65625-3.707031 1.179688-1.195313.527343-2.316406 1.171875-3.375 1.9375-1.054687.765625-2.015625 1.636719-2.886719 2.605469-.871094.972656-1.628906 2.023437-2.273437 3.160156-.492188.839844-.914063 1.71875-1.265625 2.628906-.351563.910156-.628906 1.84375-.835938 2.796875-.203125.953125-.332031 1.917969-.382812 2.894531-.054688.972656-.027344 1.945313.074218 2.914063.101563.972656.277344 1.929687.53125 2.871093.25.941407.578126 1.859376.976563 2.75.394531.890626.859375 1.746094 1.394531 2.5625.53125.820313 1.125 1.589844 1.78125 2.3125-.414062 1.238282-.691406 2.503907-.832031 3.800782s-.144531 2.59375-.011719 3.890625c.136719 1.296875.40625 2.5625.8125 3.800781s.9375 2.421875 1.597656 3.546875c.484376.847656 1.035157 1.648437 1.644532 2.40625.613281.757813 1.28125 1.464844 2.007812 2.117187.722656.652344 1.492188 1.246094 2.3125 1.777344.816406.53125 1.671875.996094 2.5625 1.390625.890625.398438 1.804688.722657 2.75.972657.941406.253906 1.894532.429687 2.867188.53125.96875.101562 1.941406.125 2.914062.074218.972656-.054687 1.9375-.183594 2.890625-.386718.867188.972656 1.824219 1.847656 2.875 2.617187s2.171875 1.421875 3.363281 1.953125c1.191407.53125 2.425782.929688 3.699219 1.195312 1.277344.269532 2.566407.398438 3.871094.390626.976563.003906 1.945313-.074219 2.910156-.226563.964844-.152344 1.914063-.378906 2.839844-.679687.929687-.304688 1.828125-.675782 2.699219-1.121094.871094-.445313 1.699218-.953125 2.488281-1.527344s1.527344-1.210938 2.21875-1.902344c.6875-.691406 1.320313-1.433594 1.890625-2.222656.574219-.792969 1.078125-1.625 1.519531-2.496094.441407-.871094.808594-1.773437 1.109375-2.703125 1.277344-.261719 2.511719-.65625 3.707032-1.183593 1.191406-.523438 2.316406-1.171876 3.371093-1.9375 1.054688-.765626 2.019531-1.632813 2.890625-2.605469.871094-.96875 1.628906-2.023438 2.273438-3.15625.484375-.839844.902344-1.714844 1.25-2.625.347656-.90625.621094-1.835938.820312-2.785157.203125-.953124.328125-1.914062.378906-2.882812.050782-.972656.023438-1.941406-.078124-2.90625-.101563-.96875-.28125-1.921875-.53125-2.859375-.253907-.9375-.578126-1.851563-.972657-2.738281-.394531-.890625-.855469-1.742188-1.386719-2.554688-.53125-.816406-1.121093-1.585937-1.769531-2.308594zm-27.628906 38.613282c-1.609375.003906-3.171875-.269532-4.6875-.816406-1.511719-.550782-2.886719-1.339844-4.121094-2.371094l.433594-.246094 14.632813-8.449219c.371093-.214843.664062-.511719.878906-.882812.214844-.371094.320312-.773438.324218-1.203125v-20.628906l6.1875 3.578124c.066407.03125.101563.085938.113282.160157v17.09375c0 .90625-.089844 1.796875-.265625 2.683593-.179688.886719-.441407 1.746094-.789063 2.582032-.34375.832031-.769531 1.625-1.273437 2.375-.5.75-1.070313 1.445312-1.710938 2.085937-.636719.636719-1.332031 1.207031-2.082031 1.710938-.753906.5-1.542969.925781-2.378906 1.273437-.832032.34375-1.695313.605469-2.578125.785156-.886719.175782-1.78125.265626-2.683594.269532zm-29.585937-12.632813c-.808594-1.394531-1.351563-2.886719-1.632813-4.472656s-.285156-3.171875-.003906-4.757813l.433593.261719 14.648438 8.445313c.367188.214844.765625.324218 1.195312.324218.425782 0 .824219-.109374 1.195313-.324218l17.894531-10.316406v7.144531c-.003906.078125-.039062.140625-.101562.1875l-14.824219 8.546875c-.78125.453125-1.601563.824218-2.457031 1.113281-.855469.289063-1.734375.492187-2.628906.609375-.898438.117188-1.796876.148438-2.699219.089844-.898438-.0625-1.789063-.207032-2.660157-.441406-.875-.234376-1.714843-.550782-2.527343-.949219-.808594-.402344-1.574219-.875-2.289063-1.425781-.71875-.550782-1.375-1.164063-1.972656-1.84375-.59375-.679688-1.117188-1.410157-1.570312-2.191407zm-3.855469-31.875c.8125-1.40625 1.84375-2.625 3.089843-3.664062 1.242188-1.039063 2.628907-1.832031 4.15625-2.378907v17.386719c-.007812.425781.097657.828125.308594 1.199219.214844.371094.507813.660156.878906.871094l17.804688 10.273437-6.183594 3.578125c-.074218.039063-.148437.039063-.21875 0l-14.792968-8.535156c-.78125-.453125-1.511719-.976562-2.191407-1.574219-.675781-.59375-1.292969-1.253906-1.839843-1.96875-.550782-.71875-1.023438-1.480469-1.425782-2.292969-.398437-.808593-.714844-1.652343-.949218-2.523437-.234376-.875-.378907-1.761719-.441407-2.660156-.058593-.902344-.03125-1.800781.085938-2.699219.117187-.894531.320312-1.769531.609375-2.625.289062-.859375.660156-1.675781 1.109375-2.460938zm50.828125 11.804688-17.867188-10.371094 6.171875-3.566406c.074219-.039063.148438-.039063.21875 0l14.792969 8.550781c1.132812.652344 2.148438 1.449219 3.050781 2.390625.90625.941406 1.660157 1.992187 2.265625 3.148437.605469 1.15625 1.039063 2.375 1.296875 3.65625.257813 1.277344.332031 2.570313.222657 3.871094-.105469 1.300782-.394532 2.558594-.863282 3.777344-.464844 1.222656-1.09375 2.351562-1.882812 3.390625-.789063 1.042969-1.707032 1.949219-2.753906 2.730469-1.046876.777344-2.183594 1.398437-3.40625 1.851562v-17.386718c-.015626-.425782-.132813-.820313-.355469-1.183594-.222657-.367188-.519531-.652344-.890625-.859375zm6.15625-9.257813-.433594-.257812-14.621094-8.519532c-.371094-.21875-.769531-.328124-1.203125-.328124-.429687 0-.828125.109374-1.199219.328124l-17.878906 10.3125v-7.140624c-.007812-.082032.019532-.144532.085938-.1875l14.792968-8.535157c1.132813-.652343 2.335938-1.132812 3.605469-1.445312 1.273438-.3125 2.558594-.4375 3.867188-.382813 1.308593.058594 2.582031.296875 3.820312.714844s2.394531 1.003906 3.46875 1.753906c1.070313.746094 2.019531 1.628906 2.839844 2.648438.820313 1.019531 1.484375 2.128906 1.988281 3.335937.503906 1.210938.832032 2.460938.980469 3.761719.144531 1.300781.109375 2.59375-.113281 3.882812zm-38.714844 12.664063-6.183594-3.5625c-.066406-.042969-.105468-.097657-.117187-.175781v-17.050782c0-1.308594.183593-2.589844.550781-3.847656.367188-1.253906.902344-2.433594 1.605469-3.539062.703125-1.101563 1.546875-2.085938 2.527343-2.949219.984376-.863281 2.066407-1.570313 3.25-2.125 1.1875-.554688 2.425782-.933594 3.71875-1.136719 1.289063-.203125 2.585938-.21875 3.882813-.050781 1.296875.164062 2.546875.507812 3.746094 1.03125 1.199219.523437 2.300781 1.203125 3.304687 2.039062l-.433594.246094-14.632812 8.445313c-.371094.21875-.664062.511718-.878906.886718-.214844.371094-.320313.769532-.324219 1.199219zm3.363281-7.242188 7.96875-4.59375 7.984375 4.59375v9.183594l-7.957031 4.59375-7.980469-4.59375z" />
    </svg>
  );
}
import { DeviceFrame } from "@/components/ui/device-frame";

function ShopifyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z" />
    </svg>
  );
}

// ── Typing loop hook ──────────────────────────────────────────────────────────

const QUERIES = [
  "best linen summer dress under $80",
  "running sneakers wide toe box free returns",
  "eco water bottle fast shipping under $40",
  "minimalist leather wallet slim profile",
];

function useTypingLoop(
  phrases: string[],
  speed = 65,
  pause = 2000,
  deleteSpeed = 32,
) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(
      () =>
        setDisplayed(
          isDeleting
            ? current.slice(0, displayed.length - 1)
            : current.slice(0, displayed.length + 1),
        ),
      isDeleting ? deleteSpeed : speed,
    );
    return () => clearTimeout(t);
  }, [displayed, isDeleting, phraseIndex, phrases, speed, pause, deleteSpeed]);

  return displayed;
}

// ── Panel 1 - Shopper's ChatGPT query ─────────────────────────────────────────

function ChatContent() {
  const text = useTypingLoop(QUERIES);

  return (
    <div className="flex h-full flex-col bg-[#0D0D0D]">
      {/* camera spacer */}
      <div className="h-6 bg-[#0D0D0D]" />

      {/* app bar */}
      <div className="flex items-center justify-between border-b border-white/8 bg-[#171717] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <ChatGPTIcon className="h-4 w-4 text-white" />
          <span className="text-[10px] font-semibold text-white/70">
            ChatGPT
          </span>
          <span className="flex items-center gap-0.5 rounded bg-white/8 px-1 py-0.5 text-[8px] text-white/40">
            5.4 <ChevronDown className="h-2 w-2" />
          </span>
        </div>
        <span className="text-[9px] font-medium text-white/30">+ New</span>
      </div>

      {/* chat */}
      <div className="space-y-3 px-3 py-3">
        {/* previous exchange - faded */}
        <div className="opacity-35">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-white/10 px-2.5 py-2">
            <p className="text-[10px] text-white/80">
              Something nice for a summer wedding
            </p>
          </div>
          <div className="mt-2 flex gap-2">
            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10A37F]/30">
              <ChatGPTIcon className="h-2 w-2 text-[#10A37F]" />
            </div>
            <p className="text-[10px] leading-relaxed text-white/60">
              Happy to help! What&apos;s your budget?
            </p>
          </div>
        </div>

        {/* active message */}
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-white/12 px-2.5 py-2 ring-1 ring-white/8">
          <p className="text-[11px] leading-relaxed text-white">
            {text || "\u00a0"}
            <span className="animate-pulse opacity-70">|</span>
          </p>
        </div>

        {/* thinking */}
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10A37F]/20">
            <ChatGPTIcon className="h-2 w-2 text-[#10A37F]" />
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-white/5 px-2 py-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-1 animate-pulse rounded-full bg-white/30"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* input */}
      <div className="mt-auto border-t border-white/8 px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
          <span className="flex-1 text-[10px] text-white/20">Message…</span>
          <ArrowRight className="h-2.5 w-2.5 text-white/20" />
        </div>
      </div>
    </div>
  );
}

// ── Panel 2 - AI recommendation (ChatGPT dark, continued) ────────────────────

function ResultContent() {
  return (
    <div className="flex h-full flex-col bg-[#0D0D0D]">
      {/* camera spacer */}
      <div className="h-6 bg-[#0D0D0D]" />

      {/* app bar - identical to ChatContent */}
      <div className="flex items-center justify-between border-b border-white/8 bg-[#171717] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <ChatGPTIcon className="h-4 w-4 text-white" />
          <span className="text-[10px] font-semibold text-white/70">
            ChatGPT
          </span>
          <span className="flex items-center gap-0.5 rounded bg-white/8 px-1 py-0.5 text-[8px] text-white/40">
            5.4 <ChevronDown className="h-2 w-2" />
          </span>
        </div>
        <span className="text-[9px] font-medium text-white/30">+ New</span>
      </div>

      {/* chat continuation */}
      <div className="space-y-3 px-3 py-3">
        {/* user message - faded */}
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-white/10 px-2.5 py-2 opacity-50">
          <p className="text-[10px] text-white/80">
            best linen summer dress under $80
          </p>
        </div>

        {/* AI response */}
        <div className="flex gap-2">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10A37F]/20 mt-0.5">
            <ChatGPTIcon className="h-2 w-2 text-[#10A37F]" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-[10px] leading-relaxed text-white/70">
              Found a great match that fits your budget and ships fast:
            </p>

            {/* product card - dark */}
            <div className="rounded-xl border border-white/8 bg-white/5 p-2.5">
              <div className="flex gap-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <ShoppingBag className="h-4 w-4 text-white/20" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold leading-snug text-white/90">
                    Linen Summer Dress
                  </p>
                  <p className="text-[12px] font-black text-[#10A37F]">$68</p>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-1.5 w-1.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="ml-0.5 text-[8px] text-white/30">
                      4.8 · 312
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-400">
                  In Stock
                </span>
                <span className="rounded-full bg-sky-500/15 px-1.5 py-0.5 text-[8px] font-semibold text-sky-400">
                  Ships in 2 days
                </span>
                <span className="rounded-full bg-white/8 px-1.5 py-0.5 text-[8px] font-semibold text-white/40">
                  Free returns
                </span>
              </div>
            </div>

            <p className="text-[9px] leading-relaxed text-white/40">
              It has 312 verified reviews, structured product data, and matches
              all your criteria.
            </p>
          </div>
        </div>
      </div>

      {/* input */}
      <div className="mt-auto border-t border-white/8 px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
          <span className="flex-1 text-[10px] text-white/20">Message…</span>
          <ArrowRight className="h-2.5 w-2.5 text-white/20" />
        </div>
      </div>
    </div>
  );
}

// ── Panel 3 - Store owner win ─────────────────────────────────────────────────

const SPARKLINE = [8, 12, 10, 18, 14, 22, 20, 32, 42, 56, 54, 100];

const AI_SOURCES = [
  { name: "ChatGPT", dot: "bg-[#10A37F]", orders: 3, amount: "$204", bar: 60 },
  {
    name: "Google AI",
    dot: "bg-[#4285F4]",
    orders: 2,
    amount: "$136",
    bar: 40,
  },
  {
    name: "Perplexity",
    dot: "bg-[#9B72CB]",
    orders: 1,
    amount: "$68",
    bar: 20,
  },
  { name: "Claude", dot: "bg-[#D97757]", orders: 1, amount: "$68", bar: 15 },
];

function WinContent() {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* camera spacer */}
      <div className="h-6 bg-background" />

      {/* new order notification */}
      <div className="border-b border-border/40 bg-emerald-50/80 px-3 py-2.5 dark:bg-emerald-950/20">
        <div className="flex items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#95BF47]/15">
            <ShopifyIcon className="h-4 w-4 text-[#95BF47]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                New order · $68.00
              </p>
              <span className="text-[8px] text-muted-foreground/40">
                just now
              </span>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-[9px] text-muted-foreground">
                Linen Summer Dress
              </p>
              <span className="rounded bg-[#10A37F]/10 px-1 py-0.5 text-[8px] font-semibold text-[#10A37F]">
                via ChatGPT
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 p-3">
        {/* AI source breakdown */}
        <div className="rounded-xl border border-border/40 bg-muted/20 px-2.5 py-2">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[8px] font-black uppercase tracking-wider text-muted-foreground/40">
              Today&apos;s AI referrals
            </p>
            <span className="text-[9px] font-black text-foreground">$476</span>
          </div>
          <div className="space-y-1.5">
            {AI_SOURCES.map((r) => (
              <div key={r.name} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${r.dot}`} />
                    <span className="text-[9px] font-semibold text-foreground/80">
                      {r.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-muted-foreground/60">
                      {r.orders} orders
                    </span>
                    <span className="text-[9px] font-black text-foreground">
                      {r.amount}
                    </span>
                  </div>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-muted/40">
                  <div
                    className={`h-full rounded-full ${r.dot} opacity-60`}
                    style={{ width: `${r.bar}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* sparkline + stat row */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* sparkline */}
          <div className="rounded-xl border border-border/40 bg-muted/20 px-2.5 py-2">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-[8px] font-semibold text-muted-foreground/60">
                AI traffic
              </p>
              <span className="flex items-center gap-0.5 text-[8px] font-black text-emerald-600">
                <TrendingUp className="h-2 w-2" />
                +142%
              </span>
            </div>
            <div className="flex h-8 items-end gap-px">
              {SPARKLINE.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-xs transition-all ${
                    i >= SPARKLINE.length - 3
                      ? "bg-emerald-500"
                      : "bg-emerald-500/20"
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* key stats stacked */}
          <div className="flex flex-col gap-1.5">
            <div className="flex-1 rounded-xl border border-border/40 bg-muted/20 px-2.5 py-1.5">
              <p className="text-[16px] font-black leading-none text-foreground">
                #1
              </p>
              <p className="mt-0.5 text-[7px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                AI rank
              </p>
            </div>
            <div className="flex-1 rounded-xl border border-emerald-500/20 bg-emerald-50/50 px-2.5 py-1.5 dark:bg-emerald-950/20">
              <p className="text-[16px] font-black leading-none text-emerald-700 dark:text-emerald-400">
                $476
              </p>
              <p className="mt-0.5 text-[7px] font-semibold uppercase tracking-wider text-emerald-600/60">
                Today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step metadata ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    label: "Shopper asks AI",
    description:
      "They describe what they want in plain language - no keywords, no guessing.",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    dot: "bg-violet-500",
    icon: ChatGPTIcon,
    tabLabel: "The search",
  },
  {
    label: "AI picks a winner",
    description:
      "Structured data, price, availability, and reviews - all machine-readable, all yours.",
    color: "text-sky-600",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-200 dark:border-sky-800",
    dot: "bg-sky-500",
    icon: Check,
    tabLabel: "AI recommends",
  },
  {
    label: "Your store wins",
    description:
      "You get discovered first. Before ads. Before SEO tricks. Before competitors who aren't ready.",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    dot: "bg-emerald-500",
    icon: TrendingUp,
    tabLabel: "You win",
  },
] as const;

// ── Section ───────────────────────────────────────────────────────────────────

export default function BuyerJourneySection() {
  const [activePanel, setActivePanel] = useState(0);

  return (
    <section
      id="buyer-journey"
      className="relative overflow-hidden bg-muted/30 px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:mb-20"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            The Buyer&apos;s Journey
          </p>
          <h2 className="font-heading mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            The moment AI picks
            <br />
            <span className="italic text-primary">your product.</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground/90 md:text-xl">
            Millions of shoppers describe what they want to an AI every day.
            Beseam makes sure your store is the answer.
          </p>
        </motion.div>

        {/* ── DESKTOP: 3 phones in a row ── */}
        <div className="mx-auto mb-16 hidden max-w-5xl md:block">
          <div className="flex items-center justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <DeviceFrame type="mobile" hideHeader width={230} height={470}>
                <ChatContent />
              </DeviceFrame>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <ArrowRight className="h-4 w-4 text-muted-foreground/25" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <DeviceFrame type="mobile" hideHeader width={230} height={470}>
                <ResultContent />
              </DeviceFrame>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <ArrowRight className="h-4 w-4 text-muted-foreground/25" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <DeviceFrame type="mobile" hideHeader width={230} height={470}>
                <WinContent />
              </DeviceFrame>
            </motion.div>
          </div>
        </div>

        {/* ── MOBILE: tab switcher + single phone ── */}
        <div className="mb-10 md:hidden">
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            {STEPS.map((step, i) => (
              <button
                key={step.tabLabel}
                onClick={() => setActivePanel(i)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  i === activePanel
                    ? `${step.bg} ${step.color} ${step.border} shadow-sm`
                    : "border-border/40 bg-background text-muted-foreground/60"
                }`}
              >
                {step.tabLabel}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* step copy */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border ${STEPS[activePanel].bg} ${STEPS[activePanel].border}`}
                >
                  {(() => {
                    const Icon = STEPS[activePanel].icon;
                    return (
                      <Icon className={`h-4 w-4 ${STEPS[activePanel].color}`} />
                    );
                  })()}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {STEPS[activePanel].label}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {STEPS[activePanel].description}
                  </p>
                </div>
              </div>

              {/* phone */}
              <DeviceFrame type="mobile" hideHeader width={300} height={550}>
                {activePanel === 0 && <ChatContent />}
                {activePanel === 1 && <ResultContent />}
                {activePanel === 2 && <WinContent />}
              </DeviceFrame>
            </motion.div>
          </AnimatePresence>

          {/* progress dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {STEPS.map((step, i) => (
              <button
                key={i}
                onClick={() => setActivePanel(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activePanel
                    ? `w-6 ${step.dot}`
                    : i < activePanel
                      ? `w-2 ${step.dot} opacity-30`
                      : "w-1.5 bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── step labels (desktop) ── */}
        <div className="mx-auto hidden max-w-5xl gap-8 md:grid md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
              className="text-center"
            >
              <div
                className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border ${step.bg} ${step.border}`}
              >
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </div>
              <h3 className="font-heading mb-2 text-base font-bold text-foreground">
                {step.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
