const pages = {};
pages.baseURL = "http://127.0.0.1:8000/api";

pages.Console = (title, values, oneValue = true) => {
    console.log('---' + title + '---');
    if(oneValue){
        console.log(values);
    }else{
        for(let i =0; i< values.length; i++){
            console.log(values[i]);
        }
    }
    console.log('--/' + title + '---');
}

pages.getAPI = async (api_url) => {
    try{
        return await axios(api_url);
    }catch(error){
        pages.Console("Error from GET API", error);
    }
}

pages.postAPI = async (api_url, api_data, api_token = null) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            { headers:{
                    'Authorization' : "token " + api_token
                }
            }
        );
    }catch(error){
        pages.Console("Error from POST API", error);
    }
}

pages.loadFor = (page) => {
    eval("pages.load_" + page + "();");
}

const load_user_cards = (users,wrapper) =>{
    for(let i = 0;i<users.length;i++){
        wrapper.innerHTML +=`<div class="contact-card light-bg round-edges">
                                <div class="card-contents flex column">
                                    <div class="picture">
                                        <img src="" alt="">
                                    </div>
                                    <p>${users[i].username}</p>
                                    <div class="center-bottom-card flex row">
                                        <button data-value="${users[i].id}" class="btn view-btn white-bg round-edges dark-txt">View</button>
                                        <button data-value="${users[i].id}" class="btn fav-btn dark-bg round-edges light-txt">Like</button>
                                    </div>
                                </div>
                            </div>`
    }
}

const view_fav_events = () => {
    const view_btns = document.querySelectorAll(".view-btn");

    view_btns.forEach(view =>{
        view.addEventListener("click", () => {
            
            const clicked_id = view.getAttribute("data-value");
            localStorage.setItem("clicked_id",clicked_id);
            window.location.href="./show_user.html";

        })
    })

    const fav_btns = document.querySelectorAll(".fav-btn");
    const username = localStorage.getItem("username")
    const add_favorite_url =`${pages.baseURL}/favorite`
    fav_btns.forEach(fav => {
        fav.addEventListener("click", async () => {
            fav_data = new URLSearchParams;
            const fav_id = fav.getAttribute("data-value");
            fav_data.append("username",username);
            fav_data.append("fav_id",fav_id);

            const response = await pages.postAPI(add_favorite_url,fav_data);
        })
    });
}

const messages_loader = (messages,clicked_id,username,container) => {
console.log(messages[0].sender_id)
    for(let i = 0;i<messages.length;i++){
        if(messages[i].sender_id == clicked_id){
            container.innerHTML+=`<div class="message flex column dark-bg round-edges">
                                        <p class="message-username white-txt">${username}</p>
                                        <p class="message-content white-txt">${messages[i].message_content}</p>
                                    </div>`
        }else{
            container.innerHTML+=`<div class="message flex column medium-bg round-edges">
                                        <p class="message-username white-txt">You</p>
                                        <p class="message-content white-txt">${messages[i].message_content}</p>
                                    </div>`
        }
    }
}


pages.load_register = async () => {

    const login_container = document.getElementById("login-content")
    const signup_container = document.getElementById("signup-content")
    const login_content_btn = document.getElementById("login-content-button");
    const signup_content_btn = document.getElementById("signup-content-btn");
    const login_username = document.getElementById("login-username");
    const login_password = document.getElementById("login-pass");
    const login_btn = document.getElementById("login-btn");
    const signup_btn = document.getElementById("signup-btn");
    const login_url = `${pages.baseURL}/register/login`;
    const login_error = document.getElementById("login-error");

    const registration_content = () => {
        login_container.classList.toggle("hide");
        signup_container.classList.toggle("hide");
    }

    signup_content_btn.addEventListener("click",registration_content);
    login_content_btn.addEventListener("click",registration_content);
    
    login_btn.addEventListener("click",async() => {
        if(login_username.value != "" && login_password.value != ""){
            const api_data = new URLSearchParams();
            api_data.append("username",login_username.value);
            api_data.append("password",login_password.value);

            const response = await pages.postAPI(login_url,api_data);

            if(response.data.status == "Success"){
                localStorage.setItem("username",login_username.value)
                window.location.href="./home.html";
            } else{
                login_error.innerHTML="Wrong username or password";
            }
        } else{
            login_error.innerHTML="Please enter all feilds";
        }
    })

    
    signup_btn.addEventListener("click", async () => {

        const signup_url = `${pages.baseURL}/register/signup`;
        const signup_error = document.getElementById("signup-error");
        const signup_fullname = document.getElementById("signup-fullname");
        const signup_username = document.getElementById("signup-username");
        const signup_pass = document.getElementById("signup-pass");
        const signup_age = document.getElementById("signup-age");
        const gender_radios = document.getElementsByName("gender");
        const interested_radios = document.getElementsByName("interested");
        const signup_location = document.getElementById("signup-location");
        let gender = "";
        let interested = "";

        for(let i = 0;i<gender_radios.length;i++){
            if (gender_radios[i].checked){
                gender = gender_radios[i].value
            }
        }

        for(let i = 0;i<interested_radios.length;i++){
            if (interested_radios[i].checked){
                interested = interested_radios[i].value
            }
        }
        if(signup_fullname.value !="" && signup_username.value !="" && signup_pass.value && signup_age.value !="" && gender!="" && interested !=""){
            const api_data = new URLSearchParams();
            api_data.append("full_name",signup_fullname.value);
            api_data.append("username",signup_username.value);
            api_data.append("password",signup_pass.value);
            api_data.append("age",signup_age.value);
            api_data.append("gender",gender);
            api_data.append("interested",interested);
            api_data.append("location",signup_location.value);

            const response = await pages.postAPI(signup_url,api_data);
            console.log(response);
            
            if(response.data.status == "Success"){
                localStorage.setItem("username",signup_username.value);
                window.location.href="./home.html";
            } else{
                signup_error.innerHTML="Username already taken";
            }
        }else{
            signup_error.innerHTML="Please enter all feilds";
        }
    })
}

