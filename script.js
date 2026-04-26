function calculate()
{
    let n = 2;
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        let x = parseFloat(document.getElementById("x" + i).value);
        let y = parseFloat(document.getElementById("y" + i).value);
        let radians = x * (Math.PI / 180);
        sum += y * Math.sin(radians);
    }
    console.log(sum*(2/3));
}