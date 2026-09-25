import { useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity, AlertTriangle, ArrowDownToLine, ArrowUpFromLine, Check, ChevronDown,
  CircleDot, Cloud, Database, HardDrive, Layers3, Menu, MoreHorizontal, Pause,
  Play, RefreshCw, Search, Settings2, ShieldCheck, SlidersHorizontal, Terminal,
  Upload, Wifi, X, Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Vault · Distributed Storage Control Plane" },
      { name: "description", content: "Operate replicated object storage across unreliable nodes with clear health and repair signals." },
      { property: "og:title", content: "Vault · Distributed Storage Control Plane" },
      { property: "og:description", content: "Operate replicated object storage across unreliable nodes with clear health and repair signals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [repairing, setRepairing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const startRepair = () => {
    setRepairing(true);
    window.setTimeout(() => setRepairing(false), 1800);
  };

  return (
    <div className="vault-shell">
      <aside className="vault-sidebar">
        <div className="brand-lockup"><div className="brand-mark"><Layers3 size={18} strokeWidth={2.5} /></div><div><div className="brand-name">VAULT</div><div className="brand-subtitle">Object storage control</div></div></div>
        <div className="workspace-select"><div className="workspace-avatar">PR</div><div className="workspace-copy"><span>Production</span><small>us-east / primary</small></div><ChevronDown size={15} /></div>
        <div className="sidebar-label">Workspace</div>
        <nav className="side-nav" aria-label="Workspace navigation">
          {[["Overview", Activity], ["Objects", Database], ["Nodes", HardDrive], ["Policies", ShieldCheck]].map(([label, Icon]) => (
            <button key={label as string} className={`side-nav-item ${activeTab === label ? "active" : ""}`} onClick={() => setActiveTab(label as string)}><Icon size={16} /><span>{label as string}</span>{label === "Nodes" && <span className="nav-count">12</span>}</button>
          ))}
        </nav>
        <div className="sidebar-label">Operations</div>
        <nav className="side-nav" aria-label="Operations navigation">
          <button className="side-nav-item"><RefreshCw size={16} /><span>Repair queue</span><span className="nav-alert">3</span></button>
          <button className="side-nav-item"><Zap size={16} /><span>Rebalancing</span></button>
          <button className="side-nav-item"><Terminal size={16} /><span>Audit log</span></button>
        </nav>
        <div className="sidebar-spacer" />
        <div className="cluster-mini-status"><div className="status-pulse"><CircleDot size={14} /></div><div><strong>All systems operational</strong><small>Last checked 12 sec ago</small></div></div>
        <button className="side-nav-item settings-item"><Settings2 size={16} /><span>Settings</span></button>
        <div className="sidebar-footer"><span className="online-dot" /> Vault cluster v2.8.4 <span className="footer-separator">•</span> <span className="mono">p95 42ms</span></div>
      </aside>

      <main className="vault-main">
        <header className="topbar"><button className="mobile-menu" aria-label="Open navigation"><Menu size={18} /></button><div className="breadcrumbs"><span>Production</span><span className="crumb-slash">/</span><strong>{activeTab}</strong></div><div className="topbar-actions"><button className={`icon-button ${searchOpen ? "selected" : ""}`} aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={17} /></button><button className="icon-button" aria-label="System activity"><Activity size={17} /></button><div className="topbar-divider" /><button className="user-chip"><span className="user-avatar">JD</span><span className="user-name">Jordan Davis</span><ChevronDown size={14} /></button></div></header>
        <div className="content-wrap">
          <div className="page-heading"><div><div className="eyebrow"><span className="live-dot" /> LIVE CLUSTER</div><h1>Good morning, Jordan.</h1><p>Here’s what’s happening across your storage fleet.</p></div><div className="heading-actions"><button className="button button-quiet" onClick={() => setIsPaused(!isPaused)}>{isPaused ? <Play size={15} /> : <Pause size={15} />} {isPaused ? "Resume" : "Pause updates"}</button><button className="button button-primary" onClick={() => setSimulationOpen(!simulationOpen)}><SlidersHorizontal size={15} /> Simulate event</button></div></div>
          {searchOpen && <div className="search-strip"><Search size={16} /><input autoFocus placeholder="Search objects, nodes, or events" /><span className="search-key">ESC</span></div>}
          <section className="stat-grid" aria-label="Cluster summary"><MetricCard icon={<Database size={16} />} label="Total objects" value="24.8M" trend="+1.2%" detail="vs last 24h" tone="cyan" /><MetricCard icon={<HardDrive size={16} />} label="Storage used" value="68.4 TB" trend="72.6%" detail="of 94.2 TB provisioned" tone="amber" progress /><MetricCard icon={<ShieldCheck size={16} />} label="Durability" value="99.9994%" trend="Excellent" detail="target ≥ 99.99%" tone="green" /><MetricCard icon={<Activity size={16} />} label="Request rate" value="8,429" trend="+18.6%" detail="requests / second" tone="violet" /></section>
          <section className="main-grid"><div className="panel traffic-panel"><PanelHeader title="Traffic overview" subtitle="Read and write throughput · last 24 hours" action={<button className="range-select">24 hours <ChevronDown size={13} /></button>} /><div className="traffic-legend"><span><i className="legend-dot reads" /> Reads <b>6.2k/s</b></span><span><i className="legend-dot writes" /> Writes <b>2.2k/s</b></span><span className="chart-note"><span className="green-up">↗</span> 12.4% from yesterday</span></div><TrafficChart /><div className="chart-axis"><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>Now</span></div></div><div className="panel health-panel"><PanelHeader title="Fleet health" subtitle="Node availability by zone" action={<button className="more-button" aria-label="More fleet health actions"><MoreHorizontal size={18} /></button>} /><div className="health-total"><div className="health-ring"><div><strong>96.7%</strong><span>healthy</span></div></div><div className="health-summary"><HealthLine color="green" label="Healthy" value="29" /><HealthLine color="amber" label="Degraded" value="1" /><HealthLine color="red" label="Offline" value="1" /></div></div><div className="zone-list"><ZoneRow zone="us-east-1" state="Healthy" nodes="12 / 12" latency="38ms" /><ZoneRow zone="us-west-2" state="Healthy" nodes="10 / 10" latency="44ms" /><ZoneRow zone="eu-central-1" state="Degraded" nodes="7 / 8" latency="112ms" /></div></div></section>
          <section className="lower-grid"><div className="panel table-panel"><PanelHeader title="Recent objects" subtitle="Latest writes across the cluster" action={<button className="button button-outline"><Upload size={14} /> Upload object</button>} /><div className="object-table"><div className="table-head"><span>Object</span><span>Size</span><span>Replicas</span><span>Integrity</span><span>Updated</span><span /></div><ObjectRow name="customer-events-2026-09-25.parquet" tag="analytics" size="4.82 GB" replicas="6 / 6" integrity="Verified" updated="2 min ago" /><ObjectRow name="media-assets/catalog-summer.zip" tag="media" size="1.26 GB" replicas="6 / 6" integrity="Verified" updated="8 min ago" /><ObjectRow name="backups/postgres/wal-00219" tag="backup" size="842 MB" replicas="6 / 6" integrity="Verified" updated="14 min ago" /><ObjectRow name="logs/edge/2026-09-25T19:40.jsonl" tag="logs" size="218 MB" replicas="5 / 6" integrity="Repairing" updated="21 min ago" warning /></div><button className="view-all">View all objects <span>→</span></button></div><div className="panel events-panel"><PanelHeader title="System events" subtitle="Live activity feed" action={<span className="live-label"><span className="live-dot" /> LIVE</span>} /><div className="event-list"><EventItem icon={<AlertTriangle size={14} />} tone="warning" title="Replica repair started" detail="logs/edge/2026-09-25T19:40.jsonl" time="2m ago" /><EventItem icon={<Check size={14} />} tone="success" title="Integrity scan completed" detail="12.4M objects verified · us-east-1" time="8m ago" /><EventItem icon={<Wifi size={14} />} tone="info" title="Node reconnected" detail="node-18 · eu-central-1" time="16m ago" /><EventItem icon={<ArrowDownToLine size={14} />} tone="info" title="Rebalance completed" detail="312 GB redistributed · 0 errors" time="31m ago" /></div><button className="view-all">Open audit log <span>→</span></button></div></section>
          <section className="repair-banner"><div className="repair-icon"><RefreshCw size={18} /></div><div className="repair-copy"><strong>3 objects need attention</strong><span>Replica repair is queued and will complete automatically.</span></div><div className="repair-progress"><div className="progress-label"><span>Repair queue</span><strong>67%</strong></div><div className="progress-track"><div className="progress-fill progress-67" /></div></div><button className="button button-outline repair-action" onClick={startRepair}>{repairing ? <RefreshCw size={14} className="spin" /> : <Play size={14} />} {repairing ? "Repairing…" : "Run repair now"}</button></section>
          {simulationOpen && <div className="simulation-popover"><div className="popover-heading"><div><span className="eyebrow">CONTROLLED TEST</span><h3>Simulate cluster event</h3></div><button className="close-button" onClick={() => setSimulationOpen(false)} aria-label="Close simulation"><X size={16} /></button></div><p>Test Vault’s failure handling without touching production data.</p><div className="simulation-options"><button><Wifi size={16} /><span><strong>Network partition</strong><small>Isolate a zone for 30 sec</small></span><ChevronDown size={14} /></button><button><HardDrive size={16} /><span><strong>Node failure</strong><small>Take one node offline</small></span><ChevronDown size={14} /></button><button><AlertTriangle size={16} /><span><strong>Corrupt replica</strong><small>Trigger integrity repair</small></span><ChevronDown size={14} /></button></div><button className="button button-primary full-button" onClick={() => setSimulationOpen(false)}><Play size={14} /> Start simulation</button></div>}
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon, label, value, trend, detail, tone, progress }: { icon: ReactNode; label: string; value: string; trend: string; detail: string; tone: string; progress?: boolean }) { return <div className="metric-card"><div className={`metric-icon ${tone}`}>{icon}</div><div className="metric-top"><span>{label}</span><span className={`metric-trend ${tone}`}>{trend}</span></div><div className="metric-value">{value}</div><div className="metric-detail">{detail}</div>{progress && <div className="metric-progress"><div className="progress-73" /></div>}</div>; }
function PanelHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) { return <div className="panel-header"><div><h2>{title}</h2><p>{subtitle}</p></div>{action}</div>; }
function HealthLine({ color, label, value }: { color: string; label: string; value: string }) { return <div className="health-line"><i className={`health-dot ${color}`} /><span>{label}</span><strong>{value}</strong></div>; }
function ZoneRow({ zone, state, nodes, latency }: { zone: string; state: string; nodes: string; latency: string }) { return <div className="zone-row"><span className="zone-name"><span className={`zone-status ${state === "Healthy" ? "green" : "amber"}`} />{zone}</span><span className={`state-text ${state === "Healthy" ? "healthy" : "degraded"}`}>{state}</span><span className="zone-nodes">{nodes} nodes</span><span className="zone-latency">{latency}</span></div>; }
function ObjectRow({ name, tag, size, replicas, integrity, updated, warning }: { name: string; tag: string; size: string; replicas: string; integrity: string; updated: string; warning?: boolean }) { return <div className="object-row"><span className="object-name"><span className="file-icon"><Cloud size={14} /></span><span><strong>{name}</strong><small>{tag}</small></span></span><span>{size}</span><span className={warning ? "warning-text" : ""}>{replicas}</span><span className={`integrity ${warning ? "repairing" : ""}`}><span>{warning ? <RefreshCw size={11} /> : <Check size={11} />}</span>{integrity}</span><span>{updated}</span><button className="row-more" aria-label={`More actions for ${name}`}><MoreHorizontal size={16} /></button></div>; }
function EventItem({ icon, tone, title, detail, time }: { icon: ReactNode; tone: string; title: string; detail: string; time: string }) { return <div className="event-item"><div className={`event-icon ${tone}`}>{icon}</div><div className="event-copy"><strong>{title}</strong><span>{detail}</span></div><time>{time}</time></div>; }
function TrafficChart() { const readPoints = "0,122 45,116 90,126 135,91 180,98 225,83 270,104 315,69 360,79 405,57 450,72 495,42 540,60 585,47 630,69 675,39 720,52 765,31 810,48 855,37 900,56 945,26 990,43"; const writePoints = "0,142 45,139 90,144 135,128 180,135 225,122 270,137 315,109 360,122 405,101 450,117 495,89 540,113 585,94 630,120 675,81 720,105 765,73 810,98 855,78 900,105 945,67 990,91"; return <div className="traffic-chart"><svg viewBox="0 0 990 170" preserveAspectRatio="none" role="img" aria-label="Read and write traffic chart"><defs><linearGradient id="readFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--chart-read)" stopOpacity=".18" /><stop offset="100%" stopColor="var(--chart-read)" stopOpacity="0" /></linearGradient></defs><path d={`M ${readPoints} L 990 170 L 0 170 Z`} fill="url(#readFill)" /><path d={`M ${readPoints}`} fill="none" stroke="var(--chart-read)" strokeWidth="2" vectorEffect="non-scaling-stroke" /><path d={`M ${writePoints}`} fill="none" stroke="var(--chart-write)" strokeWidth="2" vectorEffect="non-scaling-stroke" /><line x1="0" y1="42" x2="990" y2="42" stroke="var(--chart-grid)" strokeDasharray="3 5" /><line x1="0" y1="85" x2="990" y2="85" stroke="var(--chart-grid)" strokeDasharray="3 5" /><line x1="0" y1="128" x2="990" y2="128" stroke="var(--chart-grid)" strokeDasharray="3 5" /></svg></div>; }
