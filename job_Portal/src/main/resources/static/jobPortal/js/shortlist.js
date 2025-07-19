document.addEventListener("DOMContentLoaded", () => {
  const applicationsContainer = document.getElementById("applicationsContainer");
  const recruiterEmail = localStorage.getItem("recruiterEmail");

  const filterAllBtn = document.getElementById("filterAll");
  const filterSelectedBtn = document.getElementById("filterSelected");
  const filterRejectedBtn = document.getElementById("filterRejected");

  function fetchStatusByApplicationId(applicationId) {
    return fetch(`http://localhost:8080/application/appStat/id?id=${applicationId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch status");
        return res.json();
      })
      .then(statusList => (statusList?.length > 0 ? statusList[0] : null))
      .catch(err => {
        console.error("Error fetching status for applicationId " + applicationId, err);
        return null;
      });
  }

  async function fetchAndRenderApplications(statusFilter = null) {
    try {
      const res = await fetch(`http://localhost:8080/application/RecView/${encodeURIComponent(recruiterEmail)}`);
      if (!res.ok) throw new Error("Failed to fetch applications");

      const applications = await res.json();

      const enrichedApplications = await Promise.all(
        applications.map(async (app) => {
          const statusObj = await fetchStatusByApplicationId(app.applicationid);
          return { ...app, statusObj };
        })
      );

      const filteredApplications = statusFilter
        ? enrichedApplications.filter(app => app.statusObj?.stat === statusFilter)
        : enrichedApplications;

      renderApplications(filteredApplications);
    } catch (err) {
      console.error("Error loading applications:", err);
      applicationsContainer.innerHTML = "<p>Error loading applications.</p>";
    }
  }

  function renderApplications(applications) {
    applicationsContainer.innerHTML = "";

    if (applications.length === 0) {
      applicationsContainer.innerHTML = "<p>No applications found.</p>";
      return;
    }

    applications.forEach(app => {
      const card = document.createElement("div");
      card.className = "application-card";

      const dropdown = document.createElement("select");
      dropdown.className = "status-dropdown";
      ["Pending", "Selected", "Rejected"].forEach(status => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        if (app.statusObj?.stat === status) option.selected = true;
        dropdown.appendChild(option);
      });

      const submitBtn = document.createElement("button");
      submitBtn.className = "apply-btn";
      submitBtn.textContent = "Submit";
      submitBtn.onclick = async () => {
        const updatedStatus = {
          id: app.statusObj.id,
          stat: dropdown.value,
          application: {
            applicationid: app.applicationid
          }
        };

        try {
          const res = await fetch("http://localhost:8080/application/updateStat", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedStatus)
          });

          if (res.ok) {
            alert("Status updated successfully");
            fetchAndRenderApplications(); // refresh list
          } else {
            throw new Error("Failed to update status");
          }
        } catch (err) {
          console.error("Update error:", err);
          alert("Failed to update status");
        }
      };

      card.innerHTML = `
        <div class="card-left">
          <h3>${app.appliedFor}</h3>
          <p><strong>Name:</strong> ${app.name}</p>
          <p><strong>Email:</strong> ${app.email}</p>
          <p><strong>Location:</strong> ${app.location || "N/A"}</p>
          <p><strong>Resume:</strong> <a href="${app.resumeLink}" target="_blank">View Resume</a></p>
        </div>
      `;

      const rightSide = document.createElement("div");
      rightSide.className = "card-right";

      const statusIndicator = document.createElement("p");
      statusIndicator.className = `status-indicator status-${app.statusObj.stat.toLowerCase()}`;
      statusIndicator.textContent = app.statusObj.stat;

      rightSide.appendChild(statusIndicator);
      rightSide.appendChild(dropdown);
      rightSide.appendChild(submitBtn);
      card.appendChild(rightSide);

      applicationsContainer.appendChild(card);
    });
  }

  // Button Event Listeners
  filterAllBtn.addEventListener("click", () => fetchAndRenderApplications());
  filterSelectedBtn.addEventListener("click", () => fetchAndRenderApplications("Selected"));
  filterRejectedBtn.addEventListener("click", () => fetchAndRenderApplications("Rejected"));

  // Initial load with all applications
  // Initial load with only Pending applications
  fetchAndRenderApplications("Pending");

});
