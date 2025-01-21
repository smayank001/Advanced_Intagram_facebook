import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, MessageCircle, Bookmark, Menu, MoreHorizontal, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

// Mock data
const mockStories = [
  {
    id: 1,
    username: 'johndoe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop'
  },
  {
    id: 2,
    username: 'sarahwilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop'
  }
];

const mockPosts = [
  {
    id: 1,
    username: 'johndoe',
    userId: '1',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    likes: 1234,
    caption: 'Morning workout session 💪 #fitness #motivation',
    comments: 42,
    time: '2 HOURS AGO',
    liked: false,
    saved: false
  },
  {
    id: 2,
    username: 'sarahwilson',
    userId: '2',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    likes: 2843,
    caption: 'Paradise found 🌅 #beach #sunset',
    comments: 95,
    time: '4 HOURS AGO',
    liked: false,
    saved: false
  }
];

const mockSuggestions = [
  {
    id: 1,
    username: 'mike_smith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
    subtitle: 'Followed by johndoe + 2 more'
  },
  {
    id: 2,
    username: 'emma_watson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
    subtitle: 'Followed by sarahwilson + 3 more'
  }
];

export default function Instagram() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const [newComment, setNewComment] = useState('');
  const [commentingOn, setCommentingOn] = useState<number | null>(null);

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

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          saved: !post.saved
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: number) => {
    if (!newComment.trim() || !user) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));

    setNewComment('');
    setCommentingOn(null);
  };

  if (!user && !showAuthModal) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        platform="instagram"
      />

      {/* Header */}
      <header className="bg-white border-b fixed w-full top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-semibold">Instagram</Link>

          <div className="relative max-w-xs w-64 hidden md:block">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              className={`p-1 ${activeTab === 'home' ? 'text-black' : 'text-gray-600'}`}
              onClick={() => setActiveTab('home')}
            >
              <Home className="h-6 w-6" />
            </button>
            <button className="p-1">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="p-1">
              <PlusSquare className="h-6 w-6" />
            </button>
            <button className="p-1">
              <Search className="h-6 w-6 md:hidden" />
            </button>
            <button className="p-1">
              <Heart className="h-6 w-6" />
            </button>
            {user ? (
              <div className="relative group">
                <button className="p-1">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
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
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-8">
        <div className="max-w-5xl mx-auto px-4 flex">
          {/* Main Feed */}
          <div className="max-w-xl w-full mx-auto">
            {/* Stories */}
            <div className="bg-white border rounded-lg p-4 mb-4">
              <div className="flex space-x-4 overflow-x-auto">
                {mockStories.map(story => (
                  <button key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
                    <div className="p-1 bg-gradient-to-tr from-yellow-400 to-pink-600 rounded-full">
                      <div className="bg-white p-0.5 rounded-full">
                        <img
                          src={story.avatar}
                          alt={story.username}
                          className="w-14 h-14 rounded-full"
                        />
                      </div>
                    </div>
                    <span className="text-xs">{story.username}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            {posts.map(post => (
              <div key={post.id} className="bg-white border rounded-lg mb-4">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-2">
                    <img src={post.avatar} alt={post.username} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold">{post.username}</span>
                  </div>
                  <button>
                    <MoreHorizontal className="h-6 w-6" />
                  </button>
                </div>

                <img src={post.image} alt="" className="w-full" />

                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => handleLike(post.id)}>
                        <Heart className={`h-6 w-6 ${post.liked ? 'fill-current text-red-500' : ''}`} />
                      </button>
                      <button onClick={() => setCommentingOn(post.id)}>
                        <MessageCircle className="h-6 w-6" />
                      </button>
                    </div>
                    <button onClick={() => handleSave(post.id)}>
                      <Bookmark className={`h-6 w-6 ${post.saved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <p className="font-semibold mb-1">{post.likes.toLocaleString()} likes</p>
                  <p>
                    <span className="font-semibold">{post.username}</span>{' '}
                    {post.caption}
                  </p>
                  <button className="text-gray-500 text-sm mt-1">
                    View all {post.comments} comments
                  </button>
                  <p className="text-gray-500 text-xs mt-1">{post.time}</p>
                </div>

                {user && (
                  <div className="flex items-center border-t p-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentingOn === post.id ? newComment : ''}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-grow focus:outline-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleComment(post.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleComment(post.id)}
                      className="text-blue-500 font-semibold ml-2"
                      disabled={!newComment.trim()}
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          {user && (
            <div className="hidden lg:block w-80 ml-8">
              <div className="fixed w-80">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-gray-500">{user.fullName}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500 font-semibold">Suggestions For You</span>
                    <button className="text-sm font-semibold">See All</button>
                  </div>

                  {mockSuggestions.map(suggestion => (
                    <div key={suggestion.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={suggestion.avatar}
                          alt={suggestion.username}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-sm">{suggestion.username}</p>
                          <p className="text-gray-500 text-xs">{suggestion.subtitle}</p>
                        </div>
                      </div>
                      <button className="text-blue-500 text-xs font-semibold">Follow</button>
                    </div>
                  ))}
                </div>

                <nav className="text-xs text-gray-400">
                  <div className="flex flex-wrap gap-x-2 mb-4">
                    <a href="#">About</a>
                    <a href="#">Help</a>
                    <a href="#">Press</a>
                    <a href="#">API</a>
                    <a href="#">Jobs</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                  </div>
                  <p>© 2024 INSTAGRAM FROM META</p>
                </nav>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}