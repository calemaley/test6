export type ArticleData = {
  title: string;
  hero: string;
  images?: { src: string; alt: string }[];
  body: string; // Markdown-ish: paragraphs separated by blank lines; headings start with `## `; lists by lines starting with `- `; blockquote with `> `
};

export const articleContent: Record<string, ArticleData> = {
  "hydropower-efficiency-myths": {
    title: "Hydropower Efficiency Myths",
    hero:
      "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F26030b0ca9dc4a3c80d4ccefc790ae20?format=webp&width=1600",
    images: [
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F414caa84c5044363b4c7fce15b7e06ce?format=webp&width=1200",
        alt: "Instrumentation at intake measuring head and flow",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F6b957c4173704ff1898339ceea8e3de3?format=webp&width=1200",
        alt: "Switchgear and control room for small hydro plant",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F2b1b88c0ec1e49b59512c7cf0729bd4e?format=webp&width=1200",
        alt: "Transformer radiator and power export bay",
      },
    ],
    body: `Hydropower is regularly described as \"90% efficient\", a neat number that survives far better in slides than in the field. The truth is more interesting—and more useful. Efficiency in hydro is a chain: water conveyance, turbine, generator, transformer, and auxiliary losses. Optimising one link while ignoring the rest often leads to disappointing yield.

## Myth 1: \"A turbine is a fixed 90% efficient machine\"
Turbines have efficiency curves, not constants. Francis and Kaplan machines can exceed 90% near their best efficiency point (BEP), but efficiency drops at part-load and high-load extremes. Head and discharge define where the BEP lies; seasonal rivers shift both. The practical lesson is to design for the head–flow histogram rather than a single design point. A plant operating 70% of the year at 70% efficiency may beat a \"peak\" design that performs brilliantly only a few weeks.

- Measure seasonal flow rigorously (ADCP, weirs, or calibrated flumes) for at least one hydrological year.
- Use manufacturer curves and adjust for site Reynold’s number, surface finish, and expected fouling.
- Model dispatch scenarios including minimum environmental flows and irrigation abstractions.

## Myth 2: \"Electrical losses are negligible\"
Water-to-wire guarantees frequently hide electrical penalties. Generator copper and iron losses, transformer stray and load losses, cable I²R and dielectric losses, and inverter losses (for variable-speed) all add up. IEC 60034 and IEEE 112 test methods make these losses visible. In many micro-hydro plants we audit, uprating cable cross-section or shortening LV runs recovers 1–2% yield immediately—often cheaper than any turbine upgrade.

## Myth 3: \"Sediment only hurts mechanical wear\"
Sediment changes hydraulics today and capex tomorrow. Abrasive particles erode runner blades, guide vanes and seal faces, shifting the efficiency curve down and to the left. More subtly, settled silt elevates approach losses and changes intake behaviour, forcing operators to run at off-design openings. Good desanding saves opex, yes—but it also preserves head and thus annual energy. Designs using swirl concentrators, adequate flushing velocity (>1 m/s), and periodic dredging pay for themselves.

## Myth 4: \"Cavitation is rare at our head\"
Cavitation depends on Net Positive Suction Head available (NPSHa), water temperature, and dynamic pressure fluctuations. Poor draft tube submergence or sudden load changes can trigger cavitation even at moderate heads. The consequences—pitted blades and vibration—reduce efficiency and availability. Modern governors with ramped set-points and condition monitoring (acoustic or vibration) help operators stay within safe envelopes.

## From nameplate to reality: capacity factor matters more
An 800 kW unit at 92% peak efficiency but 35% capacity factor will deliver less energy than a 700 kW unit at 90% peak and 55% capacity factor. Energy, not peak efficiency, pays the bills. Proper trash rack design, reliable access roads, spare-part strategy, and robust protection schemes often shift capacity factor more than chasing a few tenths of a percent in runner polish.

## What to measure (and keep measuring)
- Head at intake and at the turbine nozzle/draft tube, not just survey head.
- Flow (ultrasonic, magnetic, or differential head) with data logged at 1–5 min intervals.
- Generator stator temperature, bearing temperatures and vibration trends.
- Specific energy (kWh per m³) as the clearest KPI for water-to-wire performance.

## Digital twins without the buzzwords
A simple model—\nQ(H), efficiency curves, and loss constants—updated monthly with measured data is enough to flag drift. When specific energy falls outside expected bands, we check trash, desander performance, or runner fouling. This pragmatic \"twin\" typically yields 3–6% energy improvement in the first year.

> Takeaway: design for the river you actually have, protect the hydraulic chain, and use specific energy as your north star.

## Compliance and safety
Hydro plants are electrical installations first and hydraulic installations second. Apply IEC 60364 for LV distribution, IEC 60076 for transformers, and utility interconnection codes. Proper earthing, surge protection, and discrimination analysis improve both efficiency and safety by reducing nuisance trips and unplanned islanding.

## A short field case
At a 1.4 MW run-of-river scheme, annual generation lagged the feasibility study by 11%. A one-week diagnostic revealed: trash rack head loss of 0.25 m due to fouling, LV cable runs exceeding design length, and a worn guide-vane bushing causing poor part‑load efficiency. Actions: hot‑dip galvanised self‑cleaning racks, relocated transformer to reduce LV runs by 70 m, and bushing replacement during low‑flow season. Result: +8.7% annual energy, with no turbine upgrade.

Hydropower remains one of the most efficient and longest‑lived assets in a grid. The end of the myth is not the end of ambition—it is the start of disciplined, measurable improvement.`,
  },

  "mv-substation-safety-checklist": {
    title: "MV Substation Safety Checklist",
    hero:
      "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ff47a7bf5adbd493c9f9e3c0b45b62350?format=webp&width=1600",
    images: [
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F7a66a45c58894b108206c9848ebc380e?format=webp&width=1200",
        alt: "Switchyard aisle and interlocked panels",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F6c7cb251f7214f2cb75fdc7208b57527?format=webp&width=1200",
        alt: "Battery bank and DC supply for protection",
      },
    ],
    body: `Operating a medium‑voltage (MV) substation is a life‑critical activity. Most incidents stem from bypassed processes, unclear limits of responsibility, or poor documentation. This checklist condenses IEC/IEEE good practice and what our field teams enforce every day.

## 1) People and permits
- Written switching programme approved by an authorised person.
- Single‑line diagram at the point of work with the exact configuration.
- Lockout‑Tagout (LOTO) applied to all isolation points; keys controlled.
- Confirm training currency for switching staff and rescue procedures.

## 2) Personal protective equipment (PPE)
Arc‑rated clothing, visor or hood, insulated gloves, hearing protection, and safety footwear sized to the risk assessment. Arc‑flash boundaries should be calculated (IEEE 1584 or local equivalent) and marked on the floor.

## 3) Prove dead—every time
- Test the tester on a known live source.
- Prove dead on the conductors to be worked on.
- Re‑test the tester. Only then apply portable earths using approved sticks.

## 4) Interlocks and keys
Do not defeat interlocks. If a door or racking mechanism resists—investigate. Spring‑charged mechanisms store hazardous energy; follow OEM procedures for discharge and inspection.

## 5) Earthing and bonding
Measure substation earth resistance periodically and after major works. Low resistance is not sufficient if the potential rise exceeds touch/step limits; design must satisfy IEC 61936 and IEEE 80 criteria. Bond all metallic services entering the room; ensure continuity back to the earth bar.

## 6) DC systems and protection
- Maintain dual redundant DC supplies for relays and tripping coils.
- Label every relay setting group and keep a copy in the control room and DMS.
- Secondary‑injection tests should verify pickup, time‑current curves, directionality, and intertripping logic. Record results for trend analysis.

## 7) Switchgear inspection
- Look for tracking marks, corrosion, loose terminations, and SF6 pressure alarms.
- Thermal scanning at load identifies high‑resistance joints long before failure.
- Verify breaker operation counters and mechanism lubrication dates.

## 8) Housekeeping
Clear escape routes, posted emergency numbers, and spill kits for oil‑filled equipment. Store nothing on top of panels. Keep the floor dry.

## 9) After the job
- Restore normal settings; remove portable earthing; retrieve all locks and tags.
- Update the single‑line diagram if configuration changed.
- Debrief: what surprised the team? What needs to change in the procedure?

> Safety is a process problem more than a bravery problem. If a safe step is hard to do, redesign the step until it is the easiest path.

## Records to keep
- Switching programme and permits.
- Relay test sheets and firmware versions.
- Transformer oil test reports (DGA, moisture, dielectric strength).
- Earth‑grid test results and touch/step calculations.

A substation that is tidy, labelled, and documented is almost always a substation that is safe.`,
  },

  "why-sollatek-for-hospitals": {
    title: "Why Sollatek for Hospitals",
    hero:
      "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F5c46dc89d3bb4f65b8445181cacde1b5?format=webp&width=1600",
    images: [
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F936f355a4fb64bf59bbfced5485ee29d?format=webp&width=1200",
        alt: "Stabilized supply panel for critical loads",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ffd21507c4b9949ada67b459860dc124a?format=webp&width=1200",
        alt: "Receiving and inspection of power equipment",
      },
    ],
    body: `Few environments are as unforgiving to power quality as hospitals. Imaging suites, theatres, laboratories, and ICU beds demand voltage that stays inside tight windows and a supply that rides through disturbances gracefully. Sollatek’s stabilisers and protection ecosystem exist for exactly this edge.

## The problem we are solving
Public grids in many regions exhibit sags, swells, brownouts, phase loss, and frequent switching transients. Diesel generators introduce their own artefacts: frequency drift, voltage droop during large step loads, and poor power factor at light load. The cost is hidden in aborted procedures, mis‑calibrated laboratory results, and shortened equipment life.

## Why voltage stabilisation matters
Most medical equipment specifies ±10% voltage tolerance; some, like CT tubes or MRI cryo systems, require tighter bands. Sollatek AVR technology uses tap‑changing autotransformers with microprocessor control to maintain output within narrow limits even during rapid input fluctuations. With proper sizing and bypass arrangements, sensitive loads ride through events that would previously trip them offline.

## Layered protection is not optional
- Surge protection at service entrance and sub‑distribution to clamp lightning and switching surges.
- Under/over‑voltage cut‑off devices for non‑critical outlets.
- Isolation transformers for theatres to reduce leakage and improve noise immunity.
- UPS for IT systems and for the control electronics of larger machinery.

## Integration with generators and solar
Hospitals frequently operate in islanded mode. Stabilisation complements generator AVR, not replaces it. For hybrid systems with PV and storage, Sollatek devices coordinate with inverter ride‑through settings and transfer switches to avoid nuisance trips during transitions.

## Reliability engineering for clinical uptime
Mean time between failures (MTBF) rises when the electrical environment is steady. Real‑world audits show reductions in call‑outs for imaging equipment after stabiliser installation, because x‑ray generators and power supplies no longer operate at their limits. Extend this effect across a campus and the economics are compelling.

## Implementation blueprint
- Survey and categorise loads: life‑safety, clinical critical, clinical essential, and non‑essential.
- Map supply paths from transformer to outlet; decide stabilisation at panel level or point‑of‑use.
- Provide maintenance bypasses and remote monitoring. Trend sags/swells, tap operations, and temperature.

> In healthcare, power quality is patient quality. Stabilisation is a clinical risk‑reduction measure, not merely an electrical accessory.

## Results you can expect
Sites adopting layered protection typically report fewer aborted scans, quicker restarts after generator transfers, and longer service intervals for expensive equipment. In a 400‑bed hospital we support, nuisance trips in theatres dropped to near zero after a staged rollout of stabilisers and SPDs across three MDBs and seven critical sub‑boards.

Hospitals are systems of systems. Sollatek gives biomedical teams electrical headroom so clinicians can keep theirs.`,
  },

  "grid-scale-storage-trends": {
    title: "Grid-Scale Storage Trends",
    hero:
      "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F94178c8799bc47caa658405943f0bf61?format=webp&width=1600",
    images: [
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F157dcabbbb8548fea2349ce0cd36f960?format=webp&width=1200",
        alt: "Substation where storage connects to grid",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F41cf144db0c04ec085ea6ce20c2565d7?format=webp&width=1200",
        alt: "Power transformer and busbars",
      },
    ],
    body: `Grid storage is moving from \"nice to have\" to \"must‑have\" as variable renewables scale. The market is no longer about a single technology but portfolios tailored to applications and regulations.

## Lithium iron phosphate (LFP) dominance
LFP leads utility procurement due to cost, cycle life, and safety headroom. Module and rack designs now integrate liquid cooling, improving throughput at high C‑rates. NFPA 855 and IEC 62933 compliance drive enclosure spacing, gas detection, and emergency venting—design factors that must be captured early in site planning.

## Alternatives rising
- Sodium‑ion: promising cost and cold‑temperature behaviour; energy density lower but adequate for stationary assets.
- Flow batteries (vanadium, zinc‑bromine): decouple energy from power, enabling 4–12 h duration with minimal degradation from deep cycling.
- Compressed‑air and pumped storage: regain attention for long‑duration storage (LDES), often paired with renewables for firm capacity.

## Where value is created
Revenue stacking is the rule: day‑ahead arbitrage, frequency containment and regulation, fast reserve, black‑start, capacity payments, and distribution deferral. The control layer (EMS) determines how much of this stack a site can capture. Open protocols, accurate SOC estimation, and warranty‑aware dispatch are the differentiators.

## Integration with the grid
Grid codes require ride‑through, voltage control, and synthetic inertia behaviour. Harmonic performance and short‑circuit current contributions must be studied. Protection settings differ from synchronous plants; directional elements and rate‑of‑change‑of‑frequency (ROCOF) protections need careful coordination to avoid nuisance trips during islanding events.

## Safety and siting
- Follow UL 9540A or equivalent fire‑testing data for layout.
- Provide adequate separation, firewalls, and emergency access.
- Gas detection interlocks with HVAC; plan fail‑safe states for loss of power to safety systems.

## A pragmatic procurement checklist
- Bankable warranty with throughput limits aligned to revenue model.
- Supplier monitoring portal with data export and API access.
- Spares and response SLAs that match regulatory penalties for downtime.

> The most bankable storage project is the one whose controls are legible to operators and lenders. Simple, observable rules beat opaque magic.

Storage is becoming another standard grid asset. As costs fall and standards mature, expect portfolios mixing fast lithium for ancillary services with long‑duration assets for firm energy—managed by EMS platforms that speak the same language as the grid.`,
  },
};
