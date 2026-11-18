import { useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import {
  Activity,
  AlertTriangle,
  Boxes,
  Factory,
  Globe,
  LayoutDashboard,
  Network,
  Search,
  Settings,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";


// Custom Supply Chain Node

function SupplyNode({ data }) {
  return (
    <div className={`supply-node ${data.risk ? "high-risk" : ""}`}>

      <Handle type="target" position={Position.Left} />

      <div className="node-icon">
        {data.icon}
      </div>

      <div>
        <strong>{data.label}</strong>
        <p>{data.status}</p>
      </div>

      <Handle type="source" position={Position.Right} />

    </div>
  );
}


const nodeTypes = {
  supplyNode: SupplyNode,
};


// Mock Supply Chain Data

const initialNodes = [

  {
    id: "1",
    type: "supplyNode",
    position: { x: 50, y: 150 },
    data: {
      label: "Raw Material",
      status: "Operational",
      icon: "🌍",
    },
  },

  {
    id: "2",
    type: "supplyNode",
    position: { x: 330, y: 70 },
    data: {
      label: "Steel Supplier",
      status: "High Risk",
      icon: "🏭",
      risk: true,
    },
  },

  {
    id: "3",
    type: "supplyNode",
    position: { x: 330, y: 270 },
    data: {
      label: "Electronics Supplier",
      status: "Operational",
      icon: "⚡",
    },
  },

  {
    id: "4",
    type: "supplyNode",
    position: { x: 650, y: 150 },
    data: {
      label: "Manufacturer",
      status: "At Risk",
      icon: "🏗️",
      risk: true,
    },
  },

  {
    id: "5",
    type: "supplyNode",
    position: { x: 950, y: 150 },
    data: {
      label: "Distribution Center",
      status: "Operational",
      icon: "📦",
    },
  },

];


const initialEdges = [

  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },

  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
  },

  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
  },

  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
  },

  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
  },

];


