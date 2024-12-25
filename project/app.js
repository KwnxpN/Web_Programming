document.addEventListener('DOMContentLoaded', async function () {
    try {
        const top_response = await fetch('./top_menu.json');
        const top_json = await top_response.json();
        const topMenuItems = Object.values(top_json);

        const all_menu_response = await fetch('./foods.json');
        const all_menu_json = await all_menu_response.json();
        const allMenuItems = Object.values(all_menu_json);

        const topMenuContainer = document.getElementById('top-menu-container');
        const allMenuContainer = document.getElementById('all-menu-container');

        if (!topMenuContainer && !allMenuContainer) {
            console.error('Could not find top-menu-container or all-menu-container element');
            return;
        }

        for (let index_t = 0; index_t < topMenuItems[0].length; index_t++) {
            const name = topMenuItems[0][index_t].name;
            const image = topMenuItems[0][index_t].imageUrl;
            const descr = topMenuItems[0][index_t].description;
            
            topMenuContainer.innerHTML += ` 
                <div class="w-1/3 rounded-2xl overflow-hidden shadow-lg bg-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-300">
                    <div class="mx-6 mt-4 mb-0">
                        <img class="w-full h-64 rounded-2xl object-cover" src="${image}" alt="Food Image">
                    </div>
                    <div class="px-6 py-4">
                        <div class="font-bold text-2xl mb-2">${name}</div>
                        <p class="text-gray-700 text-base">
                        ${descr}
                        </p>
                    </div>
                </div>
            `;
        }

        for (let index_a = 0; index_a < allMenuItems[0].length; index_a++) {
            const name = allMenuItems[0][index_a].name;
            const image = allMenuItems[0][index_a].imageUrl;
            const descr = allMenuItems[0][index_a].description;

            allMenuContainer.innerHTML += ` 
                <div class="w-full rounded-2xl overflow-hidden shadow-lg bg-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-300">
                    <div class="mx-6 mt-4 mb-0">
                        <img class="w-full h-64 rounded-2xl object-cover" src="${image}" alt="Food Image">
                    </div>
                    <div class="px-6 py-4">
                        <div class="font-bold text-2xl mb-2">${name}</div>
                        <p class="text-gray-700 text-base">
                        ${descr}
                        </p>
                    </div>
                </div>
            `;
        }

    } catch (error) {
        console.error('Error:', error);
    }
});