let contestant_name = document.getElementById('full-name');
let contestant_img = document.getElementById('image');
let contestant_arr = [];
let database = localStorage;
let data;
let vote_tickets;
let  votes = 0;
let rank = [];
function createContestant(){
    let id = Math.floor(Math.random() * 100);
    let contestant = {
        id: id,
        name: contestant_name.value,
        image: contestant_img.value,
        votes: votes
    }
    contestant_arr.push(contestant);
    if(database.length === 0){
        database.setItem('contestant', JSON.stringify(contestant_arr));
        JSON.parse(database.getItem('contestant'));
        data = database.getItem('contestant')
        displayContestants();
    }
    else{
        let new_contestant = JSON.parse(localStorage.getItem('contestant'));
        new_contestant.push(contestant);
        let updated_contestant_box = new_contestant;
        database.setItem('contestant', JSON.stringify(updated_contestant_box));
        displayContestants();
    }
}

function displayContestants(){
    data = JSON.parse(database.getItem('contestant'));
    let data_keys = Object.keys(data);
    document.querySelector('tbody').innerHTML = "";
    data_keys.forEach(ele=>{
        let html = `<tr>
                <td>${data[ele].id}</td>
                <td><img src="${data[ele].image}" alt="" height="15%"></td>
                <td>${data[ele].name}</td>
                <td>
                    <input name="vote" type="radio" value ="1" class="voter" id = "${ele}">
                </td>
            </tr>`
        document.querySelector('tbody').insertAdjacentHTML('beforeend', html)
    })
    vote_tickets = document.querySelectorAll('tbody td input');
}

function voting(){
    vote_tickets.forEach((item, index) => {
        if(item.checked){
            votes = 0;
            votes += parseInt(item.value);
            data[index].votes = data[index].votes + votes;
            database.setItem('contestant', JSON.stringify(data));
            ranking()
            displayContestants();
        }
    })
}

function ranking(){
    data = JSON.parse(database.getItem('contestant'));
    let data_keys = Object.keys(data);
    let obj = {};
    let obj2 = {};
    let arr2 = [];
    data_keys.forEach(ele => {
        obj[ele] = data[ele].votes;
        obj2[ele] = data[ele].votes;
        rank.push(data[ele].votes)
    })
    rank.sort((a, b)=>{return b-a})
    rank.forEach(ele => {
        data_keys.forEach(ele2 => {           
            if(ele === obj[ele2]){
                arr2.push(ele2);
                delete obj[ele2]
            }
        })
    })
    document.getElementById('ranking').innerHTML=""
    arr2.forEach(ele => {
        let index = parseInt(ele)
        let html = `<tr>
            <td>${data[index].id}</td>
            <td><img src="${data[index].image}" alt="" height="15%"></td>
            <td>${data[index].name}</td>
            <td>${data[index].votes}</td>
        </tr>`
        document.getElementById('ranking').insertAdjacentHTML('beforeend', html)
    })
    rank = []
}
displayContestants();
ranking();

