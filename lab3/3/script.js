document.addEventListener('DOMContentLoaded', () => {
    const viewButton = document.getElementById('viewChart');
    const bars = document.querySelectorAll('.bar');
    const sudsoi = document.querySelector('.sudsoi');
    let isExpanded = false;

    viewButton.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            
            if (isExpanded) {
                bar.style.setProperty('--expanded-width', `${targetWidth}px`);
                bar.classList.add('expanded');
                if (bar.querySelector('span').textContent === 'Black') {
                    bar.classList.add('black');
                }
                viewButton.textContent = 'Hide Chart';
                sudsoi.classList.add('show');
            } else {
                bar.classList.remove('expanded');
                if (bar.querySelector('span').textContent === 'Black') {
                    bar.classList.remove('black');
                }
                viewButton.textContent = 'View Chart';
                sudsoi.classList.remove('show');
            }
        });
    });
});