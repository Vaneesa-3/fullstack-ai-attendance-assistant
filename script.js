document.getElementById("attendance-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const held = parseInt(document.getElementById("classesHeld").value);
  const attended = parseInt(document.getElementById("classesAttended").value);
  const name = document.getElementById("name").value;
  const semester = document.getElementById("semester").value;
  const department = document.getElementById("department").value;
  
  if (!name || !semester || !department || isNaN(held) || isNaN(attended)) {
    alert("Please fill in all the fields correctly.");
    return;
  }

  if (held < attended) {
    document.getElementById("result").textContent = "Attended classes cannot exceed total held.";
    return;
  }

  
  const percentage = ((attended / held) * 100).toFixed(2);
  document.getElementById("result").textContent = `Attendance: ${percentage}%`;

  
  document.getElementById("second-container").classList.remove("hidden");

  
});
document.getElementById("fetch-response").addEventListener("click", async function () {
  const day = document.getElementById("day").value.trim();
  const hour = document.getElementById("hour").value.trim();

  if (!day || !hour) {
    alert("Please enter both Day and Hour.");
    return;
  }

  
  const responseBox = document.getElementById("ai-response");
  responseBox.textContent = "Thinking... 🤖";

  try {
 
    const res = await fetch("http://localhost:3000/api/ai-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day, hour })
    });

    const data = await res.json();
    responseBox.innerText = data.answer || "No response from AI.";
  } catch (error) {
    console.error(error);
    responseBox.textContent = "Error contacting backend.";
  }
});
