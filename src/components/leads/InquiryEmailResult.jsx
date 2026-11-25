const states = {
  accepted: ['Accepted for sending', 'text-green-800'],
  failed: ['Failed', 'text-destructive'],
  pending: ['Waiting for a result', 'text-muted-foreground'],
  unconfirmed: ['Send not confirmed', 'text-amber-800'],
};

export default function InquiryEmailResult({ outcome, name, children }) {
  const [label, color] = states[outcome.status] || states.unconfirmed;
  return (
    <li className="inquiryEmailResult min-w-0 break-words rounded-lg border bg-card px-3 py-2 text-sm">
      {name && <p className="font-semibold">{name}</p>}
      <p>{outcome.recipient}</p>
      <p className={`font-medium ${color}`}>{label}</p>
      {outcome.detail && <p className="text-xs text-muted-foreground">{outcome.detail}</p>}
      {children}
    </li>
  );
}