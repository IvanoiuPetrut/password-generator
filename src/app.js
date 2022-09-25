const inputPassword = document.getElementById("input--password");
const inputLength = document.getElementById("input--length");
const inputIncludeUppercase = document.getElementById("include-uppercase");
const inputIncludeLowercase = document.getElementById("include-lowercase");
const inputIncludeNumbers = document.getElementById("include-numbers");
const inputIncludeSymbols = document.getElementById("include-symbols");

const btnGenerate = document.getElementById("btn--generate");
const btnCopy = document.getElementById("btn--copy");

const labelCharaterLength = document.getElementById("character-length");
const labelPasswordStrength = document.getElementById("password-strength");
const passwordStrengtBars = document.querySelectorAll(
  "div.password-strength-bar"
);

let password = "";
let characterLength = 0;
let includeUppercase = false;
let includeLowercase = true;
let includeNumbers = false;
let includeSymbols = false;
let passwordStrengthMeter = "";
let passwordStrengthColor = "";
let isCopyPopupVisible = false;

btnGenerate.addEventListener("click", () => {
  generatePassword(password, characterLength);
  inputPassword.value = password;
  updatePasswordStrength(password);
});

btnCopy.addEventListener("click", async () => {
  await navigator.clipboard.writeText(password);
  if (!isCopyPopupVisible) {
    isCopyPopupVisible = !isCopyPopupVisible;
    btnCopy.classList.remove("after:opacity-0");
    btnCopy.classList.add("after:scale-100");
    setTimeout(() => {
      btnCopy.classList.remove("after:scale-100");
      btnCopy.classList.add("after:opacity-0");
      isCopyPopupVisible = !isCopyPopupVisible;
    }, 1000);
  }
});

inputPassword.addEventListener("input", (e) => {
  password = e.target.value;
  console.log(password);
  updatePasswordStrength(password);
});

inputLength.addEventListener("input", (e) => {
  characterLength = e.target.value;
  labelCharaterLength.innerText = characterLength;
  sliderBgColor(inputLength, "#A4FFAF");
});

inputIncludeUppercase.addEventListener("input", (e) => {
  includeUppercase = e.target.checked;
});

inputIncludeLowercase.addEventListener("input", (e) => {
  includeLowercase = e.target.checked;
});

inputIncludeNumbers.addEventListener("input", (e) => {
  includeNumbers = e.target.checked;
});

inputIncludeSymbols.addEventListener("input", (e) => {
  includeSymbols = e.target.checked;
});

function generateCharacter() {
  let characters = "";
  if (includeUppercase) {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (includeLowercase) {
    characters += "abcdefghijklmnopqrstuvwxyz";
  }
  if (includeNumbers) {
    characters += "0123456789";
  }
  if (includeSymbols) {
    characters += "!@#$%^&*()_+";
  }
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

function generatePassword(_password, length) {
  password = "";
  for (let i = 0; i < length; i++) {
    password += generateCharacter();
  }
}

function checkPasswordStrength(password) {
  let strength = 0;
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }
  if (password.length > 12) {
    strength += 1;
  }
  return strength;
}

function updatePasswordStrengthColor(strength, _passwordStrengthColor) {
  switch (strength) {
    case 0:
      passwordStrengthColor = "bg-red-600";
      break;
    case 1:
      passwordStrengthColor = "bg-red-600";
      break;
    case 2:
      passwordStrengthColor = "bg-yellow-600";
      break;
    case 3:
      passwordStrengthColor = "bg-sky-500";
      break;
    case 4:
      passwordStrengthColor = "bg-sky-500";
      break;
    case 5:
      passwordStrengthColor = "bg-accent-color";
      break;
  }
}

function updatePasswordStrengthText(strength) {
  switch (strength) {
    case 0:
      return "Very Weak";

    case 1:
      return "Weak";

    case 2:
      return "Fair";

    case 3:
      return "Strong";

    case 4:
      return "Very Strong";

    case 5:
      return "Excellent";
  }
}

function updatePasswordStrength(password) {
  let strength = checkPasswordStrength(password);
  updatePasswordStrengthColor(strength, passwordStrengthColor);
  labelPasswordStrength.innerText = updatePasswordStrengthText(strength);
  labelPasswordStrength.classList.remove("hidden");

  passwordStrengtBars.forEach((bar, index) => {
    bar.classList.remove("bg-red-600");
    bar.classList.remove("bg-yellow-600");
    bar.classList.remove("bg-sky-500");
    bar.classList.remove("bg-accent-color");
    if (index < strength) {
      bar.classList.add(passwordStrengthColor);
      bar.classList.add("border-gray-600");
      bar.classList.remove("border-gray-500");
    } else {
      bar.classList.add("border-gray-500");
      bar.classList.remove(passwordStrengthColor);
      bar.classList.remove("border-gray-600");
    }
  });
}

function sliderBgColor(slider, color) {
  const valPercent = (slider.value / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, ${color} ${valPercent}%, #0F0E14 ${valPercent}%)`;
}
