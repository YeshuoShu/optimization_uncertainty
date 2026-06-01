import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const uncertainties = [
  {
    id: "understanding",
    title: "Understanding",
    subtitle: "Are we solving the right problem?",
    tag: "Problem framing",
    icon: "?",
    short:
      "Uncertainty begins when the actual wildfire decision problem is only partially understood or framed too narrowly.",
    what:
      "The real problem may involve competing goals, unclear priorities, or different interpretations of what counts as a good solution.",
    wildfire:
      "Is the goal to minimize burned area, protect homes, reduce evacuation time, reduce suppression cost, or support ecological recovery?",
    lp:
      "A wrong understanding leads to the wrong objective function, wrong constraints, or wrong decision variables.",
    figureTitle: "Same wildfire system, different decision goals",
    figureText:
      "Burned area / homes protected / evacuation time / ecological recovery",
    accent: "amber"
  },
  {
    id: "abstraction",
    title: "Abstraction",
    subtitle: "What is simplified when reality becomes a model?",
    tag: "Representation",
    icon: "A",
    short:
      "Real wildfire systems are simplified into spatial units, time periods, scenarios, and model components.",
    what:
      "Fire spread, fuels, weather, terrain, human response, and institutions are reduced to a manageable analytical structure.",
    wildfire:
      "A dynamic fire landscape may be represented as discrete planning units and fixed time intervals.",
    lp:
      "The feasible region depends on how space, time, demand, and resources are abstracted.",
    figureTitle: "Real landscape → simplified planning units",
    figureText: "Continuous space / dynamic fire / uncertain behavior → grid / units / periods",
    accent: "teal"
  },
  {
    id: "model-specification",
    title: "Model Specification",
    subtitle: "Is the mathematical formulation correct?",
    tag: "Formulation",
    icon: "M",
    short:
      "Even with good data, the model can still be uncertain if the objective, constraints, or assumptions are misspecified.",
    what:
      "The formulation may omit important constraints, use the wrong objective, or express relationships too simply.",
    wildfire:
      "A fuel-treatment model may optimize where to treat vegetation but omit evacuation capacity or suppression logistics.",
    lp:
      "Specification uncertainty changes the objective function, constraints, decision variables, and feasible set.",
    figureTitle: "Description → flowchart → mathematical model",
    figureText: "Each translation can omit assumptions or relationships",
    accent: "blue"
  },
  {
    id: "attributes",
    title: "Attributes",
    subtitle: "Are the model inputs reliable?",
    tag: "Data inputs",
    icon: "D",
    short:
      "Input attributes may be measured, estimated, interpolated, outdated, sampled, or biased.",
    what:
      "Data values used as coefficients may contain measurement error, sampling bias, missingness, or uncertainty from preprocessing.",
    wildfire:
      "Fuel load, wind speed, population exposure, road capacity, suppression cost, and ignition probability may all contain error.",
    lp:
      "Attribute uncertainty changes coefficients, demand, costs, benefits, risks, and capacities.",
    figureTitle: "Data pipeline into optimization",
    figureText: "Remote sensing / census / mobility / weather / resource data",
    accent: "purple"
  },
  {
    id: "location",
    title: "Location",
    subtitle: "Where exactly are things located?",
    tag: "Position error",
    icon: "L",
    short:
      "Spatial positions can be uncertain because of GPS error, geocoding, projection, digitizing, aggregation, or simplification.",
    what:
      "Location uncertainty affects where demand, facilities, hazards, shelters, roads, and boundaries are represented.",
    wildfire:
      "Homes, ignition points, fuel breaks, shelters, roads, and fire perimeters may not be perfectly located.",
    lp:
      "Location error affects distance, coverage, exposure, accessibility, and assignment constraints.",
    figureTitle: "Map / original figure placeholder",
    figureText: "Replace this card with the original uncertainty figure if needed",
    accent: "red"
  },
  {
    id: "spatial-properties",
    title: "Spatial Properties",
    subtitle: "How are spatial relationships defined?",
    tag: "Distance & coverage",
    icon: "S",
    short:
      "Distance, adjacency, coverage, buffers, connectivity, and accessibility can be defined in different ways.",
    what:
      "Spatial relationships are not neutral: Euclidean distance, network travel time, buffers, and adjacency rules can imply different systems.",
    wildfire:
      "A community may appear covered by a fire station under straight-line distance but not under road-network travel time.",
    lp:
      "Coverage and accessibility constraints change when spatial properties are redefined.",
    figureTitle: "Euclidean distance vs. network distance",
    figureText: "Straight line may be short; actual road path may be long",
    accent: "green"
  },
  {
    id: "solution",
    title: "Solution",
    subtitle: "How trustworthy is the optimized result?",
    tag: "Solution quality",
    icon: "O",
    short:
      "A solution may be exact, near-optimal, heuristic, or sensitive to solver parameters and stopping rules.",
    what:
      "Large spatial optimization problems may end with an optimality gap or rely on heuristics without guaranteed solution quality.",
    wildfire:
      "Large fuel-treatment or suppression-allocation models may require decomposition, metaheuristics, or approximate algorithms.",
    lp:
      "Solution uncertainty affects whether the selected plan is optimal, near-optimal, or only practically feasible.",
    figureTitle: "Solution quality spectrum",
    figureText: "Trial-and-error → heuristic → near-optimal → exact optimum",
    accent: "orange"
  },
  {
    id: "implementation",
    title: "Implementation",
    subtitle: "Can the optimized plan actually be applied?",
    tag: "Real-world action",
    icon: "I",
    short:
      "Even an optimal model solution may change when implemented under budget, terrain, ownership, politics, or emergency constraints.",
    what:
      "Implementation may deviate from the model prescription, creating a gap between analytical optimum and operational reality.",
    wildfire:
      "A proposed fuel break may be blocked by land ownership, terrain, funding, public opposition, or field conditions.",
    lp:
      "The implemented solution may become infeasible, suboptimal, or different from the modeled optimum.",
    figureTitle: "Model prescription → field adaptation",
    figureText: "Optimization result / field constraints / modified implementation",
    accent: "slate"
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(null);

  const active = activeIndex >= 0 ? uncertainties[activeIndex] : null;
  const preview = hoverIndex !== null ? uncertainties[hoverIndex] : null;

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Home" || event.key.toLowerCase() === "h" || event.key === "Escape") {
        setActiveIndex(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current < 0) return 0;
          return Math.min(current + 1, uncertainties.length - 1);
        });
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current <= 0) return -1;
          return current - 1;
        });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="app-shell">
      <div className="presentation-frame">
        <Header active={active} onHome={() => setActiveIndex(-1)} />
        <section className="stage">
          {active ? (
            <DetailScreen
              item={active}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ) : (
            <FrameworkScreen
              preview={preview}
              setHoverIndex={setHoverIndex}
              setActiveIndex={setActiveIndex}
            />
          )}
        </section>
        <BottomNav activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
    </main>
  );
}

