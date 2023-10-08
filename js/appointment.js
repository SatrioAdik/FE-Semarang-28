document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("appointmentForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const patientname =  document.getElementById("patientname").value;
        const doctor = document.getElementById("doctor").value;
        const clinic = document.getElementById("clinic").value;
        const dateInput = document.getElementById("date");
        const rawDate = dateInput.value; 

        const dateParts = rawDate.split("-");
        const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

        const baseURL = 'http://be-semarang-28-production.up.railway.app';

        const responseBookings = await fetch(baseURL + '/bookings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                patientname: patientname,
                doctor: doctor,
                clinic: clinic,
                appointment_time: formattedDate
            })
        });

        if (responseBookings.ok) {
            const result = await responseBookings.json();
            console.log(result);

            const bookingDetailsHTML = `
                <h1>Booking Details</h1>
                <p><strong>Patient Name:</strong> ${patientname}</p>
                <p><strong>Doctor:</strong> ${doctor}</p>
                <p><strong>Clinic:</strong> ${clinic}</p>
                <p><strong>Appointment Date:</strong> ${formattedDate}</p>
            `;

            const bookingDetailsContainer = document.getElementById("bookingDetails");
            bookingDetailsContainer.innerHTML = bookingDetailsHTML;
        } else {
            console.error("Error:", responseBookings.statusText);
        }
    });
});
