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
    const signup_btn = document.getElementById("signup-btn");
    const login_url = `${pages.baseURL}/login`;
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

            if(response.data[1] == "Success"){
                window.location.href="./home.html";
            } else{
                login_error.innerHTML="Wrong username or password";
            }
        } else{
            login_error.innerHTML="Please enter all feilds";
        }
    })

    
    signup_btn.addEventListener("click", async () => {

        const signup_url = `${pages.baseURL}/signup`
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
        const api_data = new URLSearchParams();
        api_data.append("full_name",signup_fullname.value);
        api_data.append("username",signup_username.value);
        api_data.append("password",signup_pass.value);
        api_data.append("age",signup_age.value);
        api_data.append("gender",gender);
        api_data.append("interested",interested);
        api_data.append("location",signup_location.value);

        const response = await pages.postAPI(signup_url,api_data);
        console.log(response)
    })
}
