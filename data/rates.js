window.BOQ_DATA = {
  company: {
    name: "Al Qaswaa Al Sharqia Trading Est",
    contactPerson: "Imran Khoje",
    position: "Business development manager",
    phone1: "+966511759092",
    phone2: "+966573524746",
    email: "info@qaswasharqia.com",
    cr: "7043569552",
    vat: "302125297400003",
    experienceNote: "Our team supports estimation, procurement coordination, subcontractor alignment, execution planning, and delivery support for industrial, commercial, residential, and turnkey construction projects."
  },
  countries: {
    saudi: { label: "Saudi Arabia", standard: "SBC", currency: "SAR", benchmark: { residential: 7000, apartments: 8500, commercial: 9000, mixed_use: 9500, industrial: 8000, hospitality: 12000, healthcare: 11500 }, prelimPct: 0.1, profitPct: 0.1, contingencyPct: 0.05 },
    uae: { label: "UAE", standard: "Dubai Municipality", currency: "AED", benchmark: { residential: 5200, apartments: 5500, commercial: 6100, mixed_use: 6400, industrial: 4000, hospitality: 7000, healthcare: 7200 }, prelimPct: 0.12, profitPct: 0.1, contingencyPct: 0.05 },
    uk: { label: "UK", standard: "NRM", currency: "GBP", benchmark: { residential: 3200, apartments: 3800, commercial: 4300, mixed_use: 4200, industrial: 2500, hospitality: 4500, healthcare: 5000 }, prelimPct: 0.12, profitPct: 0.095, contingencyPct: 0.05 },
    usa: { label: "USA", standard: "CSI MasterFormat", currency: "USD", benchmark: { residential: 2400, apartments: 2800, commercial: 3000, mixed_use: 3200, industrial: 1700, hospitality: 3800, healthcare: 4200 }, prelimPct: 0.11, profitPct: 0.095, contingencyPct: 0.05 },
    india: { label: "India", standard: "CPWD / IS Codes", currency: "INR", benchmark: { residential: 24000, apartments: 28000, commercial: 32000, mixed_use: 34000, industrial: 18000, hospitality: 36000, healthcare: 42000 }, prelimPct: 0.1, profitPct: 0.09, contingencyPct: 0.05 },
    australia: { label: "Australia", standard: "Australian Standards", currency: "AUD", benchmark: { residential: 3200, apartments: 3800, commercial: 4800, mixed_use: 4600, industrial: 2600, hospitality: 5200, healthcare: 6200 }, prelimPct: 0.125, profitPct: 0.105, contingencyPct: 0.05 }
  },
  projectTypes: {
    residential: { label: "Residential (Villas)", note: "Villa projects prioritize finishes, openings, external works, and standard residential MEP.", roomTemplate: [{ name: "Living Room", qty: 1, length: 6, width: 5, height: 3.2 }, { name: "Bedroom", qty: 3, length: 4.5, width: 4, height: 3.2 }, { name: "Kitchen", qty: 1, length: 4, width: 3.5, height: 3.2 }, { name: "Bathroom", qty: 3, length: 2.4, width: 2, height: 3 }, { name: "Corridor", qty: 1, length: 6, width: 2, height: 3.2 }] },
    apartments: { label: "Apartments (Low / High Rise)", note: "Apartment projects increase vertical structure, facade, common areas, and apartment MEP density.", roomTemplate: [{ name: "Apartment Unit", qty: 4, length: 10, width: 8, height: 3.1 }, { name: "Corridor", qty: 1, length: 18, width: 2.2, height: 3.1 }, { name: "Service Room", qty: 1, length: 4, width: 3, height: 3.1 }] },
    commercial: { label: "Commercial (Offices, Retail)", note: "Commercial buildings raise HVAC, electrical, fire alarm, facade, and flexible fit-out requirements.", roomTemplate: [{ name: "Open Office", qty: 2, length: 12, width: 9, height: 3.6 }, { name: "Meeting Room", qty: 4, length: 5, width: 4, height: 3.4 }, { name: "Retail Zone", qty: 1, length: 14, width: 10, height: 4 }] },
    mixed_use: { label: "Mixed-Use Developments", note: "Mixed-use assets blend retail, residential, lobby, circulation, and higher coordination demands.", roomTemplate: [{ name: "Retail Unit", qty: 2, length: 10, width: 8, height: 4 }, { name: "Residential Unit", qty: 4, length: 9, width: 8, height: 3.2 }, { name: "Lobby", qty: 1, length: 10, width: 6, height: 4 }] },
    industrial: { label: "Industrial (Warehouses, Factories)", note: "Industrial assets prioritize steel, heavy foundations, yards, process zones, and specialist systems.", roomTemplate: [{ name: "Warehouse Bay", qty: 1, length: 30, width: 20, height: 8 }, { name: "Office Block", qty: 1, length: 12, width: 8, height: 3.6 }, { name: "Service Room", qty: 2, length: 5, width: 4, height: 3.6 }] },
    hospitality: { label: "Hospitality (Hotels)", note: "Hospitality raises premium finishes, guestrooms, hot water, and public-area MEP intensity.", roomTemplate: [{ name: "Guest Room", qty: 8, length: 6, width: 4.5, height: 3.2 }, { name: "Corridor", qty: 1, length: 24, width: 2.2, height: 3.2 }, { name: "Service Area", qty: 2, length: 5, width: 4, height: 3.2 }] },
    healthcare: { label: "Healthcare (Clinics, Hospitals)", note: "Healthcare raises filtration HVAC, medical gas, resilient finishes, and compliance-heavy MEP packages.", roomTemplate: [{ name: "Consultation Room", qty: 6, length: 5, width: 4, height: 3.4 }, { name: "Treatment Room", qty: 4, length: 6, width: 5, height: 3.4 }, { name: "Nurse Station", qty: 1, length: 7, width: 5, height: 3.4 }] }
  },
  finishFactors: { economy: 0.88, standard: 1, premium: 1.18 },
  scopeLibrary: {
    preconstruction: {
      name: "Pre-construction",
      description: "Enabling works, earthworks, and setting-out packages.",
      subScopes: [
        { id: "site_clearance", name: "Site Clearance", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.95, weight: 0.008, materials: [{ name: "Debris hauling", unit: "m3", factor: 0.04 }, { name: "Clearing consumables", unit: "item", factor: 0.002 }] },
        { id: "surveying", name: "Surveying & Setting Out", unit: "item", qtyMode: "floorCount", qtyFactor: 1, weight: 0.005, materials: [{ name: "Survey markers", unit: "set", factor: 0.35 }, { name: "Layout accessories", unit: "item", factor: 0.25 }] },
        { id: "excavation", name: "Excavation", unit: "m3", qtyMode: "grossArea", qtyFactor: 0.16, weight: 0.012, materials: [{ name: "Excavation volume", unit: "m3", factor: 1 }, { name: "Shoring materials", unit: "m2", factor: 0.22 }] },
        { id: "backfilling", name: "Backfilling & Compaction", unit: "m3", qtyMode: "grossArea", qtyFactor: 0.1, weight: 0.01, materials: [{ name: "Backfill material", unit: "m3", factor: 1 }, { name: "Compaction water", unit: "L", factor: 55 }] }
      ]
    },
    substructure: {
      name: "Substructure",
      description: "Foundations, footings, blinding, and below-grade protection.",
      subScopes: [
        { id: "blinding", name: "Blinding Concrete", unit: "m3", qtyMode: "grossArea", qtyFactor: 0.025, weight: 0.012, materials: [{ name: "Cement", unit: "bags", factor: 7.2 }, { name: "Sand", unit: "m3", factor: 0.45 }, { name: "Aggregate", unit: "m3", factor: 0.9 }] },
        { id: "footings", name: "Footings", unit: "m3", qtyMode: "grossArea", qtyFactor: 0.075, weight: 0.026, materials: [{ name: "Cement", unit: "bags", factor: 8.5 }, { name: "Sand", unit: "m3", factor: 0.42 }, { name: "Aggregate", unit: "m3", factor: 0.84 }, { name: "Reinforcement steel", unit: "kg", factor: 95 }, { name: "Binding wire", unit: "kg", factor: 1.6 }] },
        { id: "foundations", name: "Foundation Walls / Raft", unit: "m3", qtyMode: "grossArea", qtyFactor: 0.085, weight: 0.03, materials: [{ name: "Cement", unit: "bags", factor: 8.8 }, { name: "Sand", unit: "m3", factor: 0.43 }, { name: "Aggregate", unit: "m3", factor: 0.86 }, { name: "Reinforcement steel", unit: "kg", factor: 110 }, { name: "Waterproofing chemicals", unit: "L", factor: 6 }] },
        { id: "substructure_waterproofing", name: "Substructure Waterproofing", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.24, weight: 0.012, materials: [{ name: "Bituminous membrane", unit: "m2", factor: 1.05 }, { name: "Primer", unit: "L", factor: 0.28 }, { name: "Protection board", unit: "m2", factor: 1.02 }] }
      ]
    },
    superstructure: {
      name: "Superstructure",
      description: "Structural frame, suspended slabs, columns, beams, and formwork.",
      subScopes: [
        { id: "columns", name: "Columns", unit: "m3", qtyMode: "grossArea", qtyFactor: 0.045, weight: 0.022, materials: [{ name: "Concrete materials", unit: "m3", factor: 1 }, { name: "Steel reinforcement", unit: "kg", factor: 145 }, { name: "Formwork plywood", unit: "m2", factor: 5.2 }, { name: "Binding wire", unit: "kg", factor: 2.1 }] },
        { id: "beams", name: "Beams", unit: "m3", qtyMode: "grossArea", qtyFactor: 0.055, weight: 0.024, materials: [{ name: "Concrete materials", unit: "m3", factor: 1 }, { name: "Steel reinforcement", unit: "kg", factor: 170 }, { name: "Formwork materials", unit: "m2", factor: 5.8 }, { name: "Binding wire", unit: "kg", factor: 2.3 }] },
        { id: "slabs", name: "Suspended Slabs", unit: "m3", qtyMode: "grossArea", qtyFactor: 0.11, weight: 0.034, materials: [{ name: "Concrete materials", unit: "m3", factor: 1 }, { name: "Steel reinforcement", unit: "kg", factor: 120 }, { name: "Plywood / deck formwork", unit: "m2", factor: 7.8 }, { name: "Steel props", unit: "nr", factor: 1.1 }] },
        { id: "stairs", name: "Stairs & Landings", unit: "item", qtyMode: "floorCount", qtyFactor: 1, weight: 0.009, materials: [{ name: "Concrete materials", unit: "m3", factor: 2.4 }, { name: "Steel reinforcement", unit: "kg", factor: 260 }, { name: "Formwork materials", unit: "m2", factor: 18 }] }
      ]
    },
    masonry: {
      name: "Masonry",
      description: "Blockwork, brickwork, lintels, and mortar-based walling works.",
      subScopes: [
        { id: "blockwork_external", name: "External Blockwork", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.42, weight: 0.022, materials: [{ name: "Blocks", unit: "nos", factor: 12.5 }, { name: "Cement", unit: "bags", factor: 0.22 }, { name: "Sand", unit: "m3", factor: 0.03 }] },
        { id: "blockwork_internal", name: "Internal Blockwork", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.58, weight: 0.026, materials: [{ name: "Blocks", unit: "nos", factor: 12 }, { name: "Cement", unit: "bags", factor: 0.2 }, { name: "Sand", unit: "m3", factor: 0.028 }] },
        { id: "lintels", name: "Lintels", unit: "m", qtyMode: "grossArea", qtyFactor: 0.18, weight: 0.008, materials: [{ name: "Concrete materials", unit: "m3", factor: 0.08 }, { name: "Reinforcement steel", unit: "kg", factor: 7 }] }
      ]
    },
    finishes: {
      name: "Finishes",
      description: "Plaster, paint, tiling, marble, adhesives, and grout items.",
      subScopes: [
        { id: "plastering", name: "Internal & External Plaster", unit: "m2", qtyMode: "grossArea", qtyFactor: 1.8, weight: 0.03, materials: [{ name: "Cement", unit: "bags", factor: 0.18 }, { name: "Sand", unit: "m3", factor: 0.026 }, { name: "Water", unit: "L", factor: 6 }] },
        { id: "painting", name: "Painting System", unit: "m2", qtyMode: "grossArea", qtyFactor: 1.7, weight: 0.024, materials: [{ name: "Primer", unit: "L", factor: 0.08 }, { name: "Paint", unit: "L", factor: 0.16 }, { name: "Putty", unit: "kg", factor: 0.22 }] },
        { id: "floor_tiling", name: "Floor Tiling", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.9, weight: 0.032, materials: [{ name: "Tiles", unit: "m2", factor: 1.05 }, { name: "Tile adhesive", unit: "bag", factor: 0.18 }, { name: "Grout", unit: "kg", factor: 0.22 }] },
        { id: "marble", name: "Marble / Stone Finishes", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.16, weight: 0.02, materials: [{ name: "Marble slabs", unit: "m2", factor: 1.06 }, { name: "Stone adhesive", unit: "bag", factor: 0.2 }, { name: "Sealer", unit: "L", factor: 0.08 }] }
      ]
    },
    openings: {
      name: "Doors & Windows",
      description: "Aluminum systems, glazing, and hardware packages.",
      subScopes: [
        { id: "aluminium_windows", name: "Aluminium Windows", unit: "nr", qtyMode: "grossArea", qtyFactor: 0.03, weight: 0.02, materials: [{ name: "Aluminum profiles", unit: "kg", factor: 26 }, { name: "Glass panels", unit: "m2", factor: 4.5 }, { name: "Hardware fittings", unit: "set", factor: 1 }] },
        { id: "doors", name: "Doors & Frames", unit: "nr", qtyMode: "grossArea", qtyFactor: 0.028, weight: 0.022, materials: [{ name: "Door leaf", unit: "nr", factor: 1 }, { name: "Frame set", unit: "set", factor: 1 }, { name: "Ironmongery", unit: "set", factor: 1 }] },
        { id: "glass_doors", name: "Glass / Automatic Doors", unit: "nr", qtyMode: "grossArea", qtyFactor: 0.006, weight: 0.012, materials: [{ name: "Tempered glass", unit: "m2", factor: 5 }, { name: "Door rails", unit: "set", factor: 1 }, { name: "Automation fittings", unit: "set", factor: 1 }] }
      ]
    },
    facade: {
      name: "Facade",
      description: "Curtain wall, ACP cladding, and support framing packages.",
      subScopes: [
        { id: "curtain_wall", name: "Curtain Wall", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.16, weight: 0.03, onlyFor: ["commercial", "mixed_use", "hospitality", "healthcare"] , materials: [{ name: "Curtain wall framing", unit: "kg", factor: 14 }, { name: "Glass panels", unit: "m2", factor: 1.05 }, { name: "Gaskets and sealants", unit: "kg", factor: 0.35 }] },
        { id: "acp_cladding", name: "ACP / Cladding", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.28, weight: 0.02, materials: [{ name: "ACP panels", unit: "m2", factor: 1.08 }, { name: "Aluminum supports", unit: "kg", factor: 6 }, { name: "Anchors", unit: "nr", factor: 4 }] },
        { id: "facade_support", name: "Facade Structural Supports", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.24, weight: 0.012, materials: [{ name: "Support brackets", unit: "nr", factor: 3.4 }, { name: "Galvanized steel", unit: "kg", factor: 4.2 }] }
      ]
    },
    external: {
      name: "External Works",
      description: "Roads, paving, kerbs, drainage, and landscape hardscape items.",
      subScopes: [
        { id: "asphalt_road", name: "Asphalt Road Works", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.18, weight: 0.014, materials: [{ name: "Asphalt", unit: "ton", factor: 0.12 }, { name: "Basecourse", unit: "m3", factor: 0.08 }] },
        { id: "interlock", name: "Interlock / Paving", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.16, weight: 0.014, materials: [{ name: "Interlock tiles", unit: "m2", factor: 1.05 }, { name: "Bedding sand", unit: "m3", factor: 0.04 }] },
        { id: "kerbs", name: "Kerbs & Edging", unit: "m", qtyMode: "grossArea", qtyFactor: 0.12, weight: 0.008, materials: [{ name: "Concrete kerbs", unit: "m", factor: 1 }, { name: "Mortar", unit: "kg", factor: 2.5 }] },
        { id: "drainage", name: "Drainage Network", unit: "m", qtyMode: "grossArea", qtyFactor: 0.16, weight: 0.014, materials: [{ name: "Drainage pipes", unit: "m", factor: 1 }, { name: "Catch basins", unit: "nr", factor: 0.08 }] }
      ]
    },
    mep: {
      name: "MEP",
      description: "Electrical, plumbing, HVAC, firefighting, and specialist services.",
      subScopes: [
        { id: "electrical_firstfix", name: "Electrical First Fix", unit: "m2", qtyMode: "grossArea", qtyFactor: 1, weight: 0.035, materials: [{ name: "Cables", unit: "m", factor: 8.5 }, { name: "Conduits", unit: "m", factor: 5.4 }, { name: "Junction boxes", unit: "nr", factor: 0.18 }] },
        { id: "electrical_secondfix", name: "Electrical Second Fix", unit: "m2", qtyMode: "grossArea", qtyFactor: 1, weight: 0.025, materials: [{ name: "Switches", unit: "nr", factor: 0.18 }, { name: "Socket outlets", unit: "nr", factor: 0.16 }, { name: "DB panels", unit: "nr", factor: 0.01 }] },
        { id: "plumbing", name: "Plumbing Systems", unit: "m2", qtyMode: "grossArea", qtyFactor: 1, weight: 0.03, materials: [{ name: "Pipes", unit: "m", factor: 3.8 }, { name: "Fittings", unit: "nr", factor: 0.42 }, { name: "Fixtures", unit: "nr", factor: 0.04 }] },
        { id: "hvac", name: "HVAC Systems", unit: "m2", qtyMode: "grossArea", qtyFactor: 1, weight: 0.04, materials: [{ name: "Ducting", unit: "m2", factor: 0.62 }, { name: "Insulation", unit: "m2", factor: 0.62 }, { name: "Indoor / outdoor units", unit: "nr", factor: 0.012 }] },
        { id: "firefighting", name: "Firefighting Systems", unit: "m2", qtyMode: "grossArea", qtyFactor: 1, weight: 0.02, materials: [{ name: "Sprinklers", unit: "nr", factor: 0.06 }, { name: "Fire pipes", unit: "m", factor: 1.1 }, { name: "Fire pump sets", unit: "nr", factor: 0.003 }] },
        { id: "medical_gas", name: "Medical Gas Systems", unit: "m2", qtyMode: "grossArea", qtyFactor: 1, weight: 0.018, onlyFor: ["healthcare"], materials: [{ name: "Medical gas copper pipe", unit: "m", factor: 1.25 }, { name: "Outlets", unit: "nr", factor: 0.035 }, { name: "Zone valve boxes", unit: "nr", factor: 0.005 }] }
      ]
    },
    industrial: {
      name: "Industrial Systems",
      description: "PEB, heavy foundations, crane bases, and industrial specialist items.",
      subScopes: [
        { id: "peb_structure", name: "PEB Structural Steel", unit: "ton", qtyMode: "grossArea", qtyFactor: 0.026, weight: 0.055, onlyFor: ["industrial"], materials: [{ name: "Structural steel", unit: "kg", factor: 1000 }, { name: "Bolts", unit: "kg", factor: 24 }, { name: "Paint system", unit: "L", factor: 12 }] },
        { id: "heavy_foundations", name: "Heavy Foundations", unit: "m3", qtyMode: "grossArea", qtyFactor: 0.06, weight: 0.03, onlyFor: ["industrial"], materials: [{ name: "Concrete materials", unit: "m3", factor: 1 }, { name: "Reinforcement steel", unit: "kg", factor: 135 }, { name: "Anchor bolts", unit: "set", factor: 0.4 }] },
        { id: "industrial_slab", name: "Industrial Slab / Hardstand", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.5, weight: 0.024, onlyFor: ["industrial"], materials: [{ name: "Concrete materials", unit: "m3", factor: 0.18 }, { name: "Steel mesh", unit: "m2", factor: 1 }, { name: "Dry shake hardener", unit: "kg", factor: 4 }] }
      ]
    },
    solar: {
      name: "Solar Systems",
      description: "PV package, supports, cabling, and inverter systems.",
      subScopes: [
        { id: "panels", name: "Solar Panels", unit: "kWp", qtyMode: "grossArea", qtyFactor: 0.02, weight: 0.012, materials: [{ name: "Solar panels", unit: "nr", factor: 2.2 }] },
        { id: "inverters", name: "Inverters", unit: "kWp", qtyMode: "grossArea", qtyFactor: 0.02, weight: 0.008, materials: [{ name: "Inverters", unit: "nr", factor: 0.08 }] },
        { id: "mounting", name: "Mounting Structures", unit: "kWp", qtyMode: "grossArea", qtyFactor: 0.02, weight: 0.006, materials: [{ name: "Mounting structures", unit: "kg", factor: 34 }] },
        { id: "solar_cabling", name: "Solar Cabling", unit: "kWp", qtyMode: "grossArea", qtyFactor: 0.02, weight: 0.004, materials: [{ name: "Solar DC cable", unit: "m", factor: 22 }, { name: "MC4 connectors", unit: "pair", factor: 2.5 }] }
      ]
    },
    fitout: {
      name: "Interior Fit-out",
      description: "Partitions, ceilings, flooring, and specialist fit-out elements.",
      subScopes: [
        { id: "gypsum_partitions", name: "Gypsum Partitions", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.42, weight: 0.018, materials: [{ name: "Gypsum boards", unit: "m2", factor: 2.1 }, { name: "Metal studs", unit: "m", factor: 2.8 }, { name: "Jointing compound", unit: "kg", factor: 0.35 }] },
        { id: "ceiling", name: "Ceiling System", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.7, weight: 0.02, materials: [{ name: "Gypsum boards", unit: "m2", factor: 1.05 }, { name: "Ceiling frames", unit: "m2", factor: 1 }, { name: "Hangers", unit: "nr", factor: 1.8 }] },
        { id: "flooring", name: "Specialist Flooring", unit: "m2", qtyMode: "grossArea", qtyFactor: 0.48, weight: 0.016, materials: [{ name: "Flooring materials", unit: "m2", factor: 1.04 }, { name: "Adhesive", unit: "bag", factor: 0.16 }] }
      ]
    },
    preliminaries: {
      name: "Preliminaries",
      description: "Temporary works, safety systems, and site setup.",
      subScopes: [
        { id: "site_setup", name: "Site Office & Setup", unit: "item", qtyMode: "lump", qtyFactor: 1, weight: 0.018, materials: [{ name: "Site office setup", unit: "item", factor: 1 }, { name: "Temporary power", unit: "item", factor: 1 }] },
        { id: "safety", name: "Safety Equipment", unit: "item", qtyMode: "floorCount", qtyFactor: 1, weight: 0.012, materials: [{ name: "Safety equipment", unit: "set", factor: 1 }, { name: "Barrier tapes and signs", unit: "set", factor: 0.8 }] },
        { id: "temporary_works", name: "Temporary Works", unit: "item", qtyMode: "floorCount", qtyFactor: 1, weight: 0.015, materials: [{ name: "Temporary materials", unit: "item", factor: 1 }, { name: "Scaffold accessories", unit: "set", factor: 0.4 }] }
      ]
    },
    commercial: {
      name: "Commercial",
      description: "Commercial layers for overheads, profit, and risk allowance.",
      subScopes: [
        { id: "overheads_profit", name: "Overheads & Profit", unit: "%", qtyMode: "percentage", qtyFactor: 1, weight: 0.1, materials: [] },
        { id: "contingency", name: "Contingency & Risk", unit: "%", qtyMode: "percentage", qtyFactor: 1, weight: 0.05, materials: [] }
      ]
    }
  },
  accessCodes: {
    "ALQ-UNLOCK-365": { label: "Annual Access", unlimited: true },
    "QASWA-PRO-2026": { label: "Professional Access", unlimited: true }
  }
};
