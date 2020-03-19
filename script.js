let chatTabs = document.querySelectorAll('.chat-tab');
let welcomeChatHeading = document.querySelector('.welcome-chat .lg-heading');
let allContactsBtn = document.querySelector('.all-contacts-btn');
let welcomeChatScreen = document.querySelector('.welcome-chat');
let allContactsScreen = document.querySelector('.all-contacts');
let chatRightColumn = document.querySelector('.chat-right-col');
let createChatButtons = document.querySelectorAll('.create-chat-btn');
let newChatScreen = document.querySelector('.new-chat');
let cancelCreateChatBtn = document.querySelector('.cancel-create-btn');

let screens = [welcomeChatScreen, allContactsScreen, newChatScreen];

/* Функция для отключения всех экранов,
   кроме одного по индексу */

function activeScreen(screens, index){
    screens.forEach((item)=>{
        item.classList.remove('active');
    })  
    screens[index].classList.add('active');
}
/* Мои чаты и Отслеживаемые чаты вкладки */

chatTabs.forEach((item)=>{
    item.addEventListener('click', ()=>{
        activeScreen(screens, 0);

        chatTabs.forEach((item)=>{
            item.classList.remove('active'); 
        });
        createChatButtons.forEach((item)=>{
            item.classList.remove('disabled');
        });

        allContactsBtn.classList.remove('active');

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
        activeScreen(screens, 0);
        allContactsBtn.classList.remove('active');
    }
    else{
        activeScreen(screens, 1);
        allContactsBtn.classList.add('active');
        createChatButtons.forEach((item)=>{
            item.classList.remove('disabled');
        });
        
    }
});

/* Листенеры на кнопки "Создать чат" */

createChatButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        if(!(btn.classList.contains('disabled'))){
            activeScreen(screens, 2);
            createChatButtons.forEach((btn)=>{
                btn.classList.add('disabled');
            });
            allContactsBtn.classList.remove('active');
        }
        else{
            activeScreen(screens, 0);
            createChatButtons.forEach((btn)=>{
                btn.classList.remove('disabled');
            });
        }
    });
})

/* Листенер на кнопку "отменить создание чата" */

cancelCreateChatBtn.addEventListener('click', ()=>{
    createChatButtons.forEach((item)=>{
        item.classList.remove('disabled');
    });
    activeScreen(screens, 0);
});