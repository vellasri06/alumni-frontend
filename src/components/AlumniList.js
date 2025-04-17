import { useState, useEffect } from "react";

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [newAlumni, setNewAlumni] = useState([]); // ✅ Store newly registered alumni
  const backendURL = "https://alumni-backend-1-b38f.onrender.com";
  // 1️⃣ **Fetch Alumni Data**
  useEffect(() => {
    fetch(`${backendURL}/api/alumnis`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Fetched Alumni Data:", data);

        const updatedData = data.map((alumnus) => {
          const regYear = alumnus.regNo ? alumnus.regNo.substring(0, 2) : "";
          let batch = "Unknown";

          if (regYear) {
            const yearNum = parseInt(regYear, 10);
            batch = yearNum >= 90 && yearNum <= 99 ? `19${regYear}` : `20${regYear}`;
          }

          return {
            regNo: alumnus.regNo || "Unknown",
            name: alumnus.name?.trim() || "Unknown",
            batch: batch,
            company: alumnus.companyName || "N/A",
            email: alumnus.email?.trim() || "N/A",
            mobile: alumnus.studentMobile || "N/A",
          };
        });

        setAlumni(updatedData);
        setFilteredAlumni(updatedData);

        const batchSet = new Set(updatedData.map((a) => a.batch));
        setBatches(["All", ...Array.from(batchSet).sort((a, b) => parseInt(a) - parseInt(b))]);
      })
      .catch((err) => console.error("❌ Alumni Fetch Error:", err));
  }, []);

  // 2️⃣ **Fetch Newly Registered Placement Data Separately**
  // 2️⃣ **Fetch Newly Registered Placement Data Separately**
  const extractBatch = (regNo) => {
    if (!regNo || regNo.length < 2) return "Unknown";
  
    const regYear = regNo.substring(0, 2); // Extracts '22' from '221FA04331'
    const batchYear = `20${regYear}`; // Converts '22' → '2022'
  
    console.log(`🛠 Extracting Batch from ${regNo} → ${batchYear}`);
    return batchYear;
  };
  
  
  useEffect(() => {
    fetch("http://localhost:5001/api/placements")
      .then((res) => res.json())
      .then((placements) => {
        console.log("✅ Raw Placement Data:", placements); // 🛠 Debugging
  
        const formattedPlacements = placements.map((placement) => {
          const regNo = placement.regNo?.trim() || "Unknown";
          const batch = extractBatch(regNo); // ✅ Fixed batch extraction
          const address = placement.address?.trim() || "Not Provided"; // ✅ Ensure address exists
  
          return {
            regNo,  // ✅ Should now be correct
            name: placement.name?.trim() || "Unknown",
            batch, // ✅ Fixed batch logic
            company: placement.companyName || "N/A",
            email: placement.email?.trim() || "N/A",
            designation: placement.designation || "N/A",
            address, // ✅ Fixed Address
          };
        });
  
        console.log("📌 Processed Alumni Data:", formattedPlacements); // 🔍 Debugging
  
        setNewAlumni(formattedPlacements);
      })
      .catch((err) => console.error("❌ Placement Fetch Error:", err));
  }, []);
  
  

  // 3️⃣ **Batch Selection**
  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    setFilteredAlumni(batch === "All" ? alumni : alumni.filter((a) => a.batch === batch));
  };

  // 4️⃣ **Search Filter**
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAlumni(selectedBatch === "All" ? alumni : alumni.filter((a) => a.batch === selectedBatch));
      return;
    }

    const filteredResults = alumni.filter(
      (a) =>
        (selectedBatch === "All" || a.batch === selectedBatch) &&
        (a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.regNo.toString().includes(searchTerm))
    );

    console.log("🔍 Searching for:", searchTerm);
    console.log("👀 Filtered Alumni Results:", filteredResults);

    setFilteredAlumni(filteredResults);
  }, [searchTerm, selectedBatch, alumni]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Alumni List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name or Reg No"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Batch Selector */}
      <div style={{ marginBottom: "15px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {batches.map((batch, index) => (
          <button
            key={index}
            onClick={() => handleBatchSelect(batch)}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: batch === selectedBatch ? "#007bff" : "#ccc",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {batch}
          </button>
        ))}
      </div>

      {/* 🔹 Newly Registered Section */}
      {/* 🔹 Newly Registered Section */}
<h3>Newly Registered</h3>
<table border="1" width="100%" cellPadding="10">
  <thead>
    <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
      <th>Reg No</th>
      <th>Name</th>
      <th>Batch</th>
      <th>Company</th>
      <th>Email</th>
      <th>Address</th>
    </tr>
  </thead>
  <tbody>
    {newAlumni.length > 0 ? (
      newAlumni.map((alumnus, index) => (
        <tr key={`${alumnus.regNo}-${index}`}>
          <td>{alumnus.regNo}</td>
          <td>{alumnus.name}</td>
          <td>{alumnus.batch}</td>
          <td>{alumnus.company}</td>
          <td>{alumnus.email}</td>
          <td>{alumnus.address}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
          No newly registered alumni found
        </td>
      </tr>
    )}
  </tbody>
</table>


     

      {/* Alumni Table */}
      <h3>All Alumni</h3>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <th>Reg No</th>
            <th>Name</th>
            <th>Batch</th>
            <th>Company</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumnus, index) => (
              <tr key={`${alumnus.regNo}-${index}`}>
                <td>{alumnus.regNo}</td>
                <td>{alumnus.name}</td>
                <td>{alumnus.batch}</td>
                <td>{alumnus.company}</td>
                <td>{alumnus.email}</td>
                <td>{alumnus.mobile}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
                No alumni found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlumniList;
