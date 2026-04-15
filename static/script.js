let chart;
let barChart; // prevent multiple charts
let liveMode = false;
let intervalId;
let importanceChart;
async function predict() {

    let data = {
        air: document.getElementById("air").value,
        process: document.getElementById("process").value,
        speed: document.getElementById("speed").value,
        torque: document.getElementById("torque").value,
        wear: document.getElementById("wear").value
    };

    let response = await fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    let result = await response.json();
    let resultBox = document.getElementById("result");
    resultBox.classList.remove("show");

    let torqueSlider = document.getElementById("torque");
    let torqueValue = document.getElementById("torqueValue");

    torqueSlider.oninput = () => {
        torqueValue.innerText = torqueSlider.value;
    };

    setTimeout(() => {
        resultBox.classList.add("show");
    }, 50);

    let prob = result.probability;
    let status = result.result;

    

    if (status.includes("High")) {
    let audio = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");
    audio.play();
    }

    let color;
    let glow;

    if (status.includes("High")) {
        color = "#ef4444";
        glow = "0 0 30px rgba(239,68,68,0.9)";
    } 
    else if (status.includes("Medium")) {
        color = "#f97316";
        glow = "0 0 25px rgba(249,115,22,0.8)";
    } 
    else {
        color = "#22c55e";
        glow = "0 0 20px rgba(34,197,94,0.7)";
    }

    document.getElementById("result").style.color = color;
    document.querySelector(".container").style.boxShadow = glow;

    // Show result + risk + reasons
    document.getElementById("result").innerHTML =
        `<h2>${status}</h2>
         <p>Risk: ${(prob * 100).toFixed(1)}%</p>
         <p>Reason: ${result.reasons.join(", ")}</p>`;

    // Progress bar
    document.getElementById("progress-fill").style.width = (prob * 100) + "%";

    document.getElementById("result").innerHTML =
    `<h2>${status}</h2>
     <span class="badge">${status}</span>
     <p>Risk: ${(prob * 100).toFixed(1)}%</p>
     <p>⚠️ Cause: ${result.reasons.join(", ")}</p>`;

    // Chart
    showChart(prob);
    // BAR CHART (Feature values)

    const ctx2 = document.getElementById("barChart");

    if (barChart) {
        barChart.destroy();
    }

    barChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Air', 'Process', 'Speed', 'Torque', 'Wear'],
            datasets: [{
               label: 'Input Values',
               backgroundColor: "#3b82f6",
               data: [
                    Number(data.air),
                    Number(data.process),
                    Number(data.speed),
                    Number(data.torque),
                    Number(data.wear)
                ]
            }]
        }
    });

    const importance = result.importance;

    const labels = Object.keys(importance);
    const values = Object.values(importance);

    // destroy old chart
    if (importanceChart) {
        importanceChart.destroy();
    }

    const ctx3 = document.getElementById("importanceChart");

    importanceChart = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Feature Importance',
                data: values,
                backgroundColor: "#8b5cf6"
            }]
        },
        options: {
            indexAxis: 'y'
        }
    });
    let container = document.querySelector(".container");

    // remove old classes
    container.classList.remove("high-risk");

    // apply if high
    if (status.includes("High")) {
        container.classList.add("high-risk");
    }
    }

function showChart(prob) {

    const ctx = document.getElementById("chart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Failure", "Safe"],
            datasets: [{
                data: [prob * 100, 100 - prob * 100],
                backgroundColor: ["#ef4444", "#22c55e"]
            }]
        }
    });
}

function startLive() {

    if (liveMode) {
        clearInterval(intervalId);
        liveMode = false;
        alert("Live mode stopped");
        return;
    }

    liveMode = true;

    intervalId = setInterval(() => {
        predict();
    }, 3000); // every 3 seconds

    alert("Live mode started");
}