import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://afk-solar-backend-5.onrender.com";

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState(null); // track user role

  const [showForm, setShowForm] = useState(false);

  const initialProjectState = {
    title: "",
    type: "Residential",
    image: "",
    description: "",
    location: "",
    savings: "",
    file: null,
  };

  const [newProject, setNewProject] = useState(initialProjectState);
  const [lightbox, setLightbox] = useState(null);
  const [editId, setEditId] = useState(null); // track project being edited

  // GET role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  // GET PROJECTS
  useEffect(() => {
    axios
      .get(`${API_URL}/api/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.log("Error loading projects", err));
  }, []);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.type === filter);

  // HANDLE IMAGE UPLOAD
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewProject({ ...newProject, file, image: URL.createObjectURL(file) });
  };

  // RESET FORM
  const resetForm = () => {
    setNewProject(initialProjectState);
    setEditId(null);
  };

  // SAVE PROJECT (add or edit)
  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(newProject).forEach(([key, value]) =>
        formData.append(key, value)
      );

      let res;
      if (editId) {
        res = await axios.put(`${API_URL}/api/projects/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProjects((prev) =>
          prev.map((p) => (p._id === editId ? res.data : p))
        );
      } else {
        res = await axios.post(`${API_URL}/api/projects`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProjects((prev) => [res.data, ...prev]);
      }

      resetForm();
      setShowForm(false);
    } catch (err) {
      console.log("Error saving project:", err);
    }
  };

  // DELETE PROJECT
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log("Error deleting project:", err.response?.data || err);
    }
  };

  // EDIT PROJECT
  const handleEdit = (project) => {
    setNewProject({
      title: project.title,
      type: project.type,
      image: project.image,
      description: project.description,
      location: project.location,
      savings: project.savings,
      file: null,
    });
    setEditId(project._id);
    setShowForm(true);
  };

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="text-center px-6 py-16 bg-gradient-to-r from-green-900 to-green-600 text-white">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Projects That Power The Future
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Explore real installations transforming homes and businesses across
          India.
        </motion.p>
      </section>

      {/* ADMIN BUTTON */}
      {role === "admin" && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-800"
          >
            + Add New Project
          </button>
        </div>
      )}

      {/* FILTER BUTTONS */}
      <div className="flex justify-center gap-4 mt-8">
        {["All", "Residential", "Commercial"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-5 py-2 rounded-full border transition font-medium ${
              filter === t
                ? "bg-green-700 text-white border-green-700"
                : "bg-white border-gray-300 hover:border-green-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* PROJECT CARDS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-12">
        {filtered.map((project, index) => (
          <motion.div
            key={project._id}
            className="backdrop-blur bg-white/80 rounded-2xl shadow hover:shadow-2xl transition border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="relative">
              <img
                src={`${API_URL}${project.image}`}
                alt={project.title}
                className="h-52 w-full object-cover cursor-pointer"
                onClick={() => setLightbox(`${API_URL}${project.image}`)}
              />
              <span className="absolute top-3 left-3 bg-green-700 text-white text-xs px-3 py-1 rounded-full">
                {project.type}
              </span>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{project.description}</p>
              <div className="mt-4 text-sm space-y-1">
                <p>
                  <strong>Location:</strong> {project.location}
                </p>
                <p>
                  <strong>Estimated Savings:</strong> {project.savings}
                </p>
              </div>

              {/* ADMIN ACTIONS */}
              {role === "admin" && (
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Project"
            className="max-h-[85vh] rounded-lg shadow"
          />
        </div>
      )}

      {/* ADD / EDIT FORM */}
      {role === "admin" && showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-green-700">
              {editId ? "Edit Project" : "Add New Project"}
            </h3>

            <div className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                placeholder="Project Name"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
              />
              <select
                className="w-full border p-2 rounded"
                value={newProject.type}
                onChange={(e) =>
                  setNewProject({ ...newProject, type: e.target.value })
                }
              >
                <option>Residential</option>
                <option>Commercial</option>
              </select>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Upload Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border p-2 rounded"
                  onChange={handleThumbnail}
                />
                {newProject.image && (
                  <img
                    src={newProject.image}
                    alt="Preview"
                    className="mt-3 h-32 rounded-lg object-cover border"
                  />
                )}
              </div>
              <input
                className="w-full border p-2 rounded"
                placeholder="Location"
                value={newProject.location}
                onChange={(e) =>
                  setNewProject({ ...newProject, location: e.target.value })
                }
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Estimated Savings"
                value={newProject.savings}
                onChange={(e) =>
                  setNewProject({ ...newProject, savings: e.target.value })
                }
              />
              <textarea
                className="w-full border p-2 rounded"
                placeholder="Short Description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
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
};

export default Projects;