function Header({ active, onHome }) {
  return (
    <header className="header">
      <button className="brand" onClick={onHome} aria-label="Return to main framework">
        <span className="brand-mark">UF</span>
        <span>
          <strong>Uncertainty Chain in Wildfire Optimization</strong>
          <small>From location-analysis uncertainty to operational decision-making</small>
        </span>
      </button>
      <div className="header-actions">
        {active ? <span className="section-pill">Exploring: {active.title}</span> : <span className="section-pill">Main Framework</span>}
        <span className="key-hint">← / → navigate · H return</span>
      </div>
    </header>
  );
}

function FrameworkScreen({ preview, setHoverIndex, setActiveIndex }) {
  return (
    <div className="framework-layout">
      <div className="framework-main">
        <div className="eyebrow">Interactive framework</div>
        <h1>Uncertainty is a chain, not a single parameter.</h1>
        <p className="lead">
          Click any uncertainty source to zoom into its modeling implication, wildfire example, and LP connection.
        </p>

        <div className="chain-canvas" aria-label="Main uncertainty framework">
          <svg className="chain-lines" viewBox="0 0 960 500" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 160 92 C 290 92, 260 160, 390 160" />
            <path d="M 500 160 C 650 160, 630 92, 790 92" />
            <path d="M 790 132 C 790 210, 675 210, 675 282" />
            <path d="M 640 315 C 530 360, 410 360, 310 315" />
            <path d="M 275 282 C 275 210, 160 210, 160 132" />
            <path d="M 200 115 C 315 225, 500 275, 760 115" className="ghost" />
          </svg>

          {uncertainties.map((item, index) => (
            <button
              key={item.id}
              className={`node-card node-${index} accent-${item.accent}`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <span className="node-icon">{item.icon}</span>
              <span className="node-copy">
                <strong>{item.title}</strong>
                <small>{item.tag}</small>
              </span>
            </button>
          ))}

          <div className="center-orb">
            <span>Wildfire</span>
            <strong>Optimization under uncertainty</strong>
          </div>
        </div>
      </div>

      <aside className="insight-panel">
        <span className="panel-kicker">{preview ? preview.tag : "Core idea"}</span>
        <h2>{preview ? preview.title : "Main framework"}</h2>
        <p>
          {preview
            ? preview.short
            : "Uncertainty can emerge before, during, and after optimization: from how the problem is framed to how the final plan is implemented."}
        </p>
        <div className="panel-divider" />
        <div className="panel-mini-grid">
          <div>
            <strong>Show mode</strong>
            <span>Full-screen 16:9</span>
          </div>
          <div>
            <strong>Interaction</strong>
            <span>Click · hover · keyboard</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function DetailScreen({ item, activeIndex, setActiveIndex }) {
  const previous = activeIndex === 0 ? -1 : activeIndex - 1;
  const next = Math.min(activeIndex + 1, uncertainties.length - 1);

  return (
    <div className="detail-layout">
      <aside className="mini-framework">
        <button className="back-button" onClick={() => setActiveIndex(-1)}>← Back to Framework</button>
        <div className="mini-chain">
          {uncertainties.map((u, index) => (
            <button
              key={u.id}
              className={`mini-node ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <span>{index + 1}</span>
              <strong>{u.title}</strong>
            </button>
          ))}
        </div>
      </aside>

      <section className="detail-content">
        <div className={`detail-hero accent-${item.accent}`}>
          <span className="detail-index">0{activeIndex + 1}</span>
          <div>
            <span className="eyebrow">{item.tag}</span>
            <h1>{item.title} Uncertainty</h1>
            <p>{item.subtitle}</p>
          </div>
        </div>

        <div className="card-grid">
          <InfoCard title="What is uncertain?" body={item.what} />
          <InfoCard title="Wildfire example" body={item.wildfire} />
          <InfoCard title="LP / optimization connection" body={item.lp} />
        </div>

        <div className="detail-actions">
          <button onClick={() => setActiveIndex(previous)}>{previous < 0 ? "Framework" : "Previous"}</button>
          <button onClick={() => setActiveIndex(next)} disabled={activeIndex === uncertainties.length - 1}>Next</button>
        </div>
      </section>

      <aside className="visual-panel">
        <div className={`visual-card accent-${item.accent}`}>
          <div className="visual-placeholder">
            <div className="placeholder-grid" />
            <div className="placeholder-chip top-left" />
            <div className="placeholder-chip mid" />
            <div className="placeholder-chip bottom-right" />
          </div>
          <h3>{item.figureTitle}</h3>
          <p>{item.figureText}</p>
          <span className="replace-note">Figure placeholder · replace with original image if needed</span>
        </div>
      </aside>
    </div>
  );
}

function InfoCard({ title, body }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function BottomNav({ activeIndex, setActiveIndex }) {
  const progress = activeIndex < 0 ? 0 : ((activeIndex + 1) / uncertainties.length) * 100;

  return (
    <footer className="bottom-nav">
      <button className={`bottom-item ${activeIndex < 0 ? "active" : ""}`} onClick={() => setActiveIndex(-1)}>
        Framework
      </button>
      <div className="bottom-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="bottom-steps">
        {uncertainties.map((item, index) => (
          <button
            key={item.id}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            title={item.title}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
