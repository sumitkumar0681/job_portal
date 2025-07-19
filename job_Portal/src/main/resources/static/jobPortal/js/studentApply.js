document.addEventListener("DOMContentLoaded", () => {
  const jobId = new URLSearchParams(window.location.search).get("id");
  const orgNameEl = document.getElementById("orgName");
  const jobTitleEl = document.getElementById("jobTitle");
  const locationEl = document.getElementById("location");
  const applyDateEl = document.getElementById("applyDate");

  let recEmail = "";
  // Validate jobId
  if (!jobId) {
    alert("No job ID found in the URL!");
    return;
  }

  // Fetch job post details from backend
  fetch(`http://localhost:8080/student/view/id?id=${jobId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch job post");
      return res.json();
    })
    .then((data) => {
      console.log("Received job data:", data);
      orgNameEl.textContent = data.orgName;
      jobTitleEl.textContent = data.jobTitle;
      locationEl.textContent = data.location;
      recEmail = data.email;
    })
    .catch((err) => {
      console.error("Fetch job error:", err);
      orgNameEl.textContent = "Error loading";
      jobTitleEl.textContent = "Error loading";
      locationEl.textContent = "Error loading";
    });

  // Set apply date to today
  const today = new Date().toISOString().split("T")[0];
  applyDateEl.value = today;

  // Handle marks type switch
  document.getElementById("marksType").addEventListener("change", function () {
    const type = this.value;
    const label = document.getElementById("qualMarksLabel");
    const input = document.getElementById("qualMarks");

    if (type === "percentage") {
      label.textContent = "Qualification Marks (%):";
      input.placeholder = "e.g. 85.5";
      input.max = 100;
    } else {
      label.textContent = "Qualification Marks (CGPA out of 10):";
      input.placeholder = "e.g. 8.9";
      input.max = 10;
    }
  });

  // Handle form submission
  document.getElementById("applyForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      jobId: jobId,
      orgName: orgNameEl.textContent,
      location: locationEl.textContent,
      recEmail: recEmail,
      appliedFor: jobTitleEl.textContent,
      name: document.getElementById("name").value,
      dob: document.getElementById("dob").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      qualification: document.getElementById("qualification").value,
      marksType: document.getElementById("marksType").value,
      markQuali: parseFloat(document.getElementById("qualMarks").value),
      per12: parseFloat(document.getElementById("class12").value),
      per10: parseFloat(document.getElementById("class10").value),
      applyDate: today,
      resumeLink: document.getElementById("resumeLink").value,
    };

    console.log("Submitting application:", formData);

    // Submit the application
    fetch("http://localhost:8080/application/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit application");
        alert("Application submitted successfully!");
        document.getElementById("applyForm").reset();
      })
      .catch((err) => {
        console.error("Submission error:", err);
        alert("There was an error during submission.");
      });
  });
});