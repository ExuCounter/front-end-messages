let welcomeChatScreen = document.querySelector('.welcome-chat'),
    allContactsScreen = document.querySelector('.all-contacts'),
    commonChatSettingsScreen = document.querySelector('.common-chat-settings'),
    privateScreen = document.querySelector('.private-chat'),
    chatScreen = document.querySelector('.chat'),
    commonChatScreen = document.querySelector('.common-chat'),
    seenMessagesScreen = document.querySelector('.seen-messages-screen'),
    newChatScreen = document.querySelector('.new-chat-start'),
    addUsersScreen = document.querySelector('.add-users'),
    editChatScreen = document.querySelector('.edit-chat');

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
    cancelHiglightButtons = document.querySelectorAll('.chat-heading-edit .cancel-create-btn'),
    deleteModalAgreeBtn = document.querySelector('.modal-delete .create-btn'),
    deleteModalCancelBtn = document.querySelector('.modal-delete .cancel-btn'),
    editMessageButtons = document.querySelectorAll('.edit-message-btn'),
    deleteMessageModal = document.querySelector('.modal-delete'),
    closeEditTextareaButtons = document.getElementsByClassName('close-edit-textarea'),
    chatHeadingDeleteButtons = document.querySelectorAll('.chat-heading-delete .chat-heading-btn');

let chatTabs = document.querySelectorAll('.chat-tab'),
    welcomeChatHeading = document.querySelector('.welcome-chat .lg-heading'),
    chatHeadingEdit = document.querySelectorAll('.chat-heading-edit'),
    chatHeading = document.querySelectorAll('.chat-heading'),
    chatRightColumn = document.querySelector('.chat-right-col'),
    chatLeftColumn = document.querySelector('.chat-left-col'),
    sendMessageCol = document.querySelector('.send-messages-col'),
    chatFooterSubmitCol = document.querySelector('.submit-col'),
    leftColMessages = document.querySelectorAll('.left-col-message'),
    commonChatEditButtons = document.querySelectorAll('.chat-heading-edit-col .chat-heading-btn'),
    leftColList = document.querySelector('.left-col-list'),
    searchContainersInputs = document.querySelectorAll('.search-container input');

let contactHeadCheckBoxes = document.querySelectorAll('.contact-head-label input'),
    contactHeadSubCheckBoxes = document.querySelectorAll('.parent-checkbox-sub input');

let testChatPrivate = document.querySelector('.chat-1'),
    testChatCommon = document.querySelector('.chat-2');

let strangeMessages = document.querySelectorAll('.chat-main-message.strange-message label');
let yourMessages = document.querySelectorAll('.chat-main-message.your-message label');

let modals = document.querySelectorAll('.custom-modal'),
    chatSuccessDeleteAlert = document.querySelector('.chat-success-alert'),
    chatDeleteAlert = document.querySelector('.chat-delete-alert');

/* ЭКРАНЫ В ПРАВОЙ КОЛОНКЕ */

let screens = [welcomeChatScreen, allContactsScreen, newChatScreen, addUsersScreen, chatScreen, privateScreen, commonChatScreen, seenMessagesScreen, commonChatSettingsScreen, editChatScreen];

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

openScreen(screens, 2);

searchContainersInputs.forEach((item)=>{
    item.addEventListener('input', ()=>{
        if(item.value != "" && !(item.closest('.search-container').querySelector('.search-container-close__btn'))){
            item.closest('.search-container').insertAdjacentHTML('beforeend', `
                        <svg width="16" class="search-container-close__btn" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 14.999L1.00086 1.00009" stroke="#F6544B" stroke-width="2" stroke-linecap="round"/>
                <path d="M14.9993 1L1.00012 14.9989" stroke="#F6544B" stroke-width="2" stroke-linecap="round"/>
                </svg>

            `);
        }
        else if(item.value == 0){
            item.closest('.search-container').querySelector('.search-container-close__btn').outerHTML = '';
        }
        item.closest('.search-container').querySelector('.search-container-close__btn').addEventListener('click', ()=>{
            item.value = '';
            item.closest('.search-container').querySelector('.search-container-close__btn').outerHTML = '';
        })
    });
})


/* СООБЩЕНИЯ И УПРАВЛЕНИЕ ИХ ЧЕКБОКСАМИ */

