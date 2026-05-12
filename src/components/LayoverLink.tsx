
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useTranslation } from "react-i18next";

interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  destination: string;
  message: string;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: 'p-001',
    userName: 'Sophia',
    userAvatar: 'https://i.pravatar.cc/150?u=sophia',
    destination: 'LHR',
    message: 'Stuck at JFK for 5 hours. Anyone want to grab a coffee?',
    timestamp: '2 hours ago',
  },
  {
    id: 'p-002',
    userName: 'Ben',
    userAvatar: 'https://i.pravatar.cc/150?u=ben',
    destination: 'SFO',
    message: "My flight to SFO is delayed. I'm in Terminal 4, near the Shake Shack. Up for a chat!",
    timestamp: '1 hour ago',
  },
  {
    id: 'p-003',
    userName: 'Maria',
    userAvatar: 'https://i.pravatar.cc/150?u=maria',
    destination: 'DXB',
    message: 'Anyone know if the Centurion Lounge is crowded right now?',
    timestamp: '45 minutes ago',
  },
];

const LayoverLink: React.FC = () => {
    const { t } = useTranslation();
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: `p-${Date.now()}`,
        userName: 'You',
        userAvatar: 'https://i.pravatar.cc/150?u=you',
        destination: '???',
        message: newPost,
        timestamp: 'Just now',
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{t('auto.auto_layover_link_286')}</h1>
      <p className="text-center text-gray-500 mb-6">{t('auto.auto_connect_with_fellow__285')}</p>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('auto.auto_jfk___terminal_4_com_284')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <Avatar>
                  <AvatarImage src={post.userAvatar} />
                  <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{post.userName}</p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                  <p className="text-sm">{t('auto.auto_to__283')} <Badge variant="outline">{post.destination}</Badge></p>
                  <p className="mt-2">{post.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
            <Input 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={t('auto.auto_share_your_status_or_282')}
            />
          <Button onClick={handlePost}>{t('auto.auto_post_281')}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LayoverLink;
