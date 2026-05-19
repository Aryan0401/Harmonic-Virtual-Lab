let a0 = 0;
let ak_values = [];
let bk_values = [];
let ans = document.querySelector(".get-ans");
let score = 0;//MAX score is 5, a0 = 1, and divide 4 marks for ak and bk values
//also hint will deduce 0.5 marks from the total score and wrong answer will deduce 1 mark from the total score
// Toggle arbitrary input

function toggleArbInput() {
    const arbContainer = document.getElementById("arb_container");
    const isArbitrary = document.getElementById("Arbitary").checked;
    arbContainer.style.display = isArbitrary ? "block" : "none";
}

document.getElementById("Degree").onclick = toggleArbInput;
document.getElementById("Radian").onclick = toggleArbInput;
document.getElementById("Arbitary").onclick = toggleArbInput;


function checkA0(btn)
{
    let a0_input = parseFloat(document.getElementById("a0_input").value);
    const tolerance = 0.01;

    if (Math.abs(a0_input - a0) > tolerance) {
        alert(`Incorrect a0!`);

        if (score > 0)
            score -= 1;
    } 
    else {
        alert(`Correct a0!`);

        btn.disabled = true;
        score += 1;
    }
}
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
    ans.innerHTML = `<p>Calculate a0: <input type="number" id="a0_input" placeholder="Enter a0"></p>
    <button onclick="checkA0(this)">Check a0</button><br><br>
    `;
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
        <button onclick="hint(this)">Get Hint</button>
        <button id="check_btn_${k}" onclick="checkInput(${k}, ${ak}, ${bk}, this)">
        Check a${k}, b${k}
        </button><br><br>
        `;
    }
    ans.innerHTML += `<button onclick="showAnswer()">Show Final Equation</button>`;
    
    window.final_fx = f_x;
}

// Check values

//GETHINT
function hint(btn){
    let hintText = "Hint: \n";
    hintText += "1. Calculate a0 using the formula: a0 = (2/n) * Σ(y_i)\n";
    hintText += "2. For each k, calculate ak and bk using:\n";
    hintText += "   ak = (2/n) * Σ(y_i * cos(k * angle))\n";
    hintText += "   bk = (2/n) * Σ(y_i * sin(k * angle))\n";
    hintText += "3. The angle depends on the unit selected (Degree, Radian, or Arbitrary).\n";
     score -= 0.5; // Deduct 0.5 marks for using hint
    if (score < 0)
        score = 0;
    btn.disabled = true;
    alert(hintText);
}

function checkInput(k, ak, bk, btn) {

    let a = parseFloat(document.getElementById(`a_input_${k}`).value);
    let b = parseFloat(document.getElementById(`b_input_${k}`).value);

    const tolerance = 0.01;

    if (Math.abs(a - ak) > tolerance || Math.abs(b - bk) > tolerance) {

        alert(`Incorrect for a${k}, b${k}`);

        score -= 1;

        if (score < 0)
            score = 0;

    } 
    else {

        alert(`Correct!`);

        score += (4 / ak_values.length);

        btn.disabled = true;
    }
}

// Show final equations
function showAnswer() {
    document.getElementById("a0_display").innerHTML = `a0 = ${a0.toFixed(2)}`;
    document.getElementById("result").innerHTML = window.final_fx;
    document.getElementById("score_display").innerHTML = `Score: ${score.toFixed(2)}`;
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