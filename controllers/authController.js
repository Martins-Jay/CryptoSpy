import * as authView from '../views/authView.js';
import * as authModel from '../models/authModel.js';
import * as formValidator from '../helpers/formValidator.js';
import * as domHelpers from '../helpers/domHelpers.js';
import { updateUserInfo } from './menu/menuController.js';

const {
  loginForm,
  signupForm,
  textCenter,
  toggleSignupBtn,
  toggleLoginBtn,
  passwordInputFields,
  toggleEyeBtns,
  loaderEl,
  clearLoginErrors,
  clearSignupErrors,
  loginFieldElements,
  signupFieldElements,
  getLoginFormData,
  getSignupFormData,
} = authView;

const { registerUser, loginUser } = authModel;

const { isValidName, isValidEmail, isValidPassword, validateInputField } =
  formValidator;

// This variable keeps track of whether the current view is signup or login
let signupstate = false; // false = login view, true = signup view

// Passed to initAuthToggle as a callback. It would be executed on a click event by user & used in signup function
const changeAuthView = (e) => {
  signupstate = !signupstate; // True

  // Toggle visibility of forms
  loginForm.classList.toggle('hidden');
  signupForm.classList.toggle('hidden');

  // Reset the correct form when switching
  if (signupstate) {
    loginForm.reset();
    clearLoginErrors();
  } else {
    signupForm.reset();
    clearSignupErrors();
  }

  // Toggle which button is shown
  toggleSignupBtn.classList.toggle('hidden');
  toggleLoginBtn.classList.toggle('hidden');

  // Change header text
  textCenter.textContent = signupstate
    ? 'Create an account'
    : 'Login to your account';
  //  If signupstate is true, textContent = 'Create an account' if false, textContent = 'Login to your account'
};

export function initAuthToggle() {
  toggleSignupBtn.addEventListener('click', changeAuthView);
  toggleLoginBtn.addEventListener('click', changeAuthView);
}

export function initTogglePasswordVisibility() {
  toggleEyeBtns.forEach((eyeBtn, index) => {
    eyeBtn.addEventListener('click', () => {
      const useTag = eyeBtn.querySelector('use');
      if (!useTag) return; // safety check

      const currentIcon = useTag.getAttribute('xlink:href');

      const inputFieldClicked = passwordInputFields[index];

      inputFieldClicked.type =
        inputFieldClicked.type === 'password' ? 'text' : 'password';
      if (currentIcon === '#icon-eye-closed') {
        useTag.setAttribute('xlink:href', '#icon-eye-open');
      } else {
        useTag.setAttribute('xlink:href', '#icon-eye-closed');
      }
    });
  });
}

export function handleLoginValidation() {
  const emailErrorElements_obj = loginFieldElements('email');
  const passwordErrorElements_obj = loginFieldElements('password');

  // Extracting elements from object
  // 1) Email
  const emailInputEl = emailErrorElements_obj.input;
  const emailErrContainerEl = emailErrorElements_obj.errorContainer;
  const emailErrTextEl = emailErrorElements_obj.errorText;

  // 2) Password
  const passwordInputEl = passwordErrorElements_obj.input;
  const passwordErrContainerEl = passwordErrorElements_obj.errorContainer;
  const passwordErrTextEl = passwordErrorElements_obj.errorText;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    const { loginEmail, loginPassword } = getLoginFormData();

    // Email input field
    const emailValid = validateInputField(
      emailInputEl,
      isValidEmail,
      emailErrContainerEl,
      emailErrTextEl,
      'Please enter a valid email'
    );

    // Password input field
    const passwordValid = validateInputField(
      passwordInputEl,
      isValidPassword,
      passwordErrContainerEl,
      passwordErrTextEl,
      'Minimum 6 chars, letters & numbers'
    );

    if (emailValid && passwordValid) {
      try {
        loaderEl.classList.remove('hidden');

        const user = await loginUser(loginEmail, loginPassword);
        form.reset();
      } catch (error) {
        const formattedError = error.code
          ? error.code.replace('auth/', '').replace('-', ' ')
          : error.message;

        // Handle error
        emailErrContainerEl.classList.remove('hidden');
        passwordErrContainerEl.classList.remove('hidden');
        emailErrTextEl.textContent = formattedError;
        passwordErrTextEl.textContent = formattedError;
      } finally {
        loaderEl.classList.add('hidden');
      }

      setTimeout(() => {
        loaderEl.classList.add('hidden'); // Hide loader after 4sec
        signupForm.reset(); // Clear input form
      }, 4000);
    }
  });
}

export function handleSignupValidation() {
  const nameElements_obj = signupFieldElements('name');
  const emailErrorElements_obj = signupFieldElements('email');
  const passwordElements_obj = signupFieldElements('password');
  const confirmPasswordElements_obj = signupFieldElements('password--check');

  // Extracting elements from object
  // 1) Name
  const nameInputEl = nameElements_obj.input;
  const nameErrContainerEl = nameElements_obj.errorContainer;
  const nameErrTextEl = nameElements_obj.errorText;
  // 2) Email
  const emailInputEl = emailErrorElements_obj.input;
  const emailErrContainerEl = emailErrorElements_obj.errorContainer;
  const emailErrTextEl = emailErrorElements_obj.errorText;
  // 3) Password
  const passwordInputEl = passwordElements_obj.input;
  const passwordErrContainerEl = passwordElements_obj.errorContainer;
  const passwordErrTextEl = passwordElements_obj.errorText;
  // 4) Password-confirm
  const confirmPasswordInputEl = confirmPasswordElements_obj.input;
  const confirmPasswordErrContainerEl =
    confirmPasswordElements_obj.errorContainer;
  const confirmPasswordErrTextEl = confirmPasswordElements_obj.errorText;

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target; // The form element
    const { signupName, signupEmail, signupPassword } = getSignupFormData();
    console.log(signupName, signupEmail, signupPassword);

    // Name validate
    const nameValid = validateInputField(
      nameInputEl,
      isValidName,
      nameErrContainerEl,
      nameErrTextEl,
      'Only 2-30 letters allowed'
    );

    // Email validate
    const emailValid = validateInputField(
      emailInputEl,
      isValidEmail,
      emailErrContainerEl,
      emailErrTextEl,
      'Please enter a valid email'
    );

    // Password validate
    const passwordValid = validateInputField(
      passwordInputEl,
      isValidPassword,
      passwordErrContainerEl,
      passwordErrTextEl,
      'Min 4 chars, letters & numbers'
    );

    // Confirm password validate
    const passwordValue = passwordInputEl.value.trim();
    const confirmPasswordValue = confirmPasswordInputEl.value.trim();

    let confirmPasswordValid = true;
    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordErrContainerEl.classList.remove('hidden');
      confirmPasswordErrTextEl.textContent = 'password do not match';
      confirmPasswordValid = false;
    } else {
      confirmPasswordErrContainerEl.classList.add('hidden');
    }

    if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
      try {
        loaderEl.classList.remove('hidden'); // Show spinner

        const user = await registerUser(
          signupName,
          signupEmail,
          signupPassword
        );

        updateUserInfo(user);
        changeAuthView();
        document.getElementById('auth-section').classList.add('hidden');

        form.reset(); // Clear form inputs
      } catch (error) {
        const formattedError = error.code
          ? error.code.replace('auth/', '').replace(/-/g, ' ')
          : error.message;

        emailErrContainerEl.classList.remove('hidden');
        emailErrTextEl.textContent = formattedError;
      } finally {
        loaderEl.classList.add('hidden'); // Show spinner
      }
    }
  });
}
