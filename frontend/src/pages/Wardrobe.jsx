import React, { useState, useMemo } from "react";
import "./Wardrobe.css";

const categories = ["All", "T-Shirts", "Shirts", "Jackets", "Jeans", "Coats", "Pants", "Dresses", "Shoes"];
const colors = ["All", "Black", "White", "Blue", "Red", "Green", "Yellow", "Brown", "Gray"];
const materials = ["All", "Cotton", "Denim", "Leather", "Polyester", "Wool", "Silk", "Linen"];
const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL"];

const initialItems = [
  {
    id: 1,
    name: "Navy Blue Jacket",
    category: "Jacket",
    color: "Blue",
    material: "Leather",
    size: "M",
    image: "https://m.media-amazon.com/images/I/71YtuIZPmCL._AC_UY1000_.jpg",
    description: ""
  },
  {
    id: 2,
    name: "Cyberpunk Pants",
    category: "Pants",
    color: "Grey",
    material: "Cotton",
    size: "M",
    image: "https://techwearstorm.com/cdn/shop/files/cyberpunk-pants-tomari-s-techwear-storm-237.jpg?v=1714068018&width=700",
    description: ""
  },
  {
    id: 3,
    name: "Techwear Jacket",
    category: "Jacket",
    color: "Black",
    material: "Polyester",
    size: "M",
    image: "https://techwearstorm.com/cdn/shop/files/techwear-jacket-sakibe-black-m-storm-622.webp?v=1741944968&width=700",
    description: ""
  },
{
    id: 3,
    name: "Techwear Vest",
    category: "Pants",
    color: "Black",
    material: "Polyester",
    size: "M",
    image: "https://techwearstorm.com/cdn/shop/files/futuristic-cyberpunk-pants-boso-s-techwear-storm-825.webp?v=1746564973&width=700",
    description: ""
  },

];

// Color mapping for visual representation
const getColorStyle = (colorName) => {
  const colorMap = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Blue': '#007bff',
    'Red': '#dc3545',
    'Green': '#28a745',
    'Yellow': '#ffc107',
    'Brown': '#8B4513',
    'Gray': '#6c757d',
    'Grey': '#6c757d'
  };
  
  const backgroundColor = colorMap[colorName] || '#e9ecef';
  const textColor = ['Black', 'Blue', 'Brown'].includes(colorName) ? '#ffffff' : '#000000';
  
  return {
    backgroundColor,
    color: textColor,
    border: colorName === 'White' ? '1px solid #dee2e6' : 'none'
  };
};

