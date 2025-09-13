let Secondlayout = document.getElementById('2nd-layout');
let buttonCategories = document.getElementById('button-categories');

window.onload = function () {
    showSpinner();
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        let plants = data.plants;
        plants.forEach(function (data) {
            reUsuableCard(data);
        })
        hideSpinner();
    })
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => {
        let categories = data.categories;
        categories.forEach(data => {
            let singleBtn = document.createElement('div')
            singleBtn.innerHTML = `
                <button class=" category-buttons w-[90%] hover:bg-green-300 rounded text-start my-2 pl-2 py-2"> ${data.category_name} </button>
            `;
            buttonCategories.appendChild(singleBtn)
        })
        let singleBtn = document.createElement('div')
        singleBtn.innerHTML = `<button id="allTrees" class="category-buttons hover:bg-green-300 bg-green-600 w-[90%] rounded text-start my-2 pl-2 py-2"> All Trees </button>`;
        buttonCategories.prepend(singleBtn)
        allTrees();
        
        let categoryButtons = document.querySelectorAll('.category-buttons')
        categoryButtons.forEach((data, index) => {
            data.addEventListener('click', () => {
                showSpinner();
                categoryButtons.forEach(data => data.classList.remove('bg-green-600'))
                data.classList.add('bg-green-600')
                let url = `https://openapi.programming-hero.com/api/category/${index}`
                Secondlayout.innerHTML = '';
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    let plants = data.plants
                        plants.forEach(function (data) {
                        reUsuableCard(data);
                    })
                    hideSpinner();
                })
            })
        })
    })
}

function allTrees () {
    let allTrees = document.getElementById('allTrees')
    allTrees.addEventListener('click', () => {
        
        let categoryButtons = document.querySelectorAll('.category-buttons');
        categoryButtons.forEach(btn => btn.classList.remove('bg-green-600'));
        allTrees.classList.add('bg-green-600');
        
        Secondlayout.innerHTML = '';
        showSpinner();
        fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        let plants = data.plants;
        plants.forEach(function (data) {
            reUsuableCard(data);
        })
        hideSpinner();
    })
})}

let cart = [];

let addToCart = (name, price) => {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    renderMyUi(cart)
}
