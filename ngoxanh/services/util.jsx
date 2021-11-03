import moment from 'moment';

var numeral = require('numeral');
// const lang = require('../locale/lang.json')

export const getUrl = (path) => {
  if (process.browser) {
    return `/api/${path}`;
  } else {
    return `${process.env.API_BASE_URL}/${path}`;
  }
};

export const getDefaultHeaders = (token = '') => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  return headers;
}

export const redirectTo = (context, location) => {
  context.res.writeHead(302, { Location: location });
  context.res.end();
}

export const formatDate = (unixtime, format = 'DD/MM/YYYY') => {
  const datetime = moment(unixtime);
  return datetime.format(format);
}

export const validateInput = (inputName, inputValue) => {
  let errorTxt = "";
  const regexpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const regexpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  if(inputName === "email") {
    if(inputValue=== "") {
      errorTxt = "lang.common.validation_required";
    }else{
      if(regexpEmail.test(inputValue)) {
        errorTxt = "";
      }else{
        errorTxt = "lang.common.validation_email";
      }
    }
    
  }
  if(inputName === "password") {
    errorTxt = inputValue === "" ? "lang.common.validation_required" : "";
  }

  if(inputName === "password-condition") {
    if(inputValue=== "") {
      errorTxt = "lang.common.validation_required";
    }else{
      if(regexpPassword.test(inputValue)) {
        errorTxt = "";
      }else{
        errorTxt = "lang.common.validation_password_by_conditions";
      }
    }
  }
  return errorTxt;
}
export const comparePassword = (password, confirmPassword) => {
  return password !== confirmPassword ? "lang.common.validation_confirm_password_not_match" : "";
}

export const showDropdownMenu = (e, idElm) => {
  let dropdownList = document.querySelector("#"+idElm);

  //Reset class
  let allDropdownList = document.querySelectorAll(".c-dropdown__content");
  

  if(dropdownList.style.display === "none" || dropdownList.style.display === "") {
    e.currentTarget.classList.add("is-opened");
    dropdownList.style.display = "block";
  }else{
    e.currentTarget.classList.remove("is-opened");
    dropdownList.style.display = "none";
  }
}

export const checkProperties = (obj) => {
  for (var key in obj) {
      if (obj[key] !== null && obj[key] != "")
          return false;
  }
  return true;
}

export const validationEvaluationTitle = (title, regexp) => {
  if(regexp.test(title)) {
    return true;
  }else{
    return false;
  }
}

export const formatVND = (value) => {
  return numeral(value).format('0,0');
}

export const vndToInteger = (value) => {
  return numeral(value).value();
}