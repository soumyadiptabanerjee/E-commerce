const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
let loadMoreBtn = document.querySelector('.load-more');
let curItem = 4;
if(bar){
    bar.addEventListener('click', () =>{
         nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click', (e) =>{
        nav.classList.remove('active');
        e.preventDefault();
   })
}

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.pro')];
    
    for(var i = curItem; i < curItem + 4; i++){
        boxes[i].style.display = 'inline-block';
    }
    curItem += 4;
    if(curItem >= boxes.length){
        loadMoreBtn.style.display = 'none';
    }
}

function talk(){
    var know = {
        "hello" : "Hey!",
        "hi" : "Hey!",
        "hey" : "Hey!",
        "who are you" : "Hello Soumyadipta here",
        "what you do" : "we are a group of web developers",
        "how are you" : "Good :)"
    };
    var user = document.getElementById('userBox').value;
    // document.getElementById('chatLog').innerHTML = user + '<br>';
    if(user in know){
        document.getElementById('chatLog').innerHTML = know[user] + '<br>';
    }
    else{
        document.getElementById('chatLog').innerHTML = 'sorry, I cannot understand <br>';
    }
}


let register_btn = document.querySelector('.register');
let login_btn = document.querySelector('.login');
register_btn.addEventListener('click', (e) => {
    console.log('clicked');
    e.preventDefault();
    let formData = {
            username : document.querySelector('.usernameUP').value,
            email : document.querySelector('.emailUP').value,
            password : document.querySelector('.passUP').value
        }

        let signUp = localStorage.getItem('signUp');
    signUp = JSON.parse(signUp);

        if(signUp !=  null){
            signUp = {
                ...signUp,
                [formData.username]: formData
            }
        }
        else{
            signUp = {
                [formData.username]: formData
            }
        }
        localStorage.setItem('signUp', JSON.stringify(signUp));
    
})

login_btn.addEventListener('click', (e) => {
    e.preventDefault();
    let signUp = localStorage.getItem('signUp');
    signUp = JSON.parse(signUp);
    let arr_signUp = Object.entries(signUp);
    let username = document.querySelector('.usernameIn').value;
    let password = document.querySelector('.passIn').value;
    let icon = document.querySelector('.batch');
    let filter1 = arr_signUp.map((u, i) => {
        if(username === arr_signUp[i][0] && password === arr_signUp[i][1].password)
        {
            let user = arr_signUp[i][1].username;
            let letter = user.charAt(0);
            icon.innerHTML = `
            <a href="signup.html" class="me-3 circle cart " >
            ${letter}
            </a>
            `
        }
    })
})





