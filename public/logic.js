let slotOne = 0;
let slotTwo = 0;
let slotThree = 0;
let slotFour = 0;

let firstSlot = document.getElementById('firstSlot');
let secondSlot = document.getElementById('secondSlot');
let thirdSlot = document.getElementById('thirdSlot');
let fourthSlot = document.getElementById('fourthSlot');

let firstSP = document.getElementById('sl1');
let secondSP = document.getElementById('sl2');
let thirdSP = document.getElementById('sl3');
let fourthSP = document.getElementById('sl4');

let firstSMeet = "https://meet.google.com/qpj-xcbj-ysu?authuser=0";
let secondSMeet = "https://meet.google.com/hbz-fwyu-bxu?authuser=0";
let thirdSMeet = "https://meet.google.com/jzd-zjia-zzr?authuser=0";
let fourthSMeet = "https://meet.google.com/viw-jmnf-qyd?authuser=0";
let final;

let getDat = async ()=>{

    try{
        let data = await fetch('http://localhost:4000/getdata');
        let converted = await data.json();
        final = converted;
        slotOne = converted[0].length;
        slotTwo = converted[1].length;
        slotThree = converted[2].length;
        slotFour = converted[3].length;
        console.log(slotOne);
    
        if(slotOne == 4){
            firstSlot.style.display = "none";
        }
        if(slotTwo == 4){
            secondSlot.style.display = "none";
        }
        if(slotThree == 4){
            thirdSlot.style.display = "none";
        }
        if(slotFour == 4){
            fourthSlot.style.display = "none";
        }
    
        firstSP.innerHTML =  4 - slotOne === 1 ? `${1} slot is available` : `${4 - slotOne} slots are available`;
        secondSP.innerHTML = 4 - slotTwo === 1? `${1} slot is available` : `${4 - slotTwo} slots are available`;
        thirdSP.innerHTML = 4 - slotThree === 1 ? `${1} slot is available` : `${4 - slotThree} slots are available`;
        fourthSP.innerHTML = 4 - slotFour === 1 ? `${1} slot is available` : `${4 - slotFour} slots are available`;
        loadPage();
    }catch(err){
        console.log(err);
    }
    

}
getDat();


function loadPage(){

    for(i = 0;i<final.length;i++){

        if(final[i].length){
            final[i].forEach((ele,ind) =>{
                let showLists = document.getElementById('showlists');
                let user = document.createElement('li');
                let p = document.createElement('p');
                let p2 = document.createElement('p');
                let cancelBtn = document.createElement('button');
                cancelBtn.type = 'button';
                cancelBtn.id = `${ele.id}-${ele.slot}`
                cancelBtn.className = 'cancel';
                cancelBtn.innerText = 'Cancel';
                cancelBtn.addEventListener('click',cancelSlot);
                p.innerHTML = `<p>Hi ${ele.name}</p>`;
                let time  = i == 0 ? "2:00 " : i == 1 ? "2:30 " : i == 2 ? "3:00 " : "3:30 ";
                p2.innerHTML = `Please join the meeting via this link <a href=${ele.meetlink} target='_blank'>${ele.meetlink}</a> at sharp ${time} PM`;
                
                user.appendChild(p);
                user.appendChild(p2);
                user.appendChild(cancelBtn);
                showLists.appendChild(user);
            })
        }
     
    }
}




let form = document.getElementById('user-form');
let formBtn = document.getElementById('form-btn');
let id = '';


function handleSlotClick(e) {
    id = e.currentTarget.id;
    form.style.display = 'block';

    
    formBtn.removeEventListener('click', slotSubmit);
    formBtn.addEventListener('click', slotSubmit);
}


firstSlot.addEventListener('click', handleSlotClick);
secondSlot.addEventListener('click', handleSlotClick);
thirdSlot.addEventListener('click', handleSlotClick);
fourthSlot.addEventListener('click', handleSlotClick);


function slotSubmit(e) {
    e.preventDefault();
    let userN = document.getElementById('name').value; 
    let slot = id == "firstSlot" ? 1 : id == "secondSlot" ? 2 : id == "thirdSlot" ? 3 : 4;
    let container = {
        userN,
        slot
    }
    
    let sendData = async () =>{

        let send = await fetch('http://localhost:4000/postdata',{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(container)
        })
        let resp = await send.json();
        console.log(resp)

        if (resp.message) {
            let msg = document.getElementById('confirm-msg');
            let pop = document.getElementById('show-pop');
            pop.innerHTML = `Slot confirmed ${userN}, please join at 2PM without fail!`
            form.style.display = "none";
            msg.style.display = "block";
            setTimeout(()=>{
                msg.style.display = "none";
                window.location.href = '/';
                
            },3000)
        }
        
    }
    sendData();
  
}


function cancelSlot(e) {

    const id = e.currentTarget.id;
    const toDelete = { id : id.split("-")};

    let deleteData = async () =>{

        let send = await fetch('http://localhost:4000/deletedata',{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(toDelete)
        })
        let resp = await send.json();
        console.log(resp)
    
        if (resp.message) {
            window.location.href = '/';
        }
        
    }
    deleteData();
}
