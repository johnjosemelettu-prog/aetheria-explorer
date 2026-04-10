
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Users, Send, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ConservationCircle = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const circlePosts = await AI.getConservationCirclePosts();
        setPosts(circlePosts);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    // Mock sending a new post
    const newPost = {
      id: posts.length + 1,
      author: "You",
      content: newPostContent,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString()
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">{t('conservationCircle.title')}</h1>
            <p className="text-center text-gray-600 mb-10">{t('conservationCircle.description')}</p>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <form onSubmit={handlePostSubmit}>
                <textarea 
                  className="w-full p-3 border rounded-lg mb-3" 
                  rows={3}
                  placeholder={t('conservationCircle.postPlaceholder')}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="mr-2 h-4 w-4"/>
                    {t('conservationCircle.post')}
                  </Button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              {posts.map(post => (
                <motion.div key={post.id} initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.1}} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                    <div>
                      <p className="font-bold">{post.author}</p>
                      <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center text-gray-500">
                    <Button variant="ghost" size="sm"><Heart className="mr-2 h-4 w-4"/> {post.likes}</Button>
                  </div>
                </motion.div>
              ))}
            </div>
        </motion.div>
    </div>
  );
};

export default ConservationCircle;
