document.addEventListener('DOMContentLoaded', function() {
    const menuItems = [
        ['https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', 'Tacos'],
        ['https://images.unsplash.com/photo-1555507036-ab1f4038808a', 'Croissant'],
        ['https://img.freepik.com/free-photo/pork-charcoal-grill_1339-4999.jpg?t=st=1733456264~exp=1733459864~hmac=a3270cd016f1ff0192ba202fafd5a378c6ebf93141c726e0b9d488eae21fff27&w=996', 'Yakiniku'],
        // ['https://images.unsplash.com/photo-1513104890138-7c749659a591', 'Pizza'],
        // ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd', 'Burger'], 
        // ['https://images.unsplash.com/photo-1599232288126-7dbd2127db14?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9ydGlsbGF8ZW58MHx8MHx8fDA%3D', 'Tortilla']
        ];

    const menuContainer = document.getElementById('menu-container');
    menuItems.forEach(([image, name]) => {
        menuContainer.innerHTML += `
            <div class="rounded overflow-hidden shadow-lg bg-red-600">
                <div class="mx-14 mt-4 mb-0">
                    <img class="w-full h-64 rounded" src="${image}" alt="Sunset in the mountains">
                </div>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">${name}</div>
                    <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
            </div>
        `;
    });
});