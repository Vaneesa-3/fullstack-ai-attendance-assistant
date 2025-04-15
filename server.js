const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { execFile } = require("child_process");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/ai-response", (req, res) => {
  const { day, hour } = req.body;

  if (!day || hour === undefined) {
    return res.status(400).json({ answer: "Invalid input" });
  }

  const scriptPath = path.join(__dirname, "predictor.py");

  execFile("python", [scriptPath, day, hour], (error, stdout, stderr) => {
    if (error) {
      console.error("Python error:", error);
      return res.status(500).json({ answer: "Server error" });
    }

    try {
      const result = JSON.parse(stdout);
      const message = `
 Subject: ${result.subject}
 Attendance: ${result.current_attendance}
 Extra Classes Needed: ${result.extra_classes_needed}
 Faculty Prediction: ${result.faculty_prediction}
      `;
      res.json({ answer: message.trim() });
    } catch (err) {
      console.error("JSON parse error:", err);
      console.error("Raw output:", stdout);
      res.status(500).json({ answer: "Invalid response from ML logic" });
    }
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
