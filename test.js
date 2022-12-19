let isValetFound = false;
let isOrderAccepted = false;
let valetsearchtimer = null;

const askForAcceptingOrder = () => {
    setTimeout(() => {
        isOrderAccepted = confirm('Should Restaurant confirm order?')
    }, 1000);
}

const checkIfOrderAcceptedFromRestaurant = () => {
    // Fake api call
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (isOrderAccepted) resolve(true)
            else resolve(false)

            // shortform
            // resolve(isOrderAccepted);
        },5000);
    })
};

const startFoodPreperation = () => {
    document.getElementById('currentStatus').innerText = 'Preparing your order';

        Promise.all([
            startValetSearch(),
            enableMapView(),
            orderDelivered()
        ])
        .then(res=>{
            console.log(res);
            alert('Order delivered ! share your food and delivery experience')
        })
        .catch(err => {
            console.error(err);
        })
}

const enableMapView = () => {
    return new Promise((resolve,reject)=>{
        document.getElementById('mapview').style.opacity = '1';
        resolve('updated map');
        // reject('map init failed');
    })
}

const startValetSearch = () => {
    return new Promise((resolve,reject) => {
        valetsearchtimer = setInterval(() => {
            if (isValetFound){
                updateValetDetails();
                resolve('found valet');
                console.log('Finally valet found ....')
                clearInterval(valetsearchtimer);
            }
        }, 1000);
    });
}

const orderDelivered = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(true);
        },5000);
    })
}

const updateValetDetails = () => {
    document.getElementById('found-driver').classList.remove('none');
    document.getElementById('finding-driver').classList.add('none');
}

const findValet = () => {
    /**
     * Do Complex Operation at backend
     * 1. Get Location os all nearby valets 
     * 2. Sort valets based on shortest distance using Graph algorithm
     * 3. Check the valet with minimum orders and nearby delivery destinations
     */

    // Fake api call to find nearby valets 
    const valetsPromises = [];
    for(let i = 0; i< 10; i++) {
        valetsPromises.push(getRandomDriver(true));
    }
    console.log(valetsPromises);
    
    Promise.race(valetsPromises)
    .then(valet=>{
        console.log('valet assigned - ',valet);

        isValetFound = true;
    })
    .catch(err =>{
        console.error(err);
    });
}



const getRandomDriver = (shouldAllot) => {
    const randomTime = Math.random() * 1000;
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if (shouldAllot) resolve('Valet-' + randomTime);
            else reject('Valet-' + randomTime);
        }, randomTime);
    });
}



window.addEventListener('load',function(){
    document.getElementById('findValet').addEventListener('click',function(){
        findValet()
    });
    this.document.getElementById('acceptOrder').addEventListener('click',function(){
        askForAcceptingOrder();
    });
    
    checkIfOrderAcceptedFromRestaurant()
    .then(isOrderAccepted => {
        if (isOrderAccepted) {
            startFoodPreperation();
        }
        else {
            alert('Order not accepted from restaurant! Returing Payment Now')
        }
    })
    .catch(err => { 
        alert('Something went wrong! Please try again later')
    });
});
