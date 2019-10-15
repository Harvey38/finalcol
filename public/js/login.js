// const axios = require('axios');
const form = document.querySelector(".login-form");
// const axios = require("axios");
const forget = document.querySelector('.forget');
const button = document.querySelector("#buttonout");
const url = window.location.href;
const purl = url.split('/')[4].split('?')[1];
// console.log(purl);

  let forgetform = document.getElementById('forgetform');
  if (forgetform) {
    console.log('forgetform')
    forgetform.addEventListener('submit', (e) => {
      e.preventDefault();
      let password = document.getElementById('password').value;
      let cpassword = document.getElementById('cpassword').value;
      let obj = {
        "password": password,
        "confirmPassword": cpassword

      }
      if (password != cpassword) {
        alert('Password and confirm password doesnt match')
        location.reload(true)
      } else {
        console.log(obj)
        axios.patch('/user/resetPassword?' + purl, obj).then((res) => {
          console.log('reset')
          console.log(res.data);
          alert(res.data.status);
          location.assign('/');
        }).catch((err) => {
          alert(err.response.status);
          console.log(err.response);
          location.assign('/');
        })
      }

    })
  }
  const logout = async () => {
    try {
      const res = await axios.get("/user/logout");
      //  console.log(res+"uhdfuhfi");
      // const res;
      if (res.data.status === "user logged out") {
        alert("User logged out");
        window.setTimeout(() => {
          location.assign("/home", 1000);
        });
      }
    } catch (err) {
      console.log("hello" + err);
    }
  };
  const login = async (email, password) => {
    //  alert("Email :"+email+"  Password: "+ password);
    try {
      const data = { email, password };
      console.log(data);
      const res = await axios.post("/user/login", data);
      //  console.log(res+"uhdfuhfi");
      // const res;
      console.log(res.data.status + "qiwejfiwe");
      if (res.data.status === "user logged in") {
        alert("User logged in");
        window.setTimeout(() => {
          location.assign("/api/profile", 1000);
        });
      }

    } catch (err) {
      console.log("Inside error catch block")
      alert("Email or password incorrect");
      console.log("hello" + err);
    
    }
  };
  if (button) {
    console.log("hello");
    button.addEventListener("click", e => {
      e.preventDefault();
      logout();
    });
  }

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      console.log(email);
      console.log(password);
      login(email, password);
    });
  }
  if (forget) {
    forget.addEventListener('click', (e) => {
      e.preventDefault();
      let email = document.getElementById('forgetemail');
      console.log(email.value)
      let obj = {
        'email': email.value
      }
      let note = document.querySelector('.note');
      axios.post('/user/forgetPassword', obj).then((res) => {
        if (res.data.status == 'Email sent') {
          note.style.display = 'block';
          console.log('hello')
          setTimeout(() => {

            location.assign('/');
          }, 3000)
        }
        else {
          alert(res.data.status)
        }
      }).catch((err) => {
        console.log(err)
        alert('Error Occured');
        console.log(err.response);
        location.assign('/');
      })
    })
}
const updatepassword = document.querySelector(".resetform");
console.log(updatepassword);
if (updatepassword) {
  updatepassword.addEventListener("submit", (e) => {
    e.preventDefault();
    let currentpass = document.getElementById("cpass").value;
    let newpass = document.getElementById("npass").value;
    let confirmpass = document.getElementById("conpass").value;
    console.log(currentpass);
    // let phone = document.getElementById("phone").value;
    updatep(currentpass, newpass, confirmpass);
  })
}
const updatep = (currentpass, newpass, confirmpass) => {
  try {

    axios.patch('/user/updatepass', {
      currentpass: currentpass,
      newpass: newpass,
      confirmpass: confirmpass
    }).then((res) => {
      if (res.data.status == "user update password") {
        alert("User update");
        console.log(res);
        window.setTimeout(() => {
          location.assign("/");
        }, 1000);
      }
    })
  }
  catch (err) {
    console.log(err);
  }
}
