const top_response = await fetch('./top_menu.json');
const top_json = await top_response.json();
const topMenuItems = Object.values(top_json);

document.addEventListener('DOMContentLoaded', function () {
    const topMenuContainer = document.getElementById('top-menu-container');
    for (let index = 0; index < topMenuItems.length; index++) {
        const element = topMenuItems[0][index];
    }

    topMenuItems.forEach(([name, image, description]) => {
        topMenuContainer.innerHTML += ` 
            <div class="rounded overflow-hidden shadow-lg bg-gray-200">
                <div class="mx-14 mt-4 mb-0">
                    <img class="w-full h-64 rounded" src="${image}" alt="Sunset in the mountains">
                </div>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">${name}</div>
                    <p class="text-gray-700 text-base">
                    ${description}
                    </p>
                </div>
            </div>
        `;
    });
});