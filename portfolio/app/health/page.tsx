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
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <span className="inline-block bg-accent text-accent-foreground font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          System Diagnostics
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight">
          Health Check
        </h1>
        <p className="text-lg text-brown max-w-2xl font-medium leading-relaxed">
          Async Server Component fetching live API endpoint status from JSONPlaceholder.
        </p>
      </div>

      {/* Health Status & Data Card */}
      <div className="bg-surface p-8 rounded-2xl border border-brown/20 shadow-md space-y-6 max-w-2xl">
        {/* Status Indicator */}
        <div className="flex items-center justify-between border-b border-brown/20 pb-4">
          <span className="text-sm font-bold uppercase tracking-wider text-brown">
            API Connection Status
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
              status === "OK"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-maroon text-cream shadow-sm"
            }`}
          >
            ● {status}
          </span>
        </div>

        {/* Fetched Data Response */}
        {data ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-primary">Fetched Payload</h2>
            <div className="bg-secondary text-secondary-foreground p-6 rounded-xl space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-sm border-b border-cream/20 pb-2">
                <span className="font-semibold opacity-80">Task ID:</span>
                <span className="font-mono font-bold text-gold">#{data.id}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-b border-cream/20 pb-2">
                <span className="font-semibold opacity-80">User ID:</span>
                <span className="font-mono font-bold text-gold">#{data.userId}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-b border-cream/20 pb-2">
                <span className="font-semibold opacity-80">Title:</span>
                <span className="font-medium text-cream capitalize">{data.title}</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="font-semibold opacity-80">Completed Status:</span>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-extrabold bg-gold text-accent-foreground">
                  {data.completed ? "TRUE" : "FALSE"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-maroon text-cream p-4 rounded-xl text-sm font-medium">
            Error: {errorMsg}
          </div>
        )}
      </div>
    </section>
  );
}
