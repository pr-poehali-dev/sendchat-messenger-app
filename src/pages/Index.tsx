import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
}

const SendChat = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', displayName: '', password: '' });
  const [showRegister, setShowRegister] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const mockChats: Chat[] = [
    { id: '1', name: 'Анна Петрова', lastMessage: 'Привет! Как дела?', timestamp: '14:30', unread: 2, isOnline: true },
    { id: '2', name: 'Группа проекта', lastMessage: 'Созвон в 15:00', timestamp: '13:45', unread: 0, isOnline: false },
    { id: '3', name: 'Михаил', lastMessage: 'Отправил файл', timestamp: '12:20', unread: 1, isOnline: true }
  ];

  const mockMessages: Message[] = [
    { id: '1', sender: 'Анна', content: 'Привет! Как твои дела?', timestamp: new Date(), isOwn: false },
    { id: '2', sender: 'Ты', content: 'Привет! Всё отлично, работаю над новым проектом', timestamp: new Date(), isOwn: true },
    { id: '3', sender: 'Анна', content: 'Звучит интересно! Расскажешь подробнее?', timestamp: new Date(), isOwn: false }
  ];

  const mockUsers: User[] = [
    { id: '1', username: 'anna_p', displayName: 'Анна Петрова', status: 'В сети', isOnline: true },
    { id: '2', username: 'mikhail', displayName: 'Михаил Иванов', status: 'Был в сети час назад', isOnline: false },
    { id: '3', username: 'user123', displayName: 'Пользователь', status: 'В сети', isOnline: true }
  ];

  const handleLogin = () => {
    if (loginForm.username === 'Admin' && loginForm.password === '1234') {
      setCurrentUser({ id: 'admin', username: 'Admin', displayName: 'Администратор', status: 'В сети', isOnline: true });
      setActiveTab('admin');
    } else if (loginForm.username && loginForm.password) {
      setCurrentUser({ id: '1', username: loginForm.username, displayName: loginForm.username, status: 'В сети', isOnline: true });
    }
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    if (registerForm.username && registerForm.displayName && registerForm.password) {
      setCurrentUser({ 
        id: Date.now().toString(), 
        username: registerForm.username, 
        displayName: registerForm.displayName, 
        status: 'В сети', 
        isOnline: true 
      });
      setIsLoggedIn(true);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      // В реальном приложении здесь была бы отправка сообщения
      setNewMessage('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageCircle" size={32} className="text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">SendChat</CardTitle>
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                  <Input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="Введите пароль"
                  />
                </div>
                <Button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600">
                  Войти
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Нет аккаунта?{' '}
                  <button 
                    onClick={() => setShowRegister(true)}
                    className="text-blue-500 hover:underline"
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отображаемое имя</label>
                  <Input
                    value={registerForm.displayName}
                    onChange={(e) => setRegisterForm({...registerForm, displayName: e.target.value})}
                    placeholder="Как вас называть"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                  <Input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    placeholder="Создайте пароль"
                  />
                </div>
                <Button onClick={handleRegister} className="w-full bg-green-500 hover:bg-green-600">
                  Зарегистрироваться
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Уже есть аккаунт?{' '}
                  <button 
                    onClick={() => setShowRegister(false)}
                    className="text-blue-500 hover:underline"
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
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">SendChat</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-500 text-white text-sm">
              {currentUser?.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-700">{currentUser?.displayName}</span>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r bg-gray-50 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="grid w-full grid-cols-4 bg-white m-4">
              <TabsTrigger value="chats" className="text-xs">
                <Icon name="MessageSquare" size={16} className="mr-1" />
                Чаты
              </TabsTrigger>
              <TabsTrigger value="contacts" className="text-xs">
                <Icon name="Users" size={16} className="mr-1" />
                Контакты
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-xs">
                <Icon name="User" size={16} className="mr-1" />
                Профиль
              </TabsTrigger>
              {currentUser?.username === 'Admin' && (
                <TabsTrigger value="admin" className="text-xs">
                  <Icon name="Settings" size={16} className="mr-1" />
                  Админ
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="chats" className="flex-1 px-4 space-y-2">
              {mockChats.map((chat) => (
                <Card 
                  key={chat.id} 
                  className={`cursor-pointer transition-colors hover:bg-blue-50 ${selectedChat === chat.id ? 'bg-blue-100 border-blue-300' : ''}`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-gray-300">
                            {chat.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                          <span className="text-xs text-gray-500">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="contacts" className="flex-1 px-4 space-y-2">
              {mockUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-gray-300">
                            {user.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {user.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{user.displayName}</h3>
                        <p className="text-sm text-gray-600">@{user.username}</p>
                        <p className="text-xs text-gray-500">{user.status}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Icon name="MessageCircle" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="profile" className="flex-1 px-4">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarFallback className="bg-blue-500 text-white text-2xl">
                      {currentUser?.displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{currentUser?.displayName}</CardTitle>
                  <p className="text-gray-600">@{currentUser?.username}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                    <Input defaultValue="Доступен для общения" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Отображаемое имя</label>
                    <Input defaultValue={currentUser?.displayName} />
                  </div>
                  <Button className="w-full">Сохранить изменения</Button>
                  <Button variant="outline" className="w-full" onClick={() => setIsLoggedIn(false)}>
                    Выйти из аккаунта
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {currentUser?.username === 'Admin' && (
              <TabsContent value="admin" className="flex-1 px-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="Shield" size={20} className="mr-2" />
                      Админ-панель
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-blue-50">
                        <CardContent className="p-4 text-center">
                          <h3 className="text-2xl font-bold text-blue-600">127</h3>
                          <p className="text-sm text-gray-600">Всего пользователей</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-green-50">
                        <CardContent className="p-4 text-center">
                          <h3 className="text-2xl font-bold text-green-600">43</h3>
                          <p className="text-sm text-gray-600">Активных</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Пользователи</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {mockUsers.map((user) => (
                          <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-gray-300 text-sm">
                                  {user.displayName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{user.displayName}</p>
                                <p className="text-xs text-gray-600">@{user.username}</p>
                              </div>
                            </div>
                            <Badge variant={user.isOnline ? "default" : "secondary"}>
                              {user.isOnline ? "Онлайн" : "Оффлайн"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-gray-300">
                      {mockChats.find(c => c.id === selectedChat)?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium text-gray-900">
                      {mockChats.find(c => c.id === selectedChat)?.name}
                    </h2>
                    <p className="text-sm text-green-600">В сети</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Icon name="Phone" size={18} />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Icon name="Video" size={18} />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Icon name="MoreVertical" size={18} />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {mockMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isOwn 
                        ? 'bg-blue-500 text-white' 
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
                  <Button size="sm" variant="ghost">
                    <Icon name="Paperclip" size={18} />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageCircle" size={32} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">Выберите чат</h2>
                <p className="text-gray-600">Начните общение, выбрав диалог из списка</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendChat;