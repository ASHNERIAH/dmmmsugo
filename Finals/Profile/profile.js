document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');
  
    // tatno masave jay info and pic ti nagsave button
    let state = JSON.parse(localStorage.getItem('profileState')) || {
      file: '',
      imagePreviewUrl: '../Profile/image/profile.jpg',
      name: '',
      status: '',
      active: 'edit'
    };
  
    function saveState() {
      localStorage.setItem('profileState', JSON.stringify(state));
    }
  
    function createCard() {
      root.innerHTML = '';
  
      if (state.active === 'edit') {
        createEditForm();
      } else {
        createProfileCard();
      }
    }
//   pang pic upload
    function createEditForm() {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const form = document.createElement('form');
      form.onsubmit = handleSubmit;
  
      const title = document.createElement('h1');
      title.textContent = 'Profile Card';
  
      const imgWrap = document.createElement('div');
      imgWrap.classList.add('img-wrap', 'img-upload');
  
      const img = document.createElement('img');
      img.src = state.imagePreviewUrl;
      img.id = 'image-upload';
  
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.id = 'photo-upload';
      fileInput.style.display = 'none';
      fileInput.accept = 'image/*';
  
      fileInput.addEventListener('change', photoUpload);
  
    //   wow magic pindot pic open file
      imgWrap.addEventListener('click', function() {
        fileInput.click();
      });
  
      imgWrap.appendChild(img);
      imgWrap.appendChild(fileInput);
  
      form.appendChild(title);
      form.appendChild(imgWrap);
      form.appendChild(createField('Name:', 'name', state.name, editName));
      form.appendChild(createField('Course:', 'Course', state.status, editStatus));
  
      const saveButton = document.createElement('button');
      saveButton.type = 'submit';
      saveButton.textContent = 'Save';
      saveButton.classList.add('save');
  
      form.appendChild(saveButton);
      card.appendChild(form);
      root.appendChild(card);
    }
  
    function createProfileCard() {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const form = document.createElement('form');
      form.onsubmit = handleSubmit;
  
      const title = document.createElement('h1');
      title.textContent = 'Profile Card';
  
      const imgWrap = document.createElement('div');
      imgWrap.classList.add('img-wrap');
  
      const img = document.createElement('img');
      img.src = state.imagePreviewUrl;
  
      imgWrap.appendChild(img);
  
      const nameDiv = document.createElement('div');
      nameDiv.classList.add('name');
      nameDiv.textContent = state.name;
  
      const statusDiv = document.createElement('div');
      statusDiv.classList.add('age');
      statusDiv.textContent = state.status;
  
      const editButton = document.createElement('button');
      editButton.type = 'submit';
      editButton.textContent = 'Edit Profile';
      editButton.classList.add('edit');
  
      form.appendChild(title);
      form.appendChild(imgWrap);
      form.appendChild(nameDiv);
      form.appendChild(statusDiv);
      form.appendChild(editButton);
      card.appendChild(form);
      root.appendChild(card);
    }
  
    function createField(labelText, id, value, onChange) {
      const field = document.createElement('div');
      field.classList.add('field');
  
      const label = document.createElement('label');
      label.htmlFor = id;
      label.textContent = labelText;
  
      const input = document.createElement('input');
      input.id = id;
      input.type = 'text';
      input.value = value;
      input.maxLength = id === 'name' ? 25 : 35;
      input.required = true;
      input.oninput = onChange;
  
      field.appendChild(label);
      field.appendChild(input);
  
      return field;
    }
  
    function photoUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = function() {
        state.file = file;
        state.imagePreviewUrl = reader.result;
        saveState();
        createCard();
      };
      
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  
    function editName(event) {
      state.name = event.target.value;
      saveState();
    }
  
    function editStatus(event) {
      state.status = event.target.value;
      saveState();
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      state.active = state.active === 'edit' ? 'profile' : 'edit';
      saveState();
      createCard();
    }
  
    createCard();
});