pages.load_home = async () => {
    const home_wrapper = document.getElementById("home-wrapper");
    const favorite_wrapper = document.getElementById("favorite-wrapper");
    const load_interested_url = `${pages.baseURL}/home`;
    const load_favorites_url = `${pages.baseURL}/get_favorites`;
    const add_favrite_url = `${pages.baseURL}/favorite`;
    const username = localStorage.getItem("username");
    const home_btn = document.getElementById("home-btn");
    const favorite_btn = document.getElementById("favorite-btn");
    const profile_btn = document.getElementById("profile-btn");
    const home_container = document.getElementById("home-container");
    const favorite_container = document.getElementById("favorite-container");
    
    const load_data = new URLSearchParams();
    load_data.append("username",username);
    const interested_users = await pages.postAPI(load_interested_url,load_data);
    load_user_cards(interested_users.data,home_wrapper);
    view_fav_events();
    

    favorite_btn.addEventListener("click", async () => {
        favorite_btn.classList.remove("white-bg","dark-txt");
        favorite_btn.classList.add("medium-bg","white-txt");
        home_btn.classList.remove("medium-bg","white-txt");
        home_btn.classList.add("white-bg","dark-txt");
        profile_btn.classList.remove("medium-bg","white-txt");
        profile_btn.classList.add("white-bg","dark-txt");
        home_container.classList.add("hide");
        favorite_container.classList.remove("hide");

        const favorites_api_data = new URLSearchParams();
        const username = localStorage.getItem("username");
        favorites_api_data.append("username",username);
        const favorite_response = await pages.postAPI(load_favorites_url,favorites_api_data);
        const favorite_users = favorite_response.data;
        load_user_cards(favorite_users,favorite_wrapper);

        view_fav_events();
        
    })

    profile_btn.addEventListener("click", () => {
        profile_btn.classList.remove("white-bg","dark-txt");
        profile_btn.classList.add("medium-bg","white-txt");
        favorite_btn.classList.remove("medium-bg","white-txt");
        favorite_btn.classList.add("white-bg","dark-txt");
        home_btn.classList.remove("medium-bg","white-txt");
        home_btn.classList.add("white-bg","dark-txt");
    })

    home_btn.addEventListener("click", () => {
        home_btn.classList.remove("white-bg","dark-txt");
        home_btn.classList.add("medium-bg","white-txt");
        favorite_btn.classList.remove("medium-bg","white-txt");
        favorite_btn.classList.add("white-bg","dark-txt");
        profile_btn.classList.remove("medium-bg","white-txt");
        profile_btn.classList.add("white-bg","dark-txt");
        
        home_container.classList.remove("hide");
        favorite_container.classList.add("hide");

        favorite_wrapper.innerHTML = "";
    })
}

pages.load_show_user = async () => {
    const full_name = document.getElementById("full-name");
    const username = document.getElementById("username");
    const bio = document.getElementById("bio");
    const gender = document.getElementById("gender");
    const interest = document.getElementById("interest");
    const location = document.getElementById("location");
    const profile_name = document.getElementById("profile-name");
    const user_info_url = `${pages.baseURL}/user_info`;
    const get_messages_url = `${pages.baseURL}/receive_messages`;
    const send_messages_url = `${pages.baseURL}/send_message`;
    const chat_content = document.getElementById("chat-content");
    const clicked_user_id = localStorage.getItem("clicked_id");
    const send_bar = document.getElementById("send-bar");
    const send_button = document.getElementById("send-button");
    const clicked_user_data = new URLSearchParams();
    clicked_user_data.append("clicked_id",clicked_user_id)
    
    const info = await pages.postAPI(user_info_url,clicked_user_data);
    
    const user_info = info.data[0];
    full_name.innerHTML = user_info.full_name;
    username.innerHTML = user_info.username;
    bio.innerHTML = user_info.bio;
    gender.innerHTML = user_info.gender;
    interest.innerHTML = user_info.interested;
    location.innerHTML = user_info.location;
    profile_name.innerHTML = user_info.username;

    const chat_between = new URLSearchParams();
    const my_username = localStorage.getItem("username");
    chat_between.append("username",my_username)
    chat_between.append("user_id",clicked_user_id)
    const chats = await pages.postAPI(get_messages_url,chat_between); 
    messages_loader(chats.data,clicked_user_id,user_info.username,chat_content)

    send_button.addEventListener("click", async () => {
        const message = send_bar.value;
        const message_data = new URLSearchParams();
        message_data.append("message_content",message);
        message_data.append("username",my_username);
        message_data.append("receiver_id",clicked_user_id);

        const send = await pages.postAPI(send_messages_url,message_data);
        

    })
}