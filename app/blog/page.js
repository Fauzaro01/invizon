"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const postsData = await response.json();
        setPosts(postsData);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (filtered) => {
    setFilteredPosts(filtered);
  };

  const categoryFilteredPosts =
    selectedCategory === "all"
      ? filteredPosts
      : filteredPosts.filter((post) => post.category === selectedCategory);

  const categories = ["all", ...new Set(posts.map((post) => post.category))];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#234362] mb-4">
            Invizone Blog
          </h1>
          <p className="text-lg text-gray-600">Latest updates from our class</p>
        </motion.div>

        <SearchBar
          data={posts}
          onFilter={handleSearch}
          placeholder="Search blog posts..."
        />

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize text-sm font-medium ${
                selectedCategory === category
                  ? "bg-[#234362] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {isLoading && (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-xl shadow-md"
          >
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-medium text-red-600 mb-2">Error Loading Posts</h3>
            <p className="text-gray-500">{error}</p>
          </motion.div>
        )}

        {!isLoading && !error && (
          <div className="space-y-8">
            <AnimatePresence>
              {categoryFilteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-[#234362]">
                        {post.title}
                      </h2>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && !error && categoryFilteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-xl shadow-md"
          >
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {selectedCategory === "all"
                ? "No posts yet"
                : "No posts in this category"}
            </h3>
            <p className="text-gray-500">Check back later for updates!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
