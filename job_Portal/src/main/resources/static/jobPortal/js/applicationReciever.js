document.addEventListener("DOMContentLoaded", () => {
  const applicationsContainer = document.getElementById("applicationsContainer");
  const recruiterEmail = localStorage.getItem("recruiterEmail");

  // Check if recruiterEmail exists
  if (!recruiterEmail) {
    applicationsContainer.innerHTML = "<p>Error: Recruiter email not found in local storage.</p>";
    return;
  }

  // Fetch applications for the recruiter
  fetch(`http://localhost:8080/application/RecView/${encodeURIComponent(recruiterEmail)}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch applications");
      return res.json();
    })
    .then(applications => {
        console.log(applications);
      // Handle empty result
      if (!applications || !applications.length) {
        applicationsContainer.innerHTML = "<p>No applications found.</p>";
        return;
      }

      applicationsContainer.innerHTML = ""; // Clear any old content

      applications.forEach(app => {
        const card = document.createElement("div");
        card.className = "application-card";
        card.innerHTML = `
          <h3><u>${app.name} applied for <strong>${app.appliedFor}</strong></u></h3>
          <p><strong>Email:</strong> ${app.email}</p>
          <p><strong>Date of Birth:</strong> ${app.dob}</p>
          <p><strong>Address:</strong> ${app.address}</p>
          <p><strong>Qualification:</strong> ${app.qualification} (${app.marksType}: ${app.markQuali})</p>
          <p><strong>Class 12 %:</strong> ${app.per12}</p>
          <p><strong>Class 10 %:</strong> ${app.per10}</p>
          <p><strong>Applied on:</strong> ${app.applyDate}</p>
          <p><strong>Resume:</strong> <a href="${app.resumeLink}" target="_blank">View Resume</a></p>
          <hr />
        `;
        applicationsContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error:", err);
      applicationsContainer.innerHTML = `<p>Error loading applications: ${err.message}</p>`;
    });
});