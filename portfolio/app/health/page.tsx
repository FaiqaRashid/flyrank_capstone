interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default async function HealthCheck() {
  let data: Todo | null = null;
  let status: "OK" | "ERROR" = "OK";
  let errorMsg = "";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    data = await res.json();
  } catch (err: any) {
    status = "ERROR";
    errorMsg = err.message || "Failed to fetch health check data";
  }

  return (
    <section className="section-padding max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <span className="inline-block bg-sage text-obsidian font-mono font-black text-xs px-3 py-1 rounded-md border-2 border-obsidian uppercase tracking-wider shadow-sharp-sm">
          SYSTEM DIAGNOSTICS
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-obsidian tracking-tight">
          Health Check
        </h1>
        <p className="text-base sm:text-lg text-obsidian/90 max-w-2xl font-medium leading-relaxed">
          Async Server Component fetching live API endpoint status from JSONPlaceholder.
        </p>
      </div>

      {/* Health Status & Data Card */}
      <div className="bg-beige p-6 sm:p-8 rounded-2xl border-2 border-obsidian shadow-sharp space-y-6 max-w-2xl">
        {/* Status Indicator */}
        <div className="flex items-center justify-between border-b-2 border-obsidian/20 pb-4">
          <span className="text-xs font-mono font-black uppercase tracking-wider text-obsidian">
            API Connection Status
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-widest border-2 border-obsidian ${
              status === "OK"
                ? "bg-sage text-obsidian shadow-sharp-sm"
                : "bg-cream text-obsidian shadow-sharp-sm"
            }`}
          >
            ● {status}
          </span>
        </div>

        {/* Fetched Data Response */}
        {data ? (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-obsidian">Fetched Payload</h2>
            <div className="bg-cream text-obsidian p-6 rounded-xl border-2 border-obsidian space-y-3 shadow-sharp-sm font-mono text-sm">
              <div className="flex items-center justify-between border-b border-obsidian/20 pb-2">
                <span className="font-bold opacity-80">Task ID:</span>
                <span className="font-bold text-obsidian">#{data.id}</span>
              </div>
              <div className="flex items-center justify-between border-b border-obsidian/20 pb-2">
                <span className="font-bold opacity-80">User ID:</span>
                <span className="font-bold text-obsidian">#{data.userId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-obsidian/20 pb-2">
                <span className="font-bold opacity-80">Title:</span>
                <span className="font-bold text-obsidian capitalize">{data.title}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-bold opacity-80">Completed Status:</span>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-black bg-sage text-obsidian border border-obsidian">
                  {data.completed ? "TRUE" : "FALSE"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-cream text-obsidian p-4 rounded-xl text-sm font-bold border-2 border-obsidian">
            Error: {errorMsg}
          </div>
        )}
      </div>
    </section>
  );
}
