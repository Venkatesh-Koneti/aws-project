// import { useState } from "react";

// function App() {
//   const [fetchedData, setFetchedData] = useState("");

//   const callService = async (svc) => {
//     const url =
//       svc === "1"
//         ? "http://0.0.0.0:3000/api/micro-service-1"
//         : "http://0.0.0.0:4000/api/micro-service-2";

//     try {
//       const res = await fetch(url);
//       const data = await res.json();
//       setFetchedData(data.message || "No message received.");
//     } catch (error) {
//       setFetchedData("Error: " + error.message);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#f0f4f8",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#ffffff",
//           padding: "40px",
//           borderRadius: "16px",
//           boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
//           textAlign: "center",
//           width: "100%",
//           maxWidth: "500px",
//         }}
//       >
//         <h1 style={{ fontSize: "24px", marginBottom: "20px", fontWeight: "bold" }}>
//           Microservices Demo
//         </h1>

//         <div
//           style={{
//             marginBottom: "20px",
//             padding: "20px",
//             backgroundColor: "#f9fafb",
//             borderRadius: "8px",
//             minHeight: "60px",
//             fontSize: "16px",
//             color: "#333",
//             border: "1px solid #e5e7eb",
//           }}
//         >
//           {fetchedData || "Click a button to fetch data."}
//         </div>

//         <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
//           <button
//             onClick={() => callService("1")}
//             style={{
//               padding: "10px 20px",
//               borderRadius: "8px",
//               border: "none",
//               backgroundColor: "#3b82f6",
//               color: "#fff",
//               cursor: "pointer",
//               transition: "background-color 0.3s",
//             }}
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
//           >
//             Call Microservice 1
//           </button>

//           <button
//             onClick={() => callService("2")}
//             style={{
//               padding: "10px 20px",
//               borderRadius: "8px",
//               border: "none",
//               backgroundColor: "#10b981",
//               color: "#fff",
//               cursor: "pointer",
//               transition: "background-color 0.3s",
//             }}
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
//           >
//             Call Microservice 2
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";

function App() {
  const [selectedService, setSelectedService] = useState("1");
  const [fetchedData, setFetchedData] = useState("");

  const baseURLs = {
    "1": "http://0.0.0.0:3000/api/micro-service-1",
    "2": "http://0.0.0.0:4000/api/micro-service-2",
  };

  const callService = async (method) => {
    const url = baseURLs[selectedService];

    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (["POST", "PUT", "PATCH"].includes(method)) {
        options.body = JSON.stringify({ message: `${method} from service ${selectedService}` });
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setFetchedData(JSON.stringify(data, null, 2));
    } catch (error) {
      setFetchedData("Error: " + error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "20px", fontWeight: "bold" }}>
          Microservices Tester
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="serviceSelect" style={{ marginRight: "10px" }}>
            Select Microservice:
          </label>
          <select
            id="serviceSelect"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option value="1">Microservice 1</option>
            <option value="2">Microservice 2</option>
          </select>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
          {["GET", "POST", "PUT", "PATCH", "DELETE"].map((method) => (
            <button
              key={method}
              onClick={() => callService(method)}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#3b82f6",
                color: "#fff",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
            >
              {method}
            </button>
          ))}
        </div>

        <pre
          style={{
            textAlign: "left",
            padding: "20px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            minHeight: "100px",
            border: "1px solid #e5e7eb",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {fetchedData || "Click a method to send a request."}
        </pre>
      </div>
    </div>
  );
}

export default App;