let counterYourMessages = 0,
    counterStrangeMessages = 0;

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
            message.closest('.chat').querySelectorAll('.chat-main-message.strange-message label').forEach((message)=>{
                if(!(message.classList.contains('active'))){
                    message.classList.add('disabled');
                }
                if(message.classList.contains('active')){
                    counterStrangeMessages++;
                }
            });
    
            message.closest('.chat').querySelectorAll('.chat-main-message.your-message label').forEach((message)=>{
                if(!(message.classList.contains('active'))){
                     message.classList.add('disabled');
                }
                if(message.classList.contains('active')){
                    counterYourMessages++;
                }
            });
            
            message.closest('.chat').querySelector('.chat-heading-edit').classList.remove('active');
            message.closest('.chat').querySelector('.chat-heading').classList.add('active');

            message.closest('.chat').querySelector('.resend-message-btn').style.display = 'flex';

            if(counterYourMessages == 0 && counterStrangeMessages == 1){
                message.closest('.chat').querySelector('.edit-message-btn').style.display = 'flex';
                message.closest('.chat').querySelector('.delete-message-btn').style.display = 'flex';
                message.closest('.chat').querySelector('.quote-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.answer-message-btn').style.display = 'none';
            }
            else if(counterYourMessages > 0 && counterStrangeMessages == 1){
                message.closest('.chat').querySelector('.edit-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.delete-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.quote-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.answer-message-btn').style.display = 'none';
            }
            else if(counterYourMessages == 1 && counterStrangeMessages == 0 && message.closest('.chat').classList.contains('common-chat')){
                message.closest('.chat').querySelector('.edit-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.delete-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.quote-message-btn').style.display = 'flex';
                message.closest('.chat').querySelector('.answer-message-btn').style.display = 'flex';
            }
            else if(counterYourMessages == 1 && counterStrangeMessages == 0 && !(message.closest('.chat').classList.contains('common-chat'))){
                message.closest('.chat').querySelector('.edit-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.delete-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.quote-message-btn').style.display = 'flex';
                message.closest('.chat').querySelector('.answer-message-btn').style.display = 'none';
            }
            else if(counterYourMessages == 0 && counterStrangeMessages == 1){
                message.closest('.chat').querySelector('.edit-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.delete-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.quote-message-btn').style.display = 'flex';
                message.closest('.chat').querySelector('.answer-message-btn').style.display = 'none';
            
            }
            else if(counterYourMessages >= 1 && counterStrangeMessages >=1 ){
                message.closest('.chat').querySelector('.edit-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.delete-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.quote-message-btn').style.display = 'none';
                message.closest('.chat').querySelector('.answer-message-btn').style.display = 'none';
            }
            else if(counterYourMessages >= 2 ){
                message.closest('.chat').querySelector('.quote-message-btn').style.display = 'none';
            }

            if(counterStrangeMessages == 0 && counterYourMessages == 0){
                message.closest('.chat').querySelector('.chat-heading-edit').classList.add('active');
                message.closest('.chat').querySelector('.chat-heading').classList.remove('active');
                message.closest('.chat').querySelectorAll('.chat-main-message.strange-message label').forEach((message)=>{
                    if(!(message.classList.contains('active'))){
                        message.classList.remove('active');
                        message.classList.remove('disabled');
                    }
                });
        
                message.closest('.chat').querySelectorAll('.chat-main-message.your-message label').forEach((message)=>{
                    if(!(message.classList.contains('active'))){
                        message.classList.remove('active');
                        message.classList.remove('disabled');
                    }
                });
            }
            counterStrangeMessages = 0;
            counterYourMessages = 0;
        });
    });

    cancelHiglightButtons.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            screens.forEach((screen)=>{
                screen.classList.remove('active');
            })
            btn.closest('.chat').querySelectorAll('.chat-main-message').forEach((message)=>{
                message.classList.remove('active');
                message.classList.remove('disabled');
                
            });
            btn.closest('.chat').classList.add('active');
            counterStrangeMessages = 0;
            counterYourMessages = 0;
    
        })
    })
}

commonChatEditButtons.forEach((item)=>{
    item.addEventListener('click',()=>{
        activeScreen(screens, 9);
    });
})

editChatScreen.querySelector('.create-btn').addEventListener('click', ()=>{
    activeScreen(screens, 0);
})

/* Отменить выделение сообщений */

manageMessagesActivity(strangeMessages);
manageMessagesActivity(yourMessages);


/* Сохранить изменения в настройках общего чата */

pushSettingsBtn.addEventListener('click', ()=>{
    activeScreen(screens, 0);
})

leftColList.querySelectorAll('li').forEach((item)=>{
    item.addEventListener('click', ()=>{
        allContactsBtn.classList.remove('active');
    });
})

