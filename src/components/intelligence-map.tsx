export function IntelligenceMap() {
  const nodes = [
    { x: 103, y: 83, label: "MATHEMATICS" },
    { x: 357, y: 73, label: "PROGRAMMING", red: true },
    { x: 418, y: 186, label: "SCIENCE" },
    { x: 389, y: 345, label: "DATA STRUCTURES" },
    { x: 99, y: 366, label: "ENGLISH" },
    { x: 46, y: 219, label: "LOGIC" },
  ];
  return <div className="intelligence-map" aria-label="CLIAS adaptive intelligence map connecting six learning subjects">
    <span className="map-title mono">INTELLIGENCE MAP / 01</span>
    <svg viewBox="0 0 510 445" role="img" aria-label="Adaptive core learning network">
      <circle cx="265" cy="229" r="165" className="map-orbit" strokeDasharray="4 8" />
      <circle cx="265" cy="229" r="121" className="map-orbit" />
      {nodes.map(node => <g key={node.label}><line x1="265" y1="229" x2={node.x} y2={node.y} className="map-line" /><circle cx={node.x} cy={node.y} r="21" className="map-node" /><circle cx={node.x} cy={node.y} r="4.8" className={node.red ? "map-dot-red" : "map-dot"} /><text x={node.x} y={node.y + 37} textAnchor="middle" className="map-label">{node.label}</text></g>)}
      <circle cx="265" cy="229" r="62" className="map-core" />
      <circle cx="265" cy="229" r="48" fill="none" className="map-line" strokeDasharray="2 3" style={{ stroke: "var(--primary)", opacity: 1 }} />
      <text x="265" y="224" textAnchor="middle" className="map-brand">CLIAS</text>
      <text x="265" y="247" textAnchor="middle" className="map-caption">ADAPTIVE CORE</text>
    </svg>
    <div className="velocity-mini"><div className="mini-head mono"><span>LEARNING VELOCITY</span><strong>+24%</strong></div><svg viewBox="0 0 220 80" aria-hidden="true"><path d="M0 69 L0 65 Q18 55 27 58 T48 45 T74 40 T97 34 T119 25 T145 21 T169 18 T191 10 T211 6 L220 10 L220 80 L0 80Z" fill="var(--chart-fill)"/><path d="M0 65 Q18 55 27 58 T48 45 T74 40 T97 34 T119 25 T145 21 T169 18 T191 10 T211 6 L220 10" className="trajectory-line" /></svg><div className="mini-foot mono"><span>MASTERY INDEX</span><strong>78.4</strong><span>▲ STABLE</span></div></div>
  </div>;
}