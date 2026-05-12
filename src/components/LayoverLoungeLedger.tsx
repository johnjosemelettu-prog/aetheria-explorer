
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
  flightTo: string;
  message: string;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: 'post-1',
    userName: 'Lotte',
    userAvatar: 'https://i.pravatar.cc/150?u=lotte',
    flightTo: 'SIN',
    message: 'Long layover at AMS. Anyone at the Aspire Lounge (No. 41)? Could use some company.',
    timestamp: '30 minutes ago',
  },
  {
    id: 'post-2',
    userName: 'Finn',
    userAvatar: 'https://i.pravatar.cc/150?u=finn',
    flightTo: 'JFK',
    message: 'My flight is delayed by 2 hours. Thinking of heading into the city for a bit. Anyone want to split a cab?',
    timestamp: '1 hour ago',
  },
  {
    id: 'post-3',
    userName: 'Noa',
    userAvatar: 'https://i.pravatar.cc/150?u=noa',
    flightTo: 'DXB',
    message: 'Just landed. Anyone know the fastest way to get to the city center from Schiphol?',
    timestamp: '5 minutes ago',
  },
];

const LayoverLoungeLedger: React.FC = () => {
    const { t } = useTranslation();
  const [posts, setPosts] = useState(mockPosts);
  const [newMessage, setNewMessage] = useState('');

  const handlePost = () => {
    if (newMessage.trim()) {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        userName: 'You',
        userAvatar: 'https://i.pravatar.cc/150?u=currentuser',
        flightTo: 'N/A',
        message: newMessage,
        timestamp: 'Just now',
      };
      setPosts([newPost, ...posts]);
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{t('auto.auto_layover_lounge_ledge_292')}</h1>
      <p className="text-center text-gray-500 mb-6">{t('auto.auto_you_are_at_amsterdam_291')}</p>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{t('auto.auto_ams_community_board_290')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="flex gap-4 p-4 border rounded-lg">
              <Avatar>
                <AvatarImage src={post.userAvatar} />
                <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{post.userName}</p>
                  <p className="text-xs text-gray-400">{post.timestamp}</p>
                </div>
                <p className="text-sm">{t('auto.auto_flight_to__289')} <Badge variant="outline">{post.flightTo}</Badge></p>
                <p className="mt-2 text-gray-700">{post.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex gap-2 p-4">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder={t('auto.auto_share_an_update_or_a_288')}
          />
          <Button onClick={handlePost}>{t('auto.auto_post_287')}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LayoverLoungeLedger;
