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

pages.load_register = async () => {

    const login_container = document.getElementById("login-content")
    const signup_container = document.getElementById("signup-content")
    const login_content_btn = document.getElementById("login-content-button");
    const signup_content_btn = document.getElementById("signup-content-btn");
    const login_username = document.getElementById("login-username");
    const login_password = document.getElementById("login-pass");
    const login_btn = document.getElementById("login-btn");
    const landing_url = `http://127.0.0.1:8000/api/register`;
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
            const response = await pages.postAPI(landing_url,api_data);
            if(response.data[1] == "Success"){
                window.location.href="./home.html";
            } else{
                login_error.innerHTML="Wrong username or password";
            }
        } else{
            login_error.innerHTML="Please enter all feilds";
        }
    })
}

