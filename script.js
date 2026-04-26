function calculate()
{
    let n = 2;
    let asum = 0;
    let a0 = 0;
    let bsum = 0;
    for (let i = 1; i <= n; i++) {
        let x = parseFloat(document.getElementById("x" + i).value);
        let y = parseFloat(document.getElementById("y" + i).value);
        let radians = x * (Math.PI / 180);
        a0 += y;
        asum += y * Math.sin(radians);
        bsum += y * Math.cos(radians);
    }
    // console.log(asum*(2/3));//b1
    // console.log(bsum*(2/3));//a1
    document.getElementById("result").innerHTML = `f(x) = ${a0* (2 / 3)} + ${asum * (2 / 3)}sin(x) + ${bsum * (2 / 3)}cos(x)`;
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