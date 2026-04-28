let a0 = 0;
let ak_values = [];
let bk_values = [];
let ans = document.querySelector(".get-ans");

// Toggle arbitrary input
function toggleArbInput() {
    const arbContainer = document.getElementById("arb_container");
    const isArbitrary = document.getElementById("Arbitary").checked;
    arbContainer.style.display = isArbitrary ? "block" : "none";
}

document.getElementById("Degree").onclick = toggleArbInput;
document.getElementById("Radian").onclick = toggleArbInput;
document.getElementById("Arbitary").onclick = toggleArbInput;

function calculate() {
    ans.innerHTML = ""; // clear UI
    ak_values = [];
    bk_values = [];

    let n = parseInt(document.getElementById("num").value || 0);
    let harmonicTerms = parseInt(document.getElementById("n").value || 1);
    let unit = document.querySelector('input[name="x_value"]:checked')?.value;
    let arbLimit = parseFloat(document.getElementById("arb_limit").value || 1);

    let sumY = 0;

    for (let i = 1; i <= n; i++) {
        let y = parseFloat(document.getElementById("y" + i).value || 0);
        sumY += y;
    }

    a0 = (2 / n) * sumY;
    let f_x = `f(x) = ${(a0 / 2).toFixed(4)}`;

    for (let k = 1; k <= harmonicTerms; k++) {
        let ak_sum = 0;
        let bk_sum = 0;

        for (let i = 1; i <= n; i++) {
            let x = parseFloat(document.getElementById("x" + i).value || 0);
            let y = parseFloat(document.getElementById("y" + i).value || 0);
            let angle = 0;

            if (unit === "Degree") {
                angle = x * (Math.PI / 180);
            } else if (unit === "Radian") {
                angle = x;
            } else {
                angle = (2 * Math.PI * x) / arbLimit;
            }

            ak_sum += y * Math.cos(k * angle);
            bk_sum += y * Math.sin(k * angle);
        }

        let ak = (2 / n) * ak_sum;
        let bk = (2 / n) * bk_sum;

        ak_values.push(ak);
        bk_values.push(bk);

        let ak_display = ak.toFixed(2);
        let bk_display = bk.toFixed(2);

        f_x += ` + (${ak_display})cos(${k}x) + (${bk_display})sin(${k}x)`;

        ans.innerHTML += `
        <input type="number" id="a_input_${k}" placeholder="Enter a${k}">
        <input type="number" id="b_input_${k}" placeholder="Enter b${k}"><br>

        <button onclick="checkInput(${k}, ${ak}, ${bk})">
        Check a${k}, b${k}
        </button><br><br>
        `;
    }
    ans.innerHTML += `<button onclick="showAnswer()">Show Final Equation</button>`;
    
    window.final_fx = f_x;
}

// Check values


function checkInput(k, ak, bk) {
    let a = parseFloat(document.getElementById(`a_input_${k}`).value);
    let b = parseFloat(document.getElementById(`b_input_${k}`).value);
    const tolerance = 0.01;
    if (Math.abs(a - ak) > tolerance || Math.abs(b - bk) > tolerance) {
        alert(`Incorrect for a${k}, b${k}`);
    } else {
        alert(`Correct!`);
    }
}

// Show final equation
function showAnswer() {
    document.getElementById("a0_display").innerHTML = `a0 = ${a0.toFixed(2)}`;
    document.getElementById("result").innerHTML = window.final_fx;
}

// Generate table
function generateTable() {
    let num = parseInt(document.getElementById("num").value);
    let interval = parseInt(document.getElementById("interval").value || 0);
    let table = document.getElementById("table-js");

    table.innerHTML = `<tr><th>X Value</th><th>Y</th></tr>`;

    for (let i = 1; i <= num; i++) {
        let row = table.insertRow();

        row.insertCell(0).innerHTML =
            `<input type="number" id="x${i}" value="${(i - 1) * interval}">`;

        row.insertCell(1).innerHTML =
            `<input type="number" id="y${i}">`;
    }
}