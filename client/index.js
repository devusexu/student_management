const ApiService = axios.create({ 
  timeout: 10000, 
  baseURL: 'http://localhost:8000', 
  withCredentials: true, 
  withXSRFToken: true, 
});

const registerButton = document.querySelector('#register-button');
registerButton.addEventListener('click', handleRegister);

const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', handleLogin);

const logoutButton = document.querySelector('#logout-button');
logoutButton.addEventListener('click', handleLogout);

const userBlock = document.querySelector('#user-block');

async function handleRegister(event) {
  event.preventDefault();
  try {
    const form = document.querySelector('#register-form');
    const formData = new FormData(form);

    const response = await ApiService.post('/register', formData);
    populateUserInfo(response.data);
    toggleDisplay();
  } catch (errors) {
    document.querySelector('#register-error').textContent = JSON.parse(errors.request.response).message;
  }
}

async function handleLogin(event) {
  event.preventDefault();
  try {
    const form = document.querySelector('#login-form');
    const formData = new FormData(form);

    const response = await ApiService.post('/login', formData);
    populateUserInfo(response.data);
    toggleDisplay();
  } catch (errors) {
    document.querySelector('#login-error').textContent = JSON.parse(errors.request.response).message;
  }
}

async function handleLogout() {
  try {
    await ApiService.post('/logout');
    toggleDisplay();
  } catch (errors) {
    document.querySelector('#logout-error').textContent = JSON.parse(errors.request.response).message;
  }
}

function populateUserInfo(info) {
  userBlock.textContent = JSON.stringify(info);
}

const authenticatedBlock = document.querySelector('#authenticated'); 
const unauthenticatedBlock = document.querySelector('#unauthenticated'); 

function toggleDisplay() {
  authenticatedBlock.classList.toggle('hidden');
  unauthenticatedBlock.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', async function() {
	try {
    const user = await ApiService.get('/api/user');
    populateUserInfo(user.data);
    authenticatedBlock.classList.remove('hidden');
	} catch (errors) {
    document.querySelector('#not-logined').textContent = 'Please register or log in.';
    unauthenticatedBlock.classList.remove('hidden');
	}
});