allContactsBtn.addEventListener('click', ()=>{
    leftColList.querySelectorAll('li').forEach((item)=>{
        item.classList.remove('active');
    })
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

if(document.documentElement.clientWidth < 993){
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



/* Редактирование сообщения */

editMessageButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        if(!(btn.closest('.chat').querySelector('.chat-footer .send-messages-col').classList.contains('edit')) && btn.closest('.chat').querySelector('.chat-main-message.active .quoted-message-text')){
            btn.closest('.chat').querySelector('.chat-footer .send-messages-col').classList.add('edit');
            btn.closest('.chat').querySelector('.chat-footer .send-messages-col textarea').value = `${btn.closest('.chat').querySelector('.chat-main-message label.active .quoted-message-answer').innerHTML}`;
            btn.closest('.chat').querySelector('.chat-footer .send-messages-col').insertAdjacentHTML('afterbegin', `
            <div>
                <span class="quoted-message-text">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 12.456C1.488 12.216 2.496 11.712 3.024 10.944C3.6 10.128 3.888 8.76 3.888 6.84H0.216V0H7.272V5.76C7.272 8.88 6.696 11.232 5.544 12.816C4.392 14.4 2.544 15.192 0 15.192V12.456ZM10.368 12.456C11.856 12.216 12.864 11.712 13.392 10.944C13.968 10.128 14.256 8.76 14.256 6.84H10.584V0H17.64V5.76C17.64 8.88 17.064 11.232 15.912 12.816C14.76 14.4 12.912 15.192 10.368 15.192V12.456Z" fill="#76CBC6"/>
                    </svg>
                    <span>  
                    от Марта Шишко Сегодня в 18:22 из  группового чата<br>
                    У нас планы, никак не сможем, в 10:30 у дочки модельное агенство, надеюсь на понима...   
                    </span>                                        
                </span>
            </div> 
            <svg class='close-edit-textarea' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 14.999L1.00086 1.00009" stroke="#F6544B" stroke-width="2" stroke-linecap="round"/>
                <path d="M14.999 1L0.999877 14.9989" stroke="#F6544B" stroke-width="2" stroke-linecap="round"/>
            </svg>
                
            `);
        }
        else if(!(btn.closest('.chat').querySelector('.chat-footer .send-messages-col').classList.contains('edit'))){
            btn.closest('.chat').querySelector('.chat-footer .send-messages-col').classList.add('edit');
            btn.closest('.chat').querySelector('.chat-footer .send-messages-col textarea').value = `${btn.closest('.chat').querySelector('.chat-main-message label.active .chat-message-text').innerHTML}`;
            btn.closest('.chat').querySelector('.chat-footer .send-messages-col').insertAdjacentHTML('afterbegin', `
            <div>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1452 5.04924L15.0116 6.18284L12.1776 3.34533L13.3112 2.21172C13.5421 1.9808 13.9444 1.9808 14.1754 2.21172L16.1452 4.18504C16.3831 4.42296 16.3831 4.81132 16.1452 5.04924ZM6.67399 14.5309L3.83997 11.6934L11.1664 4.35648L14.0004 7.194L6.67399 14.5309ZM3.18571 13.0615L5.30597 15.1852L2.353 16.0179L3.18571 13.0615ZM17.1563 3.1739L15.1865 1.20058C14.8017 0.815716 13.4126 0.0879686 12.3035 1.20058L2.32149 11.1896C2.23402 11.2771 2.17104 11.382 2.13955 11.501L0.635075 16.8576C0.5651 17.1061 0.638574 17.372 0.817012 17.5574C0.998949 17.7428 1.36282 17.7743 1.51677 17.7393L6.86991 16.2314C6.98887 16.1999 7.09383 16.1369 7.1813 16.0494L17.1563 6.06039C17.9506 5.26617 17.9506 3.97162 17.1563 3.1739Z" fill="#282A2E"/>
                </svg>  
                <p class="sm-text">
                    Режим редактирования
                </p>
            </div>
            <svg class='close-edit-textarea' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 14.999L1.00086 1.00009" stroke="#F6544B" stroke-width="2" stroke-linecap="round"/>
                <path d="M14.999 1L0.999877 14.9989" stroke="#F6544B" stroke-width="2" stroke-linecap="round"/>
            </svg>
                
            `);
        }
        /* Закрытие редактирование сообщения */

        for(let btn of closeEditTextareaButtons){
            btn.addEventListener('click',()=>{
                btn.closest('.chat').querySelector('.send-messages-col').classList.remove('edit');
                btn.closest('.chat').querySelector('.send-messages-col div').outerHTML = '';
                
                btn.closest('.chat').querySelectorAll('.chat-main-message').forEach((message)=>{
                    message.classList.remove('disabled');
                    message.classList.remove('active');
                });

                btn.closest('.chat').querySelector('.chat-footer .send-messages-col textarea').value = '';
            })
        }
        
    btn.closest('.chat').querySelector('.chat-heading-edit').classList.add('active');
    btn.closest('.chat').querySelector('.chat-heading').classList.remove('active');

    })
})

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

