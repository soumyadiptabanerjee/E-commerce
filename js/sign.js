const signinBtn = document.querySelector('.signinBtn');
const signupBtn = document.querySelector('.signupBtn');
const formBx = document.querySelector('.formBx');
const body = document.querySelector('body');
const bar = document.getElementById('bar');
        const close = document.getElementById('close');
        const nav = document.getElementById('navbar');

        signupBtn.onclick = function(){
            formBx.classList.add('active');
            body.classList.add('active');
        } 
        signinBtn.onclick = function(){
            formBx.classList.remove('active');
            body.classList.remove('active');
        }
        
        
        if(bar){
            bar.addEventListener('click', () =>{
                 nav.classList.add('active');
            })
        }
        if(close){
            close.addEventListener('click', () =>{
                nav.classList.remove('active');
           })
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
