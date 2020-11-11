import $ from 'jquery';
import io from 'socket.io-client';
import 'bootstrap';
import './client.scss'
const socket = io;

$(document).ready(() => {
    //es-lint-
    const socket = io.connect();

    const nickname = $('.login-form #nickname');
    const loginForm = $('.login-form');
    const messageForm = $('.message-form');
    const messagesList = $('.messages-list');
    const usersList = $('.users-list');
    const messageInput = $('#message')

    loginForm.submit((e) => {
        e.preventDefault();

        socket.emit('login', nickname.val())
    });
    messageForm.submit((e) => {
        e.preventDefault();
        socket.emit('message', messageInput.val())
    })

    //listeners
    socket.on('login', (data) => {
        if(data.status === 'Ok'){
            console.log('data', data)
            loginForm.hide();
            messageForm.removeClass('d-none');
            messagesList.removeClass('d-none');
            usersList.removeClass('d-none');
        }
    });

    socket.on('new_message', (data) => {
        let NewMessage = `<a href="" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${data.nickname}</h5>
                                <small class="text-muted">${new Date(data.time)}</small>
                            </div>
                            <p class="mb-1">${data.message}</p>
                        </a>`;
        messagesList.children('ul').append(NewMessage)
    });

    socket.on('users', (data) => {
        usersList.children('ul').html('');
        data.users.map((user) => {
            usersList.children('ul').append(`<li class="list-group-item">${user}</li>`)
        })
    })


})
