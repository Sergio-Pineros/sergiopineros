import type { TomoMessage } from "@/lib/tomo";

export function Bubble({ message, accent }: { message: TomoMessage; accent?: string }) {
  if (message.from === "tomo") {
    return (
      <div className="flex items-end gap-2">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-[#2b2118]"
          style={{ backgroundColor: accent ?? "#ffc531" }}
        >
          T
        </span>
        <p className="max-w-[80%] rounded-3xl rounded-bl-md bg-white px-4 py-2.5 text-[15px] leading-[1.5] text-[#2b2118] shadow-[0_1px_2px_rgba(43,33,24,0.08)] ring-1 ring-[#2b2118]/5">
          {message.text}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-end">
      {message.name ? (
        <span className="mb-1 pr-2 text-[12px] font-medium text-[#2b2118]/50">{message.name}</span>
      ) : null}
      <p className="max-w-[80%] rounded-3xl rounded-br-md bg-[#2b2118] px-4 py-2.5 text-[15px] leading-[1.5] text-[#fff9ef]">
        {message.text}
      </p>
    </div>
  );
}

export default function ChatThread({
  messages,
  label,
  accent,
}: {
  messages: TomoMessage[];
  label: string;
  accent?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="space-y-3 rounded-[2rem] bg-[#fdf3e0] p-5 ring-1 ring-[#2b2118]/5 sm:p-6"
    >
      {messages.map((message, i) => (
        <Bubble key={`${message.from}-${i}`} message={message} accent={accent} />
      ))}
    </div>
  );
}
