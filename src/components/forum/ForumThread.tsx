"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

type Post = {
  id: string;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
};

// Simulated mock API
const mockPosts: Post[] = [
  { id: "1", author: "Мария", content: "Где лучше всего гулять с собакой в Приморском районе?", likes: 12, timestamp: "2ч назад" },
  { id: "2", author: "Константин", content: "Посоветуйте проверенного ветеринара для ежегодной вакцинации.", likes: 5, timestamp: "5ч назад" },
  { id: "3", author: "Алексей", content: "Коржик отказывается есть сухой корм, что делать?", likes: 34, timestamp: "1 день назад" }
];

const fetchPosts = async () => {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));
  return [...mockPosts];
};

const likePost = async (postId: string) => {
  await new Promise(r => setTimeout(r, 500));
  return postId;
};

export function ForumThread() {
  const queryClient = useQueryClient();

  // 1. Fetch posts Query
  const { data: posts, isLoading } = useQuery({
    queryKey: ["forum-posts"],
    queryFn: fetchPosts,
  });

  // 2. Optimistic Like Mutation
  const likeMutation = useMutation({
    mutationFn: likePost,
    // Optimistic Update
    onMutate: async (likedPostId) => {
      await queryClient.cancelQueries({ queryKey: ["forum-posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["forum-posts"]);

      if (previousPosts) {
        queryClient.setQueryData<Post[]>(["forum-posts"], old => {
          if (!old) return old;
          return old.map(post => 
            post.id === likedPostId ? { ...post, likes: post.likes + 1 } : post
          );
        });
      }
      return { previousPosts };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["forum-posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["forum-posts"] }); // Usually uncommented for true server sync
    },
  });

  if (isLoading) {
    return <div className="p-8 text-center text-on-surface/50 animate-pulse">Загрузка форума...</div>;
  }

  return (
    <div className="space-y-6">
      {posts?.map(post => (
        <div key={post.id} className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-surface-container outline-none flex items-center justify-center font-bold text-primary">
                 {post.author.charAt(0)}
               </div>
               <div>
                 <h4 className="font-semibold">{post.author}</h4>
                 <span className="text-xs text-on-surface/50">{post.timestamp}</span>
               </div>
            </div>
          </div>
          <p className="text-on-surface/80 mb-6">{post.content}</p>
          <div className="flex items-center gap-4">
            <Button 
               variant="outline" 
               size="sm" 
               className="gap-2 rounded-full"
               onClick={() => likeMutation.mutate(post.id)}
            >
              ❤️ <span className="font-semibold">{post.likes}</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">💬 Обсудить</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
