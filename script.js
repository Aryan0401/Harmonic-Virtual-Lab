function calculate()
{
    let n = parseInt(document.getElementById("n").value);
    let asum = 0;
    let a0 = 0;
    let bsum = 0;

    for (let i = 1; i <= n; i++) {
        let x = parseFloat(document.getElementById("x" + i).value);
        let y = parseFloat(document.getElementById("y" + i).value);

        let radians = x * (Math.PI / 180);

        a0 += y;
        asum += y * Math.cos(radians); // a1
        bsum += y * Math.sin(radians); // b1
    }

   
    let a0_final = (2 / n) * a0;
    let a_1 = (2 / n) * asum;
    let b_1 = (2 / n) * bsum;

    let a1 = a_1.toFixed(4);
    let b1 = b_1.toFixed(4);
    let a0_display = a0_final.toFixed(4);

    document.getElementById("result").innerHTML =
        `f(x) = ${a0_display / 2} + ${a1}cos(x) + ${b1}sin(x)`;
}




function generateTable()
{
    let n = parseInt(document.getElementById("n").value);
    let table = document.getElementById("table-js");
    table.innerHTML = 
    `   <tr>
            <th>X</th>
            <th>Y</th>
        </tr>`;
    for (let i = 1; i <= n; i++) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = `<input type="number" id="x${i}">`;
        cell2.innerHTML = `<input type="number" id="y${i}">`;
    }
}