function App() {

  const [selectedNode, setSelectedNode] = useState(null);

  const [timeline, setTimeline] = useState(30);

  const [nodes] = useState(initialNodes);

  const [edges] = useState(initialEdges);


  return (

    <div className="app-container">


      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-logo">
            <Globe size={25} />
          </div>

          <div>
            <h2>AtmoGraph</h2>
            <span>INTELLIGENCE PLATFORM</span>
          </div>

        </div>


        <div className="nav-section">

          <p className="nav-heading">WORKSPACE</p>

          <div className="nav-item active">
            <LayoutDashboard size={19} />
            Overview
          </div>

          <div className="nav-item">
            <Network size={19} />
            Supply Network
          </div>

          <div className="nav-item">
            <Activity size={19} />
            Risk Analytics
          </div>

          <div className="nav-item">
            <AlertTriangle size={19} />
            Disruptions
          </div>

          <div className="nav-item">
            <Boxes size={19} />
            Suppliers
          </div>

        </div>


        <div className="sidebar-bottom">

          <div className="nav-item">
            <Settings size={19} />
            Settings
          </div>

          <div className="profile">

            <div className="avatar">AD</div>

            <div>
              <strong>Admin</strong>
              <span>Supply Director</span>
            </div>

          </div>

        </div>

      </aside>



      {/* MAIN CONTENT */}

      <main className="main-content">


        {/* TOP NAVIGATION */}

        <header className="topbar">

          <div>
            <h2>Supply Chain Intelligence</h2>
            <p>Monitor global supply chain disruptions</p>
          </div>


          <div className="top-actions">

            <div className="search-box">
              <Search size={17} />
              <input placeholder="Search suppliers..." />
            </div>

            <div className="live-status">
              <span></span>
              SYSTEM LIVE
            </div>

          </div>

        </header>



        {/* PAGE TITLE */}

        <section className="page-heading">

          <div>
            <h1>Dashboard Overview</h1>
            <p>
              Real-time supply chain monitoring and
              predictive intelligence.
            </p>
          </div>

          <button className="refresh-button">
            <Activity size={16} />
            Live Monitoring
          </button>

        </section>



        {/* STATISTICS */}

        <section className="stats-grid">


          <div className="stat-card">

            <div className="stat-icon blue">
              <Globe />
            </div>

            <p>Total Suppliers</p>

            <h2>2,450</h2>

            <span>Global Network</span>

          </div>


          <div className="stat-card">

            <div className="stat-icon purple">
              <Factory />
            </div>

            <p>Manufacturers</p>

            <h2>840</h2>

            <span>Across 32 countries</span>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              <AlertTriangle />
            </div>

            <p>Active Disruptions</p>

            <h2>18</h2>

            <span className="danger-text">
              Requires attention
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              <ShieldCheck />
            </div>

            <p>Network Health</p>

            <h2>87.5%</h2>

            <span>Overall network status</span>

          </div>


        </section>



        {/* NETWORK GRAPH */}

        <section className="network-section">


          <div className="section-header">

            <div>
              <h2>Supply Chain Network</h2>
              <p>Interactive global dependency visualization</p>
            </div>


            <div className="graph-legend">

              <span>
                <i className="green-dot"></i>
                Operational
              </span>

              <span>
                <i className="red-dot"></i>
                High Risk
              </span>

            </div>

          </div>



          <div className="graph-container">

            <ReactFlow

              nodes={nodes}

              edges={edges}

              nodeTypes={nodeTypes}

              fitView

              onNodeClick={(event, node) => {
                setSelectedNode(node);
              }}

            >

              <Background color="#334155" gap={25} />

              <Controls />

              <MiniMap />

            </ReactFlow>

          </div>


        </section>



        {/* LOWER DASHBOARD */}

        <section className="bottom-grid">


          {/* DISRUPTION FEED */}

          <div className="panel">

            <div className="section-header">

              <div>
                <h2>Disruption Intelligence</h2>
                <p>Recent supply chain alerts</p>
              </div>

              <Zap size={20} />

            </div>


            <div className="alert-item">

              <div className="alert-icon">
                <AlertTriangle />
              </div>

              <div>
                <strong>European Port Strike</strong>
                <p>Shipping delays detected</p>
                <span>HIGH SEVERITY</span>
              </div>

            </div>


            <div className="alert-item">

              <div className="alert-icon">
                <Truck />
              </div>

              <div>
                <strong>Transportation Delay</strong>
                <p>North American logistics</p>
                <span>MEDIUM SEVERITY</span>
              </div>

            </div>


          </div>



          {/* PREDICTION TIMELINE */}

          <div className="panel">

            <div className="section-header">

              <div>
                <h2>Ripple Effect Prediction</h2>
                <p>Predict downstream supply chain risks</p>
              </div>

              <Activity size={20} />

            </div>


            <div className="timeline-options">

              {[30, 60, 90].map((day) => (

                <button

                  key={day}

                  className={
                    timeline === day ? "selected" : ""
                  }

                  onClick={() => setTimeline(day)}

                >

                  {day} Days

                </button>

              ))}

            </div>


            <div className="prediction-result">

              <span>Predicted Impact</span>

              <h2>
                {timeline === 30
                  ? "12 Suppliers"
                  : timeline === 60
                  ? "28 Suppliers"
                  : "46 Suppliers"}
              </h2>

              <p>
                Potentially affected within {timeline} days.
              </p>

            </div>


          </div>


        </section>



        {/* NODE DETAILS */}

        {selectedNode && (

          <div className="selected-node-panel">

            <h3>Selected Supply Chain Node</h3>

            <p>
              Name: {selectedNode.data.label}
            </p>

            <p>
              Status: {selectedNode.data.status}
            </p>

            <button onClick={() => setSelectedNode(null)}>
              Close Details
            </button>

          </div>

        )}


        <footer>
          AtmoGraph © 2026 | AI-Powered Supply Chain Intelligence
        </footer>


      </main>

    </div>

  );

}


export default App;