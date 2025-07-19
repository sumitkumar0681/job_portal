document.addEventListener("DOMContentLoaded", () => {
    const applicationsContainer = document.getElementById("applicationsContainer");
    const studentEmail = localStorage.getItem("studentEmail");

    if (!studentEmail) {
        applicationsContainer.innerHTML = "<p>Please login first.</p>";
        return;
    }

    async function fetchApplicationsWithStatus() {
        try {
            const res = await fetch(`http://localhost:8080/application/view/${encodeURIComponent(studentEmail)}`);
            if (!res.ok) throw new Error("Failed to fetch applications");

            const applications = await res.json();
            if (!applications || applications.length === 0) {
                applicationsContainer.innerHTML = "<p>No applications found.</p>";
                return;
            }

            const appsWithStatus = await Promise.all(
                applications.map(async (app) => {
                    try {
                        const statusRes = await fetch(`http://localhost:8080/application/appStat/id?id=${app.applicationid}`);
                        if (!statusRes.ok) throw new Error("Failed to fetch status");

                        const statusList = await statusRes.json();
                        const latestStatus = statusList.length > 0
                            ? statusList[statusList.length - 1].stat
                            : "Pending";

                        return { ...app, status: latestStatus };
                    } catch (err) {
                        console.warn(`Status fetch failed for ID ${app.applicationid}:`, err);
                        return { ...app, status: "Pending" };
                    }
                })
            );

            renderApplications(appsWithStatus);
        } catch (err) {
            console.error("Error loading applications:", err);
            applicationsContainer.innerHTML = "<p>Error loading applications.</p>";
        }
    }

    function renderApplications(applications) {
        applicationsContainer.innerHTML = "";

        applications.forEach(app => {
            const card = document.createElement("div");
            card.classList.add("card");

            const jobDetails = document.createElement("div");
            jobDetails.classList.add("job-details");
            jobDetails.innerHTML = `
                <h2>${app.appliedFor}</h2>
                <p><strong>Organization:</strong> ${app.orgName}</p>
                <p><strong>Location:</strong> ${app.location}</p>
                <p><strong>Apply Date:</strong> ${app.applyDate}</p>
            `;

            const status = document.createElement("div");
            status.classList.add("status", app.status.toLowerCase());
            status.textContent = app.status;

            card.appendChild(jobDetails);
            card.appendChild(status);
            applicationsContainer.appendChild(card);
        });
    }

    fetchApplicationsWithStatus();
});
