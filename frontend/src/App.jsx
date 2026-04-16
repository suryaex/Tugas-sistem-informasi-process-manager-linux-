import { useState, useEffect } from "react";

export default function App() {
  const API = `${window.location.protocol}//${window.location.hostname}:5000`;

  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");
  const [search, setSearch] = useState("");
  const [showZombie, setShowZombie] = useState(false);

  const fetchProcesses = async () => {
    try {
      const res = await fetch(`${API}/processes`);
      const data = await res.json();
      setProcesses(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProcesses();
    const interval = setInterval(fetchProcesses, 3000);
    return () => clearInterval(interval);
  }, []);

  const killProcess = async (pid) => {
    await fetch(`${API}/kill`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pid }),
    });
    fetchProcesses();
  };

  const changePriority = async (pid, priority) => {
    await fetch(`${API}/priority`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pid, priority }),
    });
    fetchProcesses();
  };

  const runSSH = async () => {
    const res = await fetch(`${API}/ssh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command }),
    });

    const data = await res.json();
    setOutput((prev) => prev + "\n$ " + command + "\n" + data.output);
    setCommand("");
  };

  const filtered = processes
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => !showZombie || p.zombie)

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TOP BAR MAC STYLE */}
      <div className="bg-white/70 backdrop-blur-md shadow rounded-xl px-4 py-2 mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <span className="text-sm text-gray-600">Process Manager</span>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* PROCESS */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow p-4 mb-4">
        <h2 className="font-semibold mb-2 text-gray-700">Process Monitor</h2>

        <input
          className="border rounded p-2 w-full mb-2 text-sm"
          placeholder="Search process..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 mb-2">
          <button
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
            onClick={() => setShowZombie(!showZombie)}
          >
            {showZombie ? "Show All" : "Zombie Only"}
          </button>

          <a
            href={`${API}/backup`}
            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm"
          >
            Download DB
          </a>
        </div>

        {loading ? (
          <div className="text-gray-500 text-sm">Loading...</div>
        ) : (
          <div className="max-h-64 overflow-y-auto border rounded">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th>PID</th>
                  <th>Name</th>
                  <th>CPU</th>
                  <th>Memory</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((p) => (
                  <tr key={p.pid} className="border-b hover:bg-gray-50">
                    <td>{p.pid}</td>
                    <td>{p.name}</td>
                    <td>{p.cpu}</td>
                    <td>{p.memory} MB</td>

                    <td>
                      {p.zombie ? (
                        <span className="text-red-500 font-medium">
                          zombie
                        </span>
                      ) : (
                        <span className="text-gray-600">{p.status}</span>
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => killProcess(p.pid)}
                        className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                      >
                        Kill
                      </button>

                      <button
                        onClick={() => changePriority(p.pid, 10)}
                        className="ml-1 px-2 py-1 bg-gray-400 text-white rounded text-xs hover:bg-gray-500"
                      >
                        Nice
                      </button>

                      <button
                        onClick={() => changePriority(p.pid, -5)}
                        className="ml-1 px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-800"
                      >
                        High
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TERMINAL */}
      <div className="bg-black rounded-xl p-4 shadow">
        <h2 className="text-green-400 text-sm mb-2">Terminal (SSH)</h2>

        <div className="h-48 overflow-auto text-green-400 text-sm mb-2 whitespace-pre-wrap">
          {output}
        </div>

        <div className="flex text-green-400 text-sm">
          <span>$</span>
          <input
            className="bg-black ml-2 w-full outline-none"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSSH()}
          />
        </div>
      </div>
    </div>
  );
}
