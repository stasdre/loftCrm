import socketIO from 'socket.io-client';
import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { userProfileSelector } from '../auth';
let socket = null;

export const chatUsersSelector = state => state.chat.users;
export const chatMessagesList = state => state.chat.messages;
export const chatSelectedRoomSelector = state => state.chat.selectedRoom;
export const chatMessageText = state => state.chat.messageText;

const actionsPrefix = 'CHAT';
export const setUsers = createAction(`${actionsPrefix}/SET_USERS`);
export const addUser = createAction(`${actionsPrefix}/ADD_USER`);
export const removeUser = createAction(`${actionsPrefix}/REMOVE_USER`);
export const appendMessage = createAction(`${actionsPrefix}/ADD_MESSAGE`);
export const setToZeroMessages = createAction(`${actionsPrefix}/SET_TO_ZERO_MESSAGES`);
export const setSelectedRoom = createAction(`${actionsPrefix}/SET_SELECTED_ROOM`);
export const setMessageText = createAction(`${actionsPrefix}/SET_MESSAGE_TEXT`);
export const resetMessage = createAction(`${actionsPrefix}/RESET_MESSAGE`);

const users = handleActions(
  {
    [setUsers]: (_, action) => action.payload,
    [addUser]: (state, action) => [action.payload, ...state],
    [removeUser]: (state, action) => state.filter(user => user.id !== action.payload)
  },
  []
);

const messages = handleActions(
  {
    [appendMessage]: (state, action) => [...state, action.payload],
    [setToZeroMessages]: () => []
  },
  []
);

const selectedRoom = handleActions(
  {
    [setSelectedRoom]: (_, action) => action.payload
  },
  null
);

const messageText = handleActions({
  [setMessageText]: (_, action) => action.payload,
  [resetMessage]: () => ''
}, '')

export default combineReducers({
  users,
  messages,
  selectedRoom,
  messageText
});

export const connectSocket = () => (dispatch, getState) => {
  const userProfile = userProfileSelector(getState());
  socket = socketIO('http://localhost:3000');

  socket.emit('users:connect', { id: userProfile.id, username: userProfile.username });

  socket
    .on('users:list', data => dispatch(setUsers(data)))
    .on('users:add', data => dispatch(addUser(data)))
    .on('users:leave', data => dispatch(removeUser(data)))
    .on('message:add', data => dispatch(appendMessage(data)));
};

export const sendMessage = () => (dispatch, getState) => {
  const state = getState()
  const userProfile = userProfileSelector(state);
  const selectedRoom = chatSelectedRoomSelector(state);
  const messageText = chatMessageText(state)
  socket.emit('message:add', { senderId: userProfile.id, roomId: selectedRoom, text: messageText });
  dispatch(resetMessage())
};
