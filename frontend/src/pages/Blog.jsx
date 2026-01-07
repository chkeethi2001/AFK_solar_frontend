import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "https://afk-solar-backend-5.onrender.com"; 

export default function Blog() {
  const storedRole = localStorage.getItem("role");
  const isAdmin = storedRole === "admin";

  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    desc: "",
  });

  // ---------------- FETCH ALL BLOGS ----------------
  const fetchBlogs = async () => {
    const res = await axios.get(`${API_URL}/api/blogs`);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ---------------- SAVE (CREATE / UPDATE) ----------------
  const handleSave = async () => {
    if (!form.title || !form.desc) return;

    if (editId) {
      // UPDATE blog
      await axios.put(`${API_URL}/api/blogs/${editId}`, form);
    } else {
      // CREATE blog
      await axios.post(`${API_URL}/api/blogs`, form);
    }

    setForm({ title: "", desc: "" });
    setEditId(null);
    setShowForm(false);
    fetchBlogs();
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Blog & Solar Resources
      </h1>

      {isAdmin && (
        <div className="text-right mb-4">
          <button
            onClick={() => {
              setForm({ title: "", desc: "" });
              setEditId(null);
              setShowForm(true);
            }}
            className="bg-green-700 text-white px-4 py-2 rounded-lg shadow hover:bg-green-800"
          >
            + Add Blog
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.div
            key={p._id}
            className="bg-white shadow rounded-xl p-6 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div>
              <h3 className="font-bold text-lg text-green-700">{p.title}</h3>
              <p className="text-gray-600 my-2">{p.desc}</p>
            </div>

            {isAdmin && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setForm({ title: p.title, desc: p.desc });
                    setEditId(p._id);
                    setShowForm(true);
                  }}
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {isAdmin && showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 text-green-700">
              {editId ? "Edit Blog" : "Add Blog"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Blog Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                className="w-full border p-2 rounded"
                placeholder="Short Description"
                value={form.desc}
                onChange={(e) =>
                  setForm({ ...form, desc: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
