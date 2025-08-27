import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  status: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
  isOnline: boolean;
  type: 'private' | 'group';
}

const SendChat = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', displayName: '', password: '' });
  const [showRegister, setShowRegister] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', name: 'Анна Петрова', lastMessage: 'Привет! Как дела?', timestamp: '14:30', unread: 2, isOnline: true, type: 'private' },
    { id: '2', name: 'Группа проекта', lastMessage: 'Созвон в 15:00', timestamp: '13:45', unread: 0, isOnline: false, type: 'group' },
    { id: '3', name: 'Михаил', lastMessage: 'Отправил файл', timestamp: '12:20', unread: 1, isOnline: true, type: 'private' }
  ]);

  // Mock data

  const mockMessages: Message[] = [
    { id: '1', sender: 'Анна', content: 'Привет! Как твои дела?', timestamp: new Date(), isOwn: false },
    { id: '2', sender: 'Ты', content: 'Привет! Всё отлично, работаю над новым проектом', timestamp: new Date(), isOwn: true },
    { id: '3', sender: 'Анна', content: 'Звучит интересно! Расскажешь подробнее?', timestamp: new Date(), isOwn: false }
  ];

  const [allUsers, setAllUsers] = useState<User[]>([
    { id: '1', username: 'anna_p', displayName: 'Анна Петрова', status: 'В работе', isOnline: true },
    { id: '2', username: 'mikhail', displayName: 'Михаил Иванов', status: 'Был в сети час назад', isOnline: false },
    { id: '3', username: 'user123', displayName: 'Елена Смирнова', status: 'Доступна', isOnline: true },
    { id: '4', username: 'designer', displayName: 'Артём Дизайнер', status: 'Занят', isOnline: false },
    { id: '5', username: 'manager', displayName: 'Ольга Менеджер', status: 'В отпуске', isOnline: false }
  ]);

  const handleLogin = () => {
    if (loginForm.username === 'Admin' && loginForm.password === '1234') {
      setCurrentUser({ id: 'admin', username: 'Admin', displayName: 'Администратор', status: 'В сети', isOnline: true });
      setActiveSection('admin');
    } else if (loginForm.username && loginForm.password) {
      setCurrentUser({ id: '1', username: loginForm.username, displayName: loginForm.username, status: 'В сети', isOnline: true });
    }
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    if (registerForm.username && registerForm.displayName && registerForm.password) {
      const newUser = { 
        id: Date.now().toString(), 
        username: registerForm.username, 
        displayName: registerForm.displayName, 
        status: 'В сети', 
        isOnline: true 
      };
      setAllUsers([...allUsers, newUser]);
      setCurrentUser(newUser);
      setIsLoggedIn(true);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  const createNewChat = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;

    const existingChat = chats.find(c => c.name === user.displayName);
    if (existingChat) {
      setSelectedChat(existingChat.id);
      setShowNewChatDialog(false);
      setActiveSection('chats');
      return;
    }

    const newChat: Chat = {
      id: Date.now().toString(),
      name: user.displayName,
      lastMessage: 'Новый чат создан',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      unread: 0,
      isOnline: user.isOnline,
      type: 'private'
    };

    setChats([newChat, ...chats]);
    setSelectedChat(newChat.id);
    setShowNewChatDialog(false);
    setActiveSection('chats');
  };

  const deleteUser = (userId: string) => {
    setAllUsers(allUsers.filter(u => u.id !== userId));
  };

  const filteredUsers = allUsers.filter(user => 
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Icon name="MessageCircle" size={36} className="text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SendChat</CardTitle>
            <p className="text-gray-600">Безопасный мессенджер</p>
          </CardHeader>
          <CardContent>
            {!showRegister ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя пользователя</label>
                  <Input
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    placeholder="Введите имя пользователя"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                  <Input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="Введите пароль"
                    className="h-12"
                  />
                </div>
                <Button onClick={handleLogin} className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg font-medium">
                  Войти
                </Button>
                <div className="text-center text-sm text-gray-500">
                  Тест админки: Admin / 1234
                </div>
                <p className="text-center text-sm text-gray-600">
                  Нет аккаунта?{' '}
                  <button 
                    onClick={() => setShowRegister(true)}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Зарегистрироваться
                  </button>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя пользователя</label>
                  <Input
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                    placeholder="Введите имя пользователя"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отображаемое имя</label>
                  <Input
                    value={registerForm.displayName}
                    onChange={(e) => setRegisterForm({...registerForm, displayName: e.target.value})}
                    placeholder="Как вас называть"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                  <Input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    placeholder="Создайте пароль"
                    className="h-12"
                  />
                </div>
                <Button onClick={handleRegister} className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg font-medium">
                  Зарегистрироваться
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Уже есть аккаунт?{' '}
                  <button 
                    onClick={() => setShowRegister(false)}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Войти
                  </button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
            <Icon name="MessageCircle" size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SendChat</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Avatar className="w-9 h-9 border-2 border-blue-200">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium">
              {currentUser?.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-700">{currentUser?.displayName}</span>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r bg-white flex flex-col">
          {/* Navigation */}
          <div className="p-4 border-b">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={activeSection === 'chats' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('chats')}
                className="justify-start h-11"
              >
                <Icon name="MessageSquare" size={18} className="mr-2" />
                Чаты
              </Button>
              <Button 
                variant={activeSection === 'contacts' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('contacts')}
                className="justify-start h-11"
              >
                <Icon name="Users" size={18} className="mr-2" />
                Контакты
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button 
                variant={activeSection === 'profile' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('profile')}
                className="justify-start h-11"
              >
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
              <Button 
                variant={activeSection === 'admin' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('admin')}
                className="justify-start h-11"
              >
                <Icon name="Shield" size={18} className="mr-2" />
                {currentUser?.username === 'Admin' ? 'Админ' : 'Недоступно'}
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">

            {activeSection === 'chats' && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        <Icon name="Plus" size={18} className="mr-2" />
                        Новый чат
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Создать новый чат</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Поиск пользователей..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="max-h-64 overflow-y-auto space-y-2">
                          {filteredUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                              <div className="flex items-center space-x-3">
                                <div className="relative">
                                  <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-gray-200">
                                      {user.displayName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {user.isOnline && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{user.displayName}</h4>
                                  <p className="text-sm text-gray-500">@{user.username}</p>
                                </div>
                              </div>
                              <Button size="sm" onClick={() => createNewChat(user.id)}>
                                Написать
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {chats.map((chat) => (
                    <Card 
                      key={chat.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${selectedChat === chat.id ? 'bg-blue-50 border-blue-300 shadow-md' : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                                {chat.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {chat.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                            {chat.type === 'group' && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 border-2 border-white rounded-full flex items-center justify-center">
                                <Icon name="Users" size={10} className="text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                              <span className="text-xs text-gray-500">{chat.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                          </div>
                          {chat.unread > 0 && (
                            <Badge className="bg-blue-500 text-white text-xs min-w-[24px] h-6 flex items-center justify-center">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'contacts' && (
              <div className="p-4 space-y-3 overflow-y-auto h-full">
                <div className="sticky top-0 bg-white pb-4">
                  <Input placeholder="Поиск контактов..." />
                </div>
                {allUsers.map((user) => (
                  <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                                {user.displayName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {user.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{user.displayName}</h3>
                            <p className="text-sm text-gray-600">@{user.username}</p>
                            <p className="text-xs text-gray-500">{user.status}</p>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => createNewChat(user.id)}>
                          <Icon name="MessageCircle" size={16} className="mr-1" />
                          Чат
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeSection === 'profile' && (
              <div className="p-4">
              <Card>
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-3xl">
                        {currentUser?.displayName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{currentUser?.displayName}</CardTitle>
                    <p className="text-gray-600">@{currentUser?.username}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Доступен</SelectItem>
                          <SelectItem value="busy">Занят</SelectItem>
                          <SelectItem value="away">Отошёл</SelectItem>
                          <SelectItem value="dnd">Не беспокоить</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Отображаемое имя</label>
                      <Input defaultValue={currentUser?.displayName} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">О себе</label>
                      <Input defaultValue="Люблю общение и новые проекты" />
                    </div>
                    <Button className="w-full">Сохранить изменения</Button>
                    <Button variant="outline" className="w-full" onClick={() => setIsLoggedIn(false)}>
                      Выйти из аккаунта
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'admin' && currentUser?.username === 'Admin' && (
              <div className="p-4 space-y-4 overflow-y-auto h-full">
                <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-700">
                      <Icon name="Shield" size={24} className="mr-2" />
                      Админ-панель
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4 text-center">
                          <h3 className="text-3xl font-bold text-blue-600">{allUsers.length}</h3>
                          <p className="text-sm text-gray-600">Всего пользователей</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4 text-center">
                          <h3 className="text-3xl font-bold text-green-600">
                            {allUsers.filter(u => u.isOnline).length}
                          </h3>
                          <p className="text-sm text-gray-600">В сети</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Icon name="Users" size={18} className="mr-2" />
                        Управление пользователями
                      </h3>
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {allUsers.map((user) => (
                          <div key={user.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gray-300">
                                  {user.displayName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.displayName}</p>
                                <p className="text-sm text-gray-600">@{user.username}</p>
                                <p className="text-xs text-gray-500">{user.status}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={user.isOnline ? "default" : "secondary"}>
                                {user.isOnline ? "Онлайн" : "Оффлайн"}
                              </Badge>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => deleteUser(user.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'admin' && currentUser?.username !== 'Admin' && (
              <div className="p-4 flex items-center justify-center h-full">
                <Card className="text-center">
                  <CardContent className="p-8">
                    <Icon name="Lock" size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Доступ запрещён</h3>
                    <p className="text-gray-600">Только администраторы могут видеть эту панель</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                      {chats.find(c => c.id === selectedChat)?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-gray-900 text-lg">
                      {chats.find(c => c.id === selectedChat)?.name}
                    </h2>
                    <p className="text-sm text-green-600 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      В сети
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="h-10 w-10">
                    <Icon name="Phone" size={18} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-10 w-10">
                    <Icon name="Video" size={18} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-10 w-10">
                    <Icon name="Info" size={18} />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {mockMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      message.isOwn 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                        : 'bg-white text-gray-900 border'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Button size="sm" variant="ghost" className="h-10 w-10">
                    <Icon name="Paperclip" size={18} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-10 w-10">
                    <Icon name="Smile" size={18} />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className="flex-1 h-12"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button 
                    onClick={sendMessage} 
                    className="h-12 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Icon name="MessageCircle" size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Добро пожаловать в SendChat!</h2>
                <p className="text-gray-600 mb-6">Выберите чат или создайте новый для начала общения</p>
                <Button 
                  onClick={() => setShowNewChatDialog(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать чат
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendChat;