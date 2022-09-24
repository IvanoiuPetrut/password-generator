const inputPassword = document.getElementById("input--password");
const inputLength = document.getElementById("input--length");

const btnGenerate = document.getElementById("btn--generate");
const btnCopy = document.getElementById("btn--copy");

const labelCharaterLength = document.getElementById("character-length");
const passwordStrengtBars = document.querySelectorAll(
  "div.password-strength-bar"
);

let password = "";
let characterLength = 0;
let includeUppercase = true;
let includeLowercase = true;
let includeNumbers = true;
let includeSymbols = true;

btnGenerate.addEventListener("click", () => {
  generatePassword();
  inputPassword.value = password;
  updatePasswordStrength(password);
});

btnCopy.addEventListener("click", async () => {
  await navigator.clipboard.writeText(password);
});

inputPassword.addEventListener("input", (e) => {
  password = e.target.value;
  console.log(password);
  updatePasswordStrength(password);
});

inputLength.addEventListener("input", (e) => {
  characterLength = e.target.value;
  labelCharaterLength.innerText = characterLength;
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

function generatePassword() {
  password = "";
  for (let i = 0; i < characterLength; i++) {
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
  for (let i = 0; i < password.length; i++) {
    if (password.charAt(i) === password.charAt(i + 1)) {
      strength -= 1;
      break;
    }
  }
  return strength;
}

function updatePasswordStrength(password) {
  let strength = checkPasswordStrength(password);
  passwordStrengtBars.forEach((bar, index) => {
    if (index < strength) {
      bar.classList.add("bg-accent-color");
      bar.classList.add("border-gray-600");
      bar.classList.remove("border-gray-500");
    } else {
      bar.classList.add("border-gray-500");
      bar.classList.remove("bg-accent-color");
      bar.classList.remove("border-gray-600");
    }
  });
}
