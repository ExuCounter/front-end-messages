let chatTabs = document.querySelectorAll('.chat-tab');
let welcomeChatHeading = document.querySelector('.welcome-chat .lg-heading');
let allContactsBtn = document.querySelector('.all-contacts-btn');
let welcomeChat = document.querySelector('.welcome-chat');
let allContactsScreen = document.querySelector('.all-contacts');
let chatRightColumn = document.querySelector('.chat-right-col');
let createChatButtons = document.querySelectorAll('.create-chat-btn');
let newChatScreen = document.querySelector('.new-chat');
let cancelCreateChatBtn = document.querySelector('.cancel-create-btn');

/* Мои чаты и Отслеживаемые чаты вкладки */

chatTabs.forEach((item)=>{
    item.addEventListener('click', ()=>{

        chatTabs.forEach((item)=>{
            item.classList.remove('active'); 
        });
        createChatButtons.forEach((item)=>{
            item.classList.remove('disabled');
        });
        welcomeChat.classList.add('active');
        allContactsBtn.classList.remove('active');
        newChatScreen.classList.remove('active');

        if(!(item.classList.contains('active')) && item.classList.contains('admin')){
            item.classList.add('active');
            welcomeChatHeading.innerHTML = `Добро пожаловать в автоматически<br> отслеживаемые чаты!`
        }
        if(!(item.classList.contains('active')) && !(item.classList.contains('admin'))){
            item.classList.add('active');
            welcomeChatHeading.innerHTML = ` Добро пожаловать `
        }
    });
})

/* Вкладка все контакты */

allContactsBtn.addEventListener('click', ()=>{
    if(allContactsBtn.classList.contains('active')){
        allContactsBtn.classList.remove('active');
        allContactsScreen.classList.remove('active');
        welcomeChat.classList.add('active');
    }
    else{
        allContactsBtn.classList.add('active');
        allContactsScreen.classList.add('active');
        newChatScreen.classList.remove('active');
        welcomeChat.classList.remove('active');
        createChatButtons.forEach((item)=>{
            item.classList.remove('disabled');
        });
        
    }
});

/* Листенеры на кнопки "Создать чат" */

createChatButtons.forEach((item)=>{
    item.addEventListener('click', ()=>{
        if(!(item.classList.contains('disabled'))){
            createChatButtons.forEach((item)=>{
                item.classList.add('disabled');
            });
            newChatScreen.classList.add('active');
            allContactsBtn.classList.remove('active');
            allContactsScreen.classList.remove('active');
            welcomeChat.classList.remove('active');
        }
        else{
            item.classList.remove('disabled');
            newChatScreen.classList.remove('active');
            welcomeChat.classList.add('active');
        }
    });
})

/* Листенер на кнопку "отменить создание чата" */

cancelCreateChatBtn.addEventListener('click', ()=>{
    createChatButtons.forEach((item)=>{
        item.classList.remove('disabled');
    });
    newChatScreen.classList.remove('active');
    welcomeChat.classList.add('active');
});