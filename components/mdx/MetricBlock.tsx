interface Metric {
  value: string;
  label: string;
}

interface MetricBlockProps {
  metrics: Metric[];
}

/** Row of headline stats for use inside MDX work entries. */
export function MetricBlock({ metrics }: MetricBlockProps) {
  return (
    <dl className="my-8 grid grid-cols-2 gap-6 rounded-large bg-surface p-8 md:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-1">
          <dt className="order-2 text-sm text-body">{m.label}</dt>
          <dd className="order-1 text-h2 font-semibold text-title">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}
