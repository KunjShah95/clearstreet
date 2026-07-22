import React, { useState } from "react";
import { Copy, Check, Terminal, Play, Cpu, ShieldCheck, Zap } from "lucide-react";

const codeSnippets = {
  execution: `// Clear Street REST API — Algorithmic Trade Execution
POST /v1/orders HTTP/1.1
Host: api.clearstreet.io
Authorization: Bearer cs_live_key_993f12a
Content-Type: application/json

{
  "account_id": "ACC-789421-HF",
  "symbol": "AAPL",
  "side": "BUY",
  "quantity": 15000,
  "order_type": "LIMIT",
  "price": 224.50,
  "time_in_force": "IOC",
  "algo_strategy": "TWAP",
  "algo_params": {
    "start_time": "09:30:00",
    "end_time": "16:00:00"
  }
}`,
  clearing: `// Real-Time Clearing & Position Settlement Stream
const client = new ClearStreet.Client({
  apiKey: process.env.CS_API_KEY,
  environment: 'production'
});

const stream = await client.clearing.positions.subscribe({
  accountId: 'ACC-789421-HF'
});

stream.on('settlement', (event) => {
  console.log(\`[CLEARING] Settlement ID: \${event.id}\`);
  console.log(\`[MARGIN] Required: \$\${event.marginRequired.toLocaleString()}\`);
  console.log(\`[LATENCY] Execution to Settlement: \${event.latencyMs}ms\`);
});`,
  risk: `// Real-Time Risk Analytics & Portfolio Stress Testing
const riskAnalysis = await client.risk.calculate({
  portfolioId: 'PORTFOLIO_ALPHA_1',
  scenarios: ['SHOCK_SPX_MINUS_10', 'VOL_SPIKE_50'],
  confidenceLevel: 0.99,
  horizonDays: 1
});

console.log(\`VaR (99%): \$\${riskAnalysis.valueAtRisk.toLocaleString()}\`);
console.log(\`Margin Buffer: \${riskAnalysis.marginBufferPercent}%\`);`,
};

export function APITerminal() {
  const [activeTab, setActiveTab] = useState<keyof typeof codeSnippets>("execution");
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [outputLog, setOutputLog] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsExecuting(true);
    setOutputLog("Connecting to api.clearstreet.io via WebSocket (WSS)...");
    setTimeout(() => {
      if (activeTab === "execution") {
        setOutputLog("HTTP 201 Created | Order ID: ord_9824f11a | Latency: 1.2ms | Status: FILLED");
      } else if (activeTab === "clearing") {
        setOutputLog("Stream Connected | 4,218 positions synced | Real-time ledger active");
      } else {
        setOutputLog("Stress Test Complete | VaR (99%): $1,420,500 | Margin Ratio: 14.2% OK");
      }
      setIsExecuting(false);
    }, 600);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#01001F] text-white shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-white/50">api.clearstreet.io / studio</span>
        </div>

        {/* Navigation tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {(["execution", "clearing", "risk"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOutputLog(null);
              }}
              className={`rounded-lg px-3 py-1 font-mono text-xs capitalize transition ${
                activeTab === tab
                  ? "bg-[#2E21DE] text-white font-medium shadow-sm"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isExecuting}
            className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/30"
          >
            <Play className="h-3 w-3" />
            {isExecuting ? "Executing..." : "Test Request"}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 sm:p-6">
        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-blue-100/90 sm:text-sm">
          <code>{codeSnippets[activeTab]}</code>
        </pre>

        {/* Execution Output Panel */}
        {outputLog && (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 font-mono text-xs text-emerald-300 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{outputLog}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer feature strip */}
      <div className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 bg-white/[0.02] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex items-center gap-3 p-4">
          <Cpu className="h-4 w-4 text-[#DAD7FF]" />
          <div>
            <p className="font-sans text-xs font-semibold text-white">Sub-Millisecond Engine</p>
            <p className="font-sans text-[11px] text-white/60">Built for low-latency HFT</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <ShieldCheck className="h-4 w-4 text-[#DAD7FF]" />
          <div>
            <p className="font-sans text-xs font-semibold text-white">Real-Time Ledger</p>
            <p className="font-sans text-[11px] text-white/60">Continuous clearing & settlement</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <Terminal className="h-4 w-4 text-[#DAD7FF]" />
          <div>
            <p className="font-sans text-xs font-semibold text-white">REST & WebSocket APIs</p>
            <p className="font-sans text-[11px] text-white/60">Python, C++, Fix protocol support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
