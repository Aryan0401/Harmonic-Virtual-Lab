function calculate()
{
    let n = 6;
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
    let a1 = (2 / n) * asum;
    let b1 = (2 / n) * bsum;

    document.getElementById("result").innerHTML =
        `f(x) = ${a0_final / 2} + ${a1}cos(x) + ${b1}sin(x)`;
}




// function generateTable()
// {
//     let n = parseInt(document.getElementById("n").value);
//     let table = document.getElementById("table-js");
//     table.innerHTML = "";
//     for (let i = 1; i <= n; i++) {
//         let row = table.insertRow();
//         let cell1 = row.insertCell(0);
//         let cell2 = row.insertCell(1);
//         cell1.innerHTML = `<input type="number" id="x${i}">`;
//         cell2.innerHTML = `<input type="number" id="y${i}">`;
//     }
// }