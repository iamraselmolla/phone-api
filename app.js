const loader = document.getElementById('loader');
const showMore = document.getElementById('show-more')

const loadPhones = async (search = 'iphone', dataLimit) => {
    const getJSON = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const phoneData =  await getJSON.json();
    displayPhone(phoneData.data, dataLimit);
}
loadPhones()
const displayPhone = (phones,dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    if( dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showMore.classList.remove('d-none')
    }else{
        showMore.classList.add('d-none');
    }
    const message = document.getElementById('message');
    if(phones.length === 0){
        message.classList.remove('d-none')

    }else{
        message.classList.add('d-none')

    }
    phones.forEach(phone => {

        const createDiv = document.createElement('div');
        createDiv.className = 'col-md-3 border p-3 border-3 border-success';
        createDiv.innerHTML = `
                 <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <button id="show-details" class="btn btn-primary"> Show Details </button>
                  </div>`;


                  phoneContainer.appendChild(createDiv);

              
    });
    lazyLoader(false);
}


function loadData(dataLimit){
    lazyLoader(true)
    const searchValue = document.getElementById('search-value').value;
    loadPhones(searchValue, dataLimit);
}
document.getElementById('btn-search').addEventListener('click', function(){
   loadData(10);

});
document.getElementById('search-value').addEventListener('keypress', function(e){
   if(e.key === 'Enter'){
    e.preventDefault();
    loadData(10);
   }
});


function lazyLoader(isLoading){
    if(isLoading){
        loader.classList.remove('d-none');        
    }else{
        loader.classList.add('d-none')
    }
}
document.getElementById('btn-show-more').addEventListener('click', function(){
loadData()
});