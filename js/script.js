let welcomeChatScreen = document.querySelector('.welcome-chat'),
    allContactsScreen = document.querySelector('.all-contacts'),
    commonChatSettingsScreen = document.querySelector('.common-chat-settings'),
    privateScreen = document.querySelector('.private-chat'),
    chatScreen = document.querySelector('.chat'),
    commonChatScreen = document.querySelector('.common-chat'),
    seenMessagesScreen = document.querySelector('.seen-messages-screen'),
    newChatScreen = document.querySelector('.new-chat-start'),
    addUsersScreen = document.querySelector('.add-users');

let cancelCreateChatButtons = document.querySelectorAll('.cancel-chat-btn'),
    allContactsBtn = document.querySelector('.all-contacts-btn'),
    addUsersBtn = document.querySelector('.chat--create-btn'),
    showInfoButtons = document.querySelectorAll('.show-info-button'),
    chatSettingsButtons = document.querySelectorAll('.chat-settings-btn'),
    pushSettingsBtn = document.querySelector('.push-settings--btn'),
    createChatButtons = document.querySelectorAll('.create-chat-btn'),
    finishCreateChatBtn = document.querySelector('.finish-create-chat--btn'),
    messageInfoButtons = document.querySelectorAll('.common-chat .message-info-icon'),
    deleteMessageButtons = document.querySelectorAll('.delete-message-btn'),
    closeModalBtn = document.querySelectorAll('.close-modal-btn'),
    resendMessageButtons = document.querySelectorAll('.resend-message-btn'),
    cancelHiglightButtons = document.querySelectorAll('.chat-heading-edit');

let chatTabs = document.querySelectorAll('.chat-tab'),
    welcomeChatHeading = document.querySelector('.welcome-chat .lg-heading'),
    chatHeadingEdit = document.querySelectorAll('.chat-heading-edit'),
    chatHeading = document.querySelectorAll('.chat-heading'),
    chatRightColumn = document.querySelector('.chat-right-col'),
    chatLeftColumn = document.querySelector('.chat-left-col'),
    sendMessageCol = document.querySelector('.send-messages-col'),
    chatFooterSubmitCol = document.querySelector('.submit-col'),
    leftColMessages = document.querySelectorAll('.left-col-message');

let contactHeadCheckBoxes = document.querySelectorAll('.contact-head-label input'),
    contactHeadSubCheckBoxes = document.querySelectorAll('.parent-checkbox-sub input');

let testChatPrivate = document.querySelector('.chat-1'),
    testChatCommon = document.querySelector('.chat-2');

let strangeMessages = document.querySelectorAll('.chat-main-message.strange-message');
let yourMessages = document.querySelectorAll('.chat-main-message.your-message');

let modals = document.querySelectorAll('.custom-modal');

/* ЭКРАНЫ В ПРАВОЙ КОЛОНКЕ */

let screens = [welcomeChatScreen, allContactsScreen, newChatScreen, addUsersScreen, chatScreen, privateScreen, commonChatScreen, seenMessagesScreen, commonChatSettingsScreen];

/* Функция для отключения всех экранов,
   кроме одного по индексу */

   function activeScreen(screens, index){
    screens.forEach((item)=>{
        item.classList.remove('active');
    })  
    screens[index].classList.add('active');
}

/* Функция для открытия нужного экрана разработчикам */

function openScreen(screens, index){
    chatLeftColumn.classList.add('hide-screen');
    chatRightColumn.classList.remove('hide-screen');
    activeScreen(screens, index);
}

openScreen(screens, 0);

/* СООБЩЕНИЯ И УПРАВЛЕНИЕ ИХ ЧЕКБОКСАМИ */

let counter = 0;

