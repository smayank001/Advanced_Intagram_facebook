import React, { useState } from 'react';
import { Home, Users, Video, Shovel as Shop, GamepadIcon, Menu, Bell, MessageCircle, Search, ChevronDown, LogOut } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    author: 'John Doe',
    authorId: '1',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    content: 'Just finished my morning workout! 💪 Feeling energized and ready for the day.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    likes: 142,
    comments: 23,
    shares: 5,
    time: '2h',
    liked: false
  },
  {
    id: 2,
    author: 'Sarah Wilson',
    authorId: '2',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Beautiful sunset at the beach today! 🌅',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    likes: 283,
    comments: 45,
    shares: 12,
    time: '4h',
    liked: false
  }
];

export default function Facebook() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const [newPostText, setNewPostText] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() || !user) return;

    const newPost = {
      id: posts.length + 1,
      author: user.fullName,
      authorId: user.id,
      avatar: user.avatar,
      content: newPostText,
      likes: 0,
      comments: 0,
      shares: 0,
      time: 'Just now',
      liked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  if (!user && !showAuthModal) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        platform="facebook"
      />

      {/* Header */}
      <header className="bg-white shadow fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-blue-600 font-bold text-2xl">facebook</Link>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Facebook"
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <nav className="flex space-x-2">
            <button
              className={`p-2 rounded-lg ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('home')}
            >
              <Home className="h-6 w-6" />
            </button>
            <button
              className={`p-2 rounded-lg ${activeTab === 'friends' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('friends')}
            >
              <Users className="h-6 w-6" />
            </button>
            <button
              className={`p-2 rounded-lg ${activeTab === 'video' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('video')}
            >
              <Video className="h-6 w-6" />
            </button>
            <button
              className={`p-2 rounded-lg ${activeTab === 'marketplace' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('marketplace')}
            >
              <Shop className="h-6 w-6" />
            </button>
            <button
              className={`p-2 rounded-lg ${activeTab === 'gaming' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('gaming')}
            >
              <GamepadIcon className="h-6 w-6" />
            </button>
          </nav>

          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-200 rounded-full">
              <Menu className="h-6 w-6" />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <Bell className="h-6 w-6" />
            </button>
            {user ? (
              <div className="relative group">
                <button className="p-2 bg-gray-200 rounded-full">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="h-6 w-6 rounded-full"
                  />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-8 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-2">
            {user && (
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{user.fullName}</span>
              </a>
            )}
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
              <span>Friends</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
              <span>Groups</span>
            </a>
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg w-full">
              <ChevronDown className="h-8 w-8" />
              <span>See More</span>
            </button>
          </div>

          {/* Main Feed */}
          <div className="col-span-6 space-y-4">
            {user && (
              <div className="bg-white rounded-lg shadow p-4">
                <form onSubmit={handleCreatePost}>
                  <div className="flex space-x-4">
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <input
                      type="text"
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder={`What's on your mind, ${user.fullName.split(' ')[0]}?`}
                      className="bg-gray-100 rounded-full px-4 py-2 flex-grow focus:outline-none"
                    />
                  </div>
                  {newPostText && (
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Post
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Posts */}
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow">
                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <h3 className="font-semibold">{post.author}</h3>
                      <p className="text-gray-500 text-sm">{post.time}</p>
                    </div>
                  </div>
                  <p className="mt-4">{post.content}</p>
                </div>
                {post.image && (
                  <img src={post.image} alt="" className="w-full" />
                )}
                <div className="p-4 border-t">
                  <div className="flex justify-between text-gray-500">
                    <button
                      className={`flex items-center space-x-2 hover:bg-gray-100 px-4 py-2 rounded-lg ${
                        post.liked ? 'text-blue-600' : ''
                      }`}
                      onClick={() => handleLike(post.id)}
                    >
                      <span>👍 {post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
                      <span>💬 {post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
                      <span>↗️ {post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold mb-4">Sponsored</h2>
              <div className="space-y-4">
                <a href="#" className="block">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
                    alt="Ad"
                    className="rounded-lg mb-2"
                  />
                  <p className="font-medium">Premium Headphones</p>
                  <p className="text-gray-500 text-sm">Shop now</p>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold mb-4">Contacts</h2>
              <div className="space-y-2">
                <a href="#" className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop"
                      alt="Contact"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span>Sarah Wilson</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}