import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function GlobalEyes() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState({});

  const addPost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { id: posts.length + 1, text: newPost, likes: 0 }]);
      setNewPost("");
    }
  };

  const likePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      ).sort((a, b) => b.likes - a.likes)
    );
  };

  const addComment = (postId, comment) => {
    if (!comments[postId]) comments[postId] = [];
    comments[postId].push(comment);
    setComments({ ...comments });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-black text-red-500 min-h-screen">
      <motion.h1 
        className="text-4xl font-bold text-center" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Global Eyes
      </motion.h1>
      <motion.p 
        className="mt-2 text-sm text-center" 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Website ini mendukung kebebasan bicara dalam mengkritik politik dan
        beberapa kebebasan berbicara dengan anonymous. Anda bisa
        membangkitkan kembali kasus-kasus yang sengaja dipendam oleh
        pemerintah.
      </motion.p>
      <p className="mt-2 text-xs text-red-600 text-center">
        Disclaimer: Pengguna bertanggung jawab atas konten yang diunggah.
      </p>
      <p className="mt-4 text-xs font-bold text-center">Powered by ZeRotrus/RtR0 and Afifcom32</p>
      
      <div className="flex gap-2 mt-4">
        <Input
          className="bg-gray-800 border-red-500 text-white"
          type="text"
          placeholder="Cari postingan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="bg-red-500 hover:bg-red-700"><Search size={18} /></Button>
      </div>
      
      <motion.div 
        className="mt-4" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Textarea
          className="bg-gray-800 border-red-500 text-white"
          placeholder="Tulis sesuatu..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <Button onClick={addPost} className="mt-2 w-full bg-red-500 hover:bg-red-700">Post</Button>
      </motion.div>
      
      <div className="mt-6 space-y-4">
        {posts.filter(post => post.text.includes(search)).map((post) => (
          <motion.div 
            key={post.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-4 bg-gray-900 border-red-500">
              <CardContent>
                <p>{post.text}</p>
                <div className="flex justify-between mt-2">
                  <Button onClick={() => likePost(post.id)} className="bg-red-500 hover:bg-red-700">👍 {post.likes}</Button>
                </div>
                <div className="mt-2">
                  <Textarea
                    className="bg-gray-800 border-red-500 text-white"
                    placeholder="Tambahkan komentar..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addComment(post.id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <div className="mt-2 text-sm">
                    {comments[post.id]?.map((cmt, i) => (
                      <p key={i} className="mt-1 border-l-2 pl-2 text-red-400">{cmt}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