chatHeadingDeleteButtons.forEach((item)=>{
    item.addEventListener('click', ()=>{
        if(item.closest('.chat').classList.contains('common-chat')){
            document.body.querySelector('.modal-common-chat-delete').classList.add('active');
            document.body.querySelector('.modal-common-chat-delete .create-btn').addEventListener('click', ()=>{
                document.body.querySelector('.modal-common-chat-delete').classList.remove('active');
                activeScreen(screens, 0);
                chatDeleteAlert.classList.add('active');
                setTimeout(()=>{chatDeleteAlert.classList.remove('active')}, 3000);
            });
            document.body.querySelector('.modal-common-chat-delete .cancel-btn').addEventListener('click', ()=>{
                document.body.querySelector('.modal-common-chat-delete').classList.remove('active');
                chatDeleteAlert.classList.add('active')
                activeScreen(screens, 0);
                setTimeout(()=>{chatDeleteAlert.classList.remove('active')}, 3000);
            });
        }
        else if(item.closest('.chat').classList.contains('private-chat')){
            document.body.querySelector('.modal-private-chat-delete').classList.add('active');
            document.body.querySelector('.modal-private-chat-delete .create-btn').addEventListener('click', ()=>{
                document.body.querySelector('.modal-private-chat-delete').classList.remove('active');
                activeScreen(screens, 0);
                chatDeleteAlert.classList.add('active');
                setTimeout(()=>{chatDeleteAlert.classList.remove('active')}, 3000);
            });
        }
    
    });    
});

/* Удалить сообщение в чате */


deleteMessageButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        deleteMessageModal.classList.add('active');
        deleteModalAgreeBtn.addEventListener('click', ()=>{
            messages = btn.closest('.chat').querySelectorAll('.chat-main-message');

            messages.forEach((message)=>{
            
                if(message.classList.contains('active')){
                    message.outerHTML = '';
                }
                message.classList.remove('active');
                message.classList.remove('disabled');

            });
            chatSuccessDeleteAlert.classList.add('active');
            setTimeout(()=>{chatSuccessDeleteAlert.classList.remove('active')},3000);
            deleteMessageModal.classList.remove('active')
            
         });
         
            deleteModalCancelBtn.addEventListener('click', ()=>{
            messages = btn.closest('.chat').querySelectorAll('.chat-main-message');

               messages.forEach((message)=>{
               
                   message.classList.remove('active');
                   message.classList.remove('disabled');
        
               });
               deleteMessageModal.classList.remove('active');
           })
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

window.addEventListener('resize', ()=>{
    if(document.documentElement.clientWidth > 992){
        let heightChat = document.documentElement.clientHeight - 30;
        let leftChatColHeader = document.querySelector('.left-col-header').offsetHeight;
        let chatContainerTabs = document.querySelector('.chat-container-tabs').offsetHeight;
        let chatHeading = document.querySelector('.chat-heading').offsetHeight;
        let subHeading = document.querySelector('.chat-sub-heading').offsetHeight;
        let chatMainHeight = heightChat - chatContainerTabs - chatHeading - subHeading;
        let leftColHeight = heightChat - chatContainerTabs - leftChatColHeader -allContactsBtn.offsetHeight - 30;
        document.querySelector('.left-col-list').style.height = `${leftColHeight}px`;
        document.querySelectorAll('.chat-main').forEach((item)=>{
            item.style.height = `${chatMainHeight-100}px`;
        })
    }
});

if(document.documentElement.clientWidth > 992){
    let heightChat = document.documentElement.clientHeight - 40;
    let leftChatColHeader = document.querySelector('.left-col-header').offsetHeight;
    let chatContainerTabs = document.querySelector('.chat-container-tabs').offsetHeight;
    let chatHeading = document.querySelector('.chat-heading').offsetHeight;
    let subHeading = document.querySelector('.chat-sub-heading').offsetHeight;
    let chatMainHeight = heightChat - chatContainerTabs - chatHeading - subHeading;
    let leftColHeight = heightChat - chatContainerTabs - leftChatColHeader -allContactsBtn.offsetHeight - 30;
    document.querySelector('.left-col-list').style.height = `${leftColHeight}px`;
    document.querySelectorAll('.chat-main').forEach((item)=>{
        item.style.height = `${chatMainHeight}px`;
    })
}