function Wardrobe() {
  const [items, setItems] = useState(initialItems);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'T-Shirts',
    color: 'Black',
    material: 'Cotton',
    size: 'M',
    image: null,
    imagePreview: null
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesColor = selectedColor === "All" || item.color === selectedColor;
      const matchesMaterial = selectedMaterial === "All" || item.material === selectedMaterial;
      const matchesSize = selectedSize === "All" || item.size === selectedSize;
      
      return matchesSearch && matchesCategory && matchesColor && matchesMaterial && matchesSize;
    });
  }, [items, searchQuery, selectedCategory, selectedColor, selectedMaterial, selectedSize]);

  const groupedItems = useMemo(() => {
    const grouped = {};
    filteredItems.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  }, [filteredItems]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedColor("All");
    setSelectedMaterial("All");
    setSelectedSize("All");
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setNewItem({
      name: '',
      category: 'T-Shirts',
      color: 'Black',
      material: 'Cotton',
      size: 'M',
      image: null,
      imagePreview: null
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewItem(prev => ({
          ...prev,
          image: file,
          imagePreview: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (!newItem.name.trim() || !newItem.imagePreview) {
      alert('Please provide a name and upload an image for your clothing item.');
      return;
    }

    const newClothingItem = {
      id: Math.max(...items.map(item => item.id), 0) + 1,
      name: newItem.name,
      category: newItem.category,
      color: newItem.color,
      material: newItem.material,
      size: newItem.size,
      image: newItem.imagePreview // In a real app, this would be uploaded to a server
    };

    setItems(prev => [...prev, newClothingItem]);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    closeUploadModal();
  };

  const deleteItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    closeModal();
  };

  return (
    <div className="wardrobe">
      {/* Header */}
      <div className="header">
        <h1>My Wardrobe</h1>
        <div className="header-buttons">
          <button 
            className="upload-btn"
            onClick={openUploadModal}
          >
            📷 Add Item
          </button>
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            🔍 Filters
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          ✅ Item added to your wardrobe successfully!
        </div>
      )}

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search your wardrobe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Type:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Color:</label>
            <select 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value)}
              className="filter-select"
            >
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Material:</label>
            <select 
              value={selectedMaterial} 
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="filter-select"
            >
              {materials.map(material => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Size:</label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
              className="filter-select"
            >
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      )}

      {/* Results Summary */}
      <div className="results-summary">
        Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
      </div>

      {/* Grouped Items */}
      <div className="clothing-groups">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="no-results">
            <p>No items found matching your criteria.</p>
          </div>
        ) : (
          Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="category-section">
              <h2 className="category-header">{category}</h2>
              <div className="items-grid">
                {categoryItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="clothing-card"
                    onClick={() => openModal(item)}
                  >
                    <div className="card-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="card-content">
                      <h3 className="item-name">{item.name}</h3>
                      <div className="item-details">
                        <span 
                          className="color-tag"
                          style={getColorStyle(item.color)}
                        >
                          {item.color}
                        </span>
                        <span className="detail-item">🧵 {item.material}</span>
                        <span className="detail-item">📏 {item.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={closeUploadModal}>
          <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeUploadModal}>
              ×
            </button>
            <div className="modal-body">
              <h2 className="modal-title">Add New Clothing Item</h2>
              
              <div className="upload-form">
                <div className="image-upload-section">
                  <div className="image-preview">
                    {newItem.imagePreview ? (
                      <img src={newItem.imagePreview} alt="Preview" className="preview-img" />
                    ) : (
                      <div className="upload-placeholder">
                        <span className="upload-icon">📷</span>
                        <p>Click to upload image</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="upload-label">
                    {newItem.imagePreview ? 'Change Image' : 'Upload Image'}
                  </label>
                </div>
                
                <div className="form-fields">
                  <div className="field-group">
                    <label>Item Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newItem.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Blue Denim Jacket"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="field-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={newItem.category}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {categories.filter(cat => cat !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="field-group">
                    <label>Color</label>
                    <select
                      name="color"
                      value={newItem.color}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {colors.filter(color => color !== 'All').map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="field-group">
                    <label>Material</label>
                    <select
                      name="material"
                      value={newItem.material}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {materials.filter(material => material !== 'All').map(material => (
                        <option key={material} value={material}>{material}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="field-group">
                    <label>Size</label>
                    <select
                      name="size"
                      value={newItem.size}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {sizes.filter(size => size !== 'All').map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button onClick={closeUploadModal} className="cancel-btn">
                    Cancel
                  </button>
                  <button onClick={handleAddItem} className="add-btn">
                    Add to Wardrobe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedItem.image} alt={selectedItem.name} />
              </div>
              <div className="modal-details">
                <h2 className="modal-title">{selectedItem.name}</h2>
                <div className="modal-category">{selectedItem.category}</div>
                <div className="modal-tags">
                  <span 
                    className="modal-color-tag"
                    style={getColorStyle(selectedItem.color)}
                  >
                    {selectedItem.color}
                  </span>
                  <span className="modal-detail-tag">
                    🧵 {selectedItem.material}
                  </span>
                  <span className="modal-detail-tag">
                    📏 {selectedItem.size}
                  </span>
                </div>
                <div className="modal-actions">
                  <button 
                    className="modal-action-btn delete-btn"
                    onClick={() => deleteItem(selectedItem.id)}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wardrobe;
