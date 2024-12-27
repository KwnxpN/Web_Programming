const calculate = () => {
    const res_field = document.getElementById('result');
    const cur_res = document.getElementById('current_res');
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;

    if ((isNaN(num1) || isNaN(num2)) || (num1 == "" || num2 == "")) {
        cur_res.innerHTML = `Please insert number!!`
    }
    else {
        const res = Number(num1) + Number(num2);
        cur_res.innerHTML = `Result : ${res}`

        res_field.innerHTML += `
            <p>${num1} + ${num2} = ${res}</p>
        `;
    }
    
}

const cal_button = document.getElementById('cal_but');
cal_button.addEventListener('click', calculate);
