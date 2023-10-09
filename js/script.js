"use strict";

const baseURL = "http://localhost:3000";

// Function to collapse navbar on mobile devices
function collapseNavbar() {
  const navbar = document.getElementById("navbar-collapse");
  if (navbar.classList.contains("navbar-show")) {
    navbar.classList.remove("navbar-show");
  } else {
    navbar.classList.add("navbar-show");
  }
}

// Function to smoothly scroll to the target section
function scrollToSection(targetId) {
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });
  }
}

// Add click event listeners to the navigation links
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute("href"); // Get the href attribute value
    scrollToSection(targetId);
  });
});

// changing search icon image on window resize
window.addEventListener("resize", changeSearchIcon);
function changeSearchIcon() {
  let winSize = window.matchMedia("(min-width: 1200px)");
  if (winSize.matches) {
    document.querySelector(".search-icon img").src = "images/search-icon.png";
  } else {
    document.querySelector(".search-icon img").src =
      "images/search-icon-dark.png";
  }
}
changeSearchIcon();

// stopping all animation and transition
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

/**
 * AIR QUALITY API
 */

document.addEventListener("DOMContentLoaded", function () {
  const AQI_KEY = "4c7fce2d-a3b5-4500-8b95-58a1232425fb";
  const AQI_URL = `https://api.airvisual.com/v2/nearest_city?key=${AQI_KEY}`;

  fetch(AQI_URL)
    .then((response) => response.json())
    .then((data) => {
      const cityNameElement = document.getElementById("city-name");
      const aqiElement = document.getElementById("aqi");
      const temperatureElement = document.getElementById("temperature");
      const humidityElement = document.getElementById("humidity");

      // Update HTML oakai data
      cityNameElement.textContent = data.data.city;
      aqiElement.textContent = data.data.current.pollution.aqius;
      temperatureElement.textContent = data.data.current.weather.tp;
      humidityElement.textContent = data.data.current.weather.hu;
    })

    .catch((error) => {
      console.error("Error:", error);
    });
});

/**
 * FORM API
 */

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("appointment-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const patientname = document.getElementById("name").value;
      const clinic = document.getElementById("clinic").value;
      const doctor = document.getElementById("doctor").value;
      const appointment_time = document.getElementById("date").value;
      const appointmentData = {
        patientname: patientname,
        clinic: clinic,
        doctor: doctor,
        appointment_time: appointment_time,
      };
      const response = await fetch(`${baseURL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });
      const data = await response.json();
      if (response.status === 201) {
        window.location.reload;
      } else {
        alert("Something went wrong. Please try again.");
      }
    });
});

window.addEventListener("load", async () => {
  try {
    const response = await fetch(`${baseURL}/bookings/`);
    const data = await response.json();

    return data.map((appointment) => {
      const { bookingID, patientname, clinic, doctor, appointment_time } =
        appointment;
      const appointment_date = new Date(appointment_time).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      const appointmentList = document.getElementById(
        "appointment-list-container"
      );
      const div = document.createElement("div");

      div.innerHTML = `
            <div class="container appointment-card" id="appointment-card-${bookingID}">
                <div class="card-title">
                    <p>${patientname} <span class="appointment-id">#${bookingID}</span>
                    <p>
                </div>
                <div class="card-body">
                    <div class="card-text">
                        <hr>
                        <p>${clinic}</p>
                        <p>${doctor}</p>
                        <p>${appointment_date}</p>
                    </div>
                    <div class="card-access">
                        <div id="qr-code-${bookingID}"
                            style="height: 80px; width: 80px; border-radius: 1rem; margin-bottom: 10px; padding: 10px; background-color: white;">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
                              bookingID + patientname
                            }" alt="QR Code" style="height: 100%; width: 100%; object-fit: contain;">
                        </div>
                        <button class="card-print-btn no-print" id="card-print-btn-${bookingID}" onclick="printDiv(${bookingID})">Print</button>
                    </div>
                </div>
            </div>
      `;
      appointmentList.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
});

// Function to print appointment card
function printDiv(bookingID) {
  var printContents = document.getElementById(
    `appointment-card-${bookingID}`
  ).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}