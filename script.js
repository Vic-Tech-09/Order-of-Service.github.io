// let orderOfServices = {
//     ministry: "GKNI",
//     title: "Gethsemane Experience",
//     theme: "Sunday Service",
//     guestMinister: "The Holy Ghost",
//     date: null,
//     time: "6PM",
//     sessions: []
// };

let orderOfService = {
    // ministry: "GKNI",
    title: "Gethsemane Kindom Network International",
    theme: "",
    guestMinister: "",
    date: null,
    time: "5PM",
    sessions: []
};

document.addEventListener("DOMContentLoaded", function () {
    const updateButton = document.querySelector("#oos-btn");
    const editButton = document.querySelector("#session-btn");
    const duration = document.querySelector("#session-duration");
    const finish = document.querySelector("#session-finish-time");
    const whatsappButton = document.querySelector("#whatsapp");
    updateButton.addEventListener("click", updateOOS);
    editButton.addEventListener("click", addSession);
    duration.addEventListener("change", updateFinishFieldByDuration);
    finish.addEventListener("change", updateDurationFieldByFinishTime);
    display();
    whatsappButton.addEventListener("click", sendToWhatsapp);
});

function sendToWhatsapp() {
    var url = "https://api.whatsapp.com/send?text=";

    // ....
    let themeData = "Ministry: *" + orderOfService.ministry + "*%0a";
    themeData += "Title: *" + orderOfService.title + "*%0a";
    themeData += "Theme: *" + orderOfService.theme + "*%0a";
    themeData += "Date:  *" + orderOfService.date + " | " + orderOfService.time + "*%0a%0a";
    themeData += "*ORDER OF SERVICE* %0a";

    url += themeData;

    let sessions = '';

    for (let index = 0; index < orderOfService.sessions.length; index++) {
        const session = orderOfService.sessions[index];

        sessions += "🏆 " + session.title.toUpperCase() + "%0a";
        sessions += "🥇 " + session.startTime + " - " + session.finishTime + " (" + session.duration + ")%0a";
        sessions += "🏅 " + session.minister + "%0a%0a";
    }
    url += sessions;
    // console.log(url);

    window.open(url, '_blank').focus();
}

function updateOOS() {
    const titleInput = document.getElementById("title").value;
    const themeInput = document.getElementById("theme").value;
    const guestInput = document.getElementById("guest").value;
    const dateInput = document.getElementById("date").value;

    orderOfService.title = titleInput;
    orderOfService.theme = themeInput;
    orderOfService.guestMinister = guestInput;
    orderOfService.date = dateInput;

    display();
}

function updateDurationFieldByFinishTime() {
    // Get the start & finish time, and duration element.
    const startTime = document.getElementById("session-start-time").value;
    const finishTime = document.getElementById("session-finish-time").value;

    if (!startTime || !finishTime) {
        alert("Please enter both start and finish times.");
        return;
    }

    // get the start & finish time in minutes.
    // Calculate duration in minutes
    const start = new Date(`1970-01-01T${startTime}:00`);
    const finish = new Date(`1970-01-01T${finishTime}:00`);
    let duration = (finish - start) / 60000; // Convert milliseconds to minutes

    if (duration < 0) {
        alert("Finish time must be later than start time.");
        return;
    }
    // set the value of the duration field to the calculated duration from start - finish time difference
    document.getElementById("session-duration").value = duration;

}

function updateFinishFieldByDuration() {
    const startTime = document.getElementById("session-start-time").value;
    const duration = Number(document.getElementById("session-duration").value);


    // Get the start time, HH:mm
    // Break it into two numbers hours, minutes

    const hours = Number(startTime.split(":")[0]);
    const minutes = Number(startTime.split(":")[1]);

    // combine into minutes
    const startTimeInMinutes = (hours * 60) + minutes;

    // Add the new duration
    const finishTimeValue = startTimeInMinutes + duration;

    // Convert the new total minutes back to HH:mm format

    const reHours = Math.floor(finishTimeValue / 60); // Remaining hours with decimal
    const reMinutes = finishTimeValue % 60; // Remaining minutes


    // Padd With Zeros before and after to ensure the format HH:mm = 00:00

    let stringHours = reHours.toString();
    let stringMinutes = reMinutes.toString();

    // is hours upto two digits
    if (stringHours.length < 2) {
        stringHours = "0" + stringHours;
    }

    // is miniutes upto two digits
    if (stringMinutes.length < 2) {
        stringMinutes = "0" + stringMinutes;
    }
    const finishTimeInputValue = `${stringHours}:${stringMinutes}`; // HH:mm

    // console.log(finishTimeInputValue)
    // Set Finish time HH:mm
    document.getElementById("session-finish-time").value = finishTimeInputValue;

    // console.log(reHours, reMinutes)
    // console.log("Hours (" + hours + ")", "Minutes (" + minutes + ")")
}

function addSession() {
    const sessionTitle = document.getElementById("session-name").value;
    const minister = document.getElementById("session-minister").value;
    const startTime = document.getElementById("session-start-time").value;
    const finishTime = document.getElementById("session-finish-time").value;

    if (!startTime || !finishTime) {
        alert("Please enter both start and finish times.");
        return;
    }

    // Calculate duration in minutes
    const start = new Date(`1970-01-01T${startTime}:00`);
    const finish = new Date(`1970-01-01T${finishTime}:00`);
    let duration = (finish - start) / 60000; // Convert milliseconds to minutes

    if (duration < 0) {
        alert("Finish time must be later than start time.");
        return;
    }

    const sessionData = {
        title: sessionTitle,
        minister: minister,
        startTime: startTime,
        finishTime: finishTime,
        duration: `${duration} minutes`
    };

    orderOfService.sessions.push(sessionData);
    display();
}

function display() {
    const titleDisplay = document.getElementById("d-title");
    const themeDisplay = document.getElementById("d-theme");
    const guestDisplay = document.getElementById("d-guest");
    const dateDisplay = document.getElementById("d-date");

    titleDisplay.innerHTML = `Title Name: ${orderOfService.title}`;
    themeDisplay.innerHTML = `Theme: ${orderOfService.theme}`;
    guestDisplay.innerHTML = `Guest Minister: ${orderOfService.guestMinister}`;
    dateDisplay.innerHTML = `Service Date: ${orderOfService.date}`;

    const sessionsDiv = document.getElementById("sessions");
    sessionsDiv.innerHTML = "";

    orderOfService.sessions.forEach((session, index) => {
        const sessionElement = document.createElement("div");
        sessionElement.innerHTML = `
            <strong>Session ${index + 1}</strong><br>
            Title: ${session.title}<br>
            Minister: ${session.minister}<br>
            Start Time: ${session.startTime}<br>
            Finish Time: ${session.finishTime}<br>
            Duration: ${session.duration}<br><br>
        `;
        sessionsDiv.appendChild(sessionElement);
    });
}
