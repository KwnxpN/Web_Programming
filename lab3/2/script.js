document.addEventListener('DOMContentLoaded', () => {
    const randomButton = document.getElementById('randomButton');
    const digits = Array.from({length: 6}, (_, i) => document.getElementById(`digit${i + 1}`));

    function getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    function updateImages(numbers) {
        numbers.forEach((number, index) => {
            digits[index].src = `http://10.0.15.21/lab/lab3/images/${number}.png`;
        });
    }

    function generateRandomNumbers() {
        const numbers = Array.from({length: 6}, () => getRandomNumber());
        updateImages(numbers);

        digits.forEach(digit => {
            digit.style.animation = 'none';
            digit.offsetHeight;
            digit.style.animation = 'fadeIn 0.5s';
        });
    }

    randomButton.addEventListener('click', generateRandomNumbers);
});