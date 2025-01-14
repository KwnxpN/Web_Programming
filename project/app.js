document.addEventListener('DOMContentLoaded', async function () {
    
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });

    if (performance.navigation.type === 2) {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
        }
    }

    function createMenuItem(item, isTop = false) {
        const div = document.createElement('div');
        div.className = `rounded-2xl overflow-hidden shadow-lg bg-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-300`;

        if (isTop) {
            div.innerHTML = `
            <div class="mx-6 mt-4 mb-0">
                <img class="w-full h-64 rounded-2xl object-cover lazy" 
                     data-src="${item.imageUrl}"
                     src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                     alt="${item.name}">
            </div>
            <div class="px-6 py-4">
                <div class="flex justify-between font-bold text-2xl">
                    ${item.name}
                    <img class="size-12" src="${item.place}">
                </div>
                <p class="text-gray-700 text-base">${item.description}</p>
            </div>`;
        } else {
            div.innerHTML = `
            <div class="mx-6 mt-4 mb-0">
                <img class="w-full h-64 rounded-2xl object-cover lazy" 
                     data-src="${item.imageUrl}"
                     src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                     alt="${item.name}">
            </div>
            <div class="px-6 py-4">
                <div class="font-bold text-2xl mb-2">${item.name}</div>
                <p class="text-gray-700 text-base">${item.description}</p>
            </div>`;
        }

        return div;
    }

    // Lazy loading implementation
    function lazyLoad() {
        const lazyImages = document.querySelectorAll('img.lazy');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    try {
        const [topResponse, allMenuResponse] = await Promise.all([
            fetch('./top_menu.json'),
            fetch('./foods.json')
        ]);

        const [topJson, allMenuJson] = await Promise.all([
            topResponse.json(),
            allMenuResponse.json()
        ]);

        const topMenuItems = Object.values(topJson)[0];
        const allMenuItems = Object.values(allMenuJson)[0];

        const topMenuContainer = document.getElementById('top-menu-container');
        const allMenuContainer = document.getElementById('all-menu-container');

        if (!topMenuContainer || !allMenuContainer) {
            throw new Error('Required containers not found');
        }

        const topMenuFragment = document.createDocumentFragment();

        topMenuItems.forEach(item => {
            topMenuFragment.appendChild(createMenuItem(item, true));
        });

        const chunkSize = 10;
        const totalChunks = Math.ceil(allMenuItems.length / chunkSize);

        function renderChunk(chunkIndex) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, allMenuItems.length);
            
            const chunkFragment = document.createDocumentFragment();
            for (let i = start; i < end; i++) {
                chunkFragment.appendChild(createMenuItem(allMenuItems[i]));
            }
            
            allMenuContainer.appendChild(chunkFragment);

            if (chunkIndex + 1 < totalChunks) {
                requestAnimationFrame(() => renderChunk(chunkIndex + 1));
            } else {
                lazyLoad();
                
                const scrollPosition = sessionStorage.getItem('scrollPosition');
                if (scrollPosition && performance.navigation.type === 2) {
                    window.scrollTo(0, parseInt(scrollPosition));
                }
            }
        }

        topMenuContainer.appendChild(topMenuFragment);

        requestAnimationFrame(() => renderChunk(0));

    } catch (error) {
        console.error('Error loading menu items:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'text-red-500 p-4 text-center';
        errorMessage.textContent = 'Unable to load menu items. Please try again later.';
        document.body.appendChild(errorMessage);
    }
});