function manageMessagesActivity(messages){
    messages.forEach((message)=>{
        message.addEventListener('click', ()=>{
            if(message.querySelector('input').checked === true && !(message.classList.contains('active'))){
                message.classList.add('active');
                message.classList.remove('disabled');
            }
            else if(!(message.querySelector('input').checked === true) && message.classList.contains('active')){
                message.classList.remove('active');
                message.classList.add('disabled');
            }
            message.closest('.chat').querySelectorAll('.chat-main-message.strange-message').forEach((message)=>{
                if(!(message.classList.contains('active'))){
                    message.classList.add('disabled');
                }
                if(message.classList.contains('active')){
                    counter++;
                }
            });
    
            message.closest('.chat').querySelectorAll('.chat-main-message.your-message').forEach((message)=>{
                if(!(message.classList.contains('active'))){
                     message.classList.add('disabled');
                }
                if(message.classList.contains('active')){
                    counter++;
                }
            });

            if(counter >= 1){
                message.closest('.chat').querySelector('.chat-heading-edit').classList.remove('active');
                message.closest('.chat').querySelector('.chat-heading').classList.add('active');

            }

            if(counter == 0){
                message.closest('.chat').querySelector('.chat-heading-edit').classList.add('active');
                message.closest('.chat').querySelector('.chat-heading').classList.remove('active');
                message.closest('.chat').querySelectorAll('.chat-main-message.strange-message').forEach((message)=>{
                    if(!(message.classList.contains('active'))){
                        message.classList.remove('active');
                        message.classList.remove('disabled');
                    }
                });
        
                message.closest('.chat').querySelectorAll('.chat-main-message.your-message').forEach((message)=>{
                    if(!(message.classList.contains('active'))){
                        message.classList.remove('active');
                        message.classList.remove('disabled');
                    }
                });
            }
            counter = 0;
        });
    });

    cancelHiglightButtons.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            btn.closest('.chat').querySelector('.chat-heading-edit').classList.add('active');
            btn.closest('.chat').querySelector('.chat-heading').classList.remove('active');
            screens.forEach((screen)=>{
                screen.classList.remove('active');
            })
            btn.closest('.chat').querySelectorAll('.chat-main-message').forEach((message)=>{
                message.classList.remove('active');
                message.classList.remove('disabled');
                
            });
            btn.closest('.chat').classList.add('active');
            counter = 0;
    
        })
    })
}


/* Отменить выделение сообщений */

manageMessagesActivity(strangeMessages);
manageMessagesActivity(yourMessages);


/* Сохранить изменения в настройках общего чата */

pushSettingsBtn.addEventListener('click', ()=>{
    activeScreen(screens, 0);
})

/* Открыть настройки общего чата */

chatSettingsButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        activeScreen(screens, 8);
    });
})

/* Открыть тестовый приватный чат */

testChatPrivate.addEventListener('click', ()=>{
    activeScreen(screens, 5);
})

/* Открыть тестовый общий чат */

testChatCommon.addEventListener('click', ()=>{
    activeScreen(screens, 6);
})

/* Открыть информацию о пользователях кто прочитал сообщение в общем чате */

messageInfoButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        activeScreen(screens, 7);
    })
});

/* Открыть информацию о пользователях кто прочитал сообщение в общем чате */

showInfoButtons.forEach((item)=>{
    item.addEventListener('click', ()=>{
        item.closest('.private-chat-info').querySelector('.hide-info').classList.add('active');
        item.classList.add('active');
    });
})

/* Фокус для textarea */

sendMessageCol.addEventListener('click', ()=>{
    chatFooterTextarea.focus();
})

/* Создание чата */

finishCreateChatBtn.addEventListener('click', ()=>{
    activeScreen(screens, 4);
    document.body.style.overflowY = 'hidden';
});

/* Функция для активного сообщения */

leftColMessages.forEach((message)=>{
    message.addEventListener('click', ()=>{
        if(!(message.classList.contains('active'))){
            leftColMessages.forEach((item)=>{
                item.classList.remove('active');
            });
            if(message.querySelector('.unread-messages')){
                message.querySelector('.unread-messages').style.display = 'none';
            }
            message.classList.add('active');
        }
    });
})

/* Функция для выделения всех чекбоксов в добавлении контаков */

contactHeadCheckBoxes.forEach((checkbox)=>{
    checkbox.addEventListener('click', ()=>{
        if(checkbox.checked === true){
            checkbox.closest('.accord-contact-head').querySelectorAll('.accord-description-container input').forEach((item)=>{
                item.checked = true;
            })
        }
        else{
            checkbox.closest('.accord-contact-head').querySelectorAll('.accord-description-container input').forEach((item)=>{
                item.checked = false;
            })
        }
    })
});

/* Функция для выделения всех sub-чекбоксов в добавлении контаков */

contactHeadSubCheckBoxes.forEach((checkbox)=>{
    checkbox.addEventListener('click', ()=>{
        if(checkbox.checked === true){
            checkbox.closest('.contact-group').querySelectorAll('.accord-description input').forEach((item)=>{
                item.checked = true;
            })
        }
        else{
            checkbox.closest('.contact-group').querySelectorAll('.accord-description input').forEach((item)=>{
                item.checked = false;
            })
        }
    })
});

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

/* Для телефонов стартовый экран */

if(document.documentElement.clientWidth < 767){
    chatLeftColumn.classList.remove('hide-screen');
    chatRightColumn.classList.add('hide-screen');
    chatTabs.forEach((item)=>{
        
        item.addEventListener('click', ()=>{
            chatLeftColumn.classList.remove('hide-screen');
            chatRightColumn.classList.add('hide-screen');

        });
    });

}

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

/* Закрытие модального окна */

closeModalBtn.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        btn.closest('.custom-modal').classList.remove('active');
    });
});

/* Листенер на кнопку "отменить создание чата" */

cancelCreateChatButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        createChatButtons.forEach((btn)=>{
            btn.classList.remove('disabled');
        });
        activeScreen(screens, 0);
    });
})

/* Кнопка добавления людей в группу */

addUsersBtn.addEventListener('click', ()=>{
    activeScreen(screens, 3);
});

/* Кнопка для открытия "переслать" модального окна */

resendMessageButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.modal-resend').classList.add('active');
    });
});

/* Удалить сообщение в чате */

deleteMessageButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        strangeMessages = document.querySelectorAll('.chat-main-message.strange-message');
        yourMessages = document.querySelectorAll('.chat-main-message.your-message');

        yourMessages.forEach((message)=>{
            
            if(message.classList.contains('active')){
                message.outerHTML = '';
            }
            message.classList.remove('active');
            message.classList.remove('disabled');

        });
        strangeMessages.forEach((message)=>{
            if(message.classList.contains('active')){
                message.outerHTML = '';
            }
            message.classList.remove('active');
                message.classList.remove('disabled');
    
        });
        btn.closest('.chat').querySelector('.chat-heading-edit').classList.add('active');
        btn.closest('.chat').querySelector('.chat-heading').classList.remove('active');

        });
    
});

 /* Наблюдатель за сменой классов */

 let observerClasses = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        for(let screen of screens){
            if(screen.classList.contains('active')){
                chatLeftColumn.classList.add('hide-screen');
                chatRightColumn.classList.add('active');
                chatRightColumn.classList.remove('hide-screen');
            }

        };
    });    
});

let observerModals = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        for(let modal of modals){
            if(modal.classList.contains('active')){
                document.body.classList.add('overflow-hidden');
            }
            else if(!(modal.classList.contains('active'))){
                document.body.classList.remove('overflow-hidden');
            }

        };
    });    
});

// настраиваем наблюдатель

let config = { attributes: true, childList: true, characterData: true }

for(let screen of screens){
    observerClasses.observe(screen, config);
};

for(let modal of modals){
    observerModals.observe(modal, config);
};


