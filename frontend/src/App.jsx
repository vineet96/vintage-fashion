import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Star,
  X,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Package,
  Award,
  ArrowRight,
  Sparkles,
  ShoppingBag as CartIcon
} from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Navigation & Filtering
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Selected Product Detail Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  // Shopping Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    customerName: '',
    customerEmail: '',
    shippingAddress: ''
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);

  // Sync debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400000); // Wait 400ms
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load products based on filter/search
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = '/api/products';
        const params = [];
        if (activeCategory !== 'all') {
          params.push(`category=${activeCategory}`);
        }
        if (searchQuery) {
          params.push(`q=${encodeURIComponent(searchQuery)}`);
        }
        if (params.length > 0) {
          url += '?' + params.join('&');
        }

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch clothing catalog');
        }
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory, searchQuery]);

  // Handle open details
  const openProductDetails = (product) => {
    setSelectedProduct(product);
    // Auto-select first size and color
    const sizes = product.sizes ? product.sizes.split(',') : [];
    const colors = product.colors ? product.colors.split(',') : [];
    setSelectedSize(sizes[0] || 'Standard');
    setSelectedColor(colors[0] || 'Default');
  };

  // Add item to cart
  const addToCart = (product, size, color) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image_url: product.image_url,
            size,
            color,
            quantity: 1,
            maxStock: product.stock
          }
        ];
      }
    });

    // Close details and slide open cart
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Modify Cart Item quantity
  const updateCartQuantity = (cartItemId, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + change;
            if (newQty <= 0) return null;
            if (newQty > item.maxStock) {
              alert(`Only ${item.maxStock} items available in stock.`);
              return item;
            }
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Calculate Cart Totals
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartTotalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Submit Order Form
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!checkoutForm.customerName || !checkoutForm.customerEmail || !checkoutForm.shippingAddress) {
      alert('Please fill out all billing and shipping fields.');
      return;
    }

    setCheckoutLoading(true);
    try {
      const orderData = {
        customerName: checkoutForm.customerName,
        customerEmail: checkoutForm.customerEmail,
        shippingAddress: checkoutForm.shippingAddress,
        totalAmount: cartSubtotal,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        }))
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Checkout process failed');
      }

      setOrderReceipt(data.receipt);
      setCart([]); // Clear cart
      setIsCheckoutOpen(false);
    } catch (err) {
      console.error(err);
      alert(`Checkout Error: ${err.message}`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navbar */}
      <header className="header">
        <a href="#" className="logo" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
          <span>Vintage</span>Fashion
        </a>

        <nav>
          <ul className="nav-links">
            <li>
              <span 
                className={`nav-link ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All Collection
              </span>
            </li>
            <li>
              <span 
                className={`nav-link ${activeCategory === 'men' ? 'active' : ''}`}
                onClick={() => setActiveCategory('men')}
              >
                Men
              </span>
            </li>
            <li>
              <span 
                className={`nav-link ${activeCategory === 'women' ? 'active' : ''}`}
                onClick={() => setActiveCategory('women')}
              >
                Women
              </span>
            </li>
            <li>
              <span 
                className={`nav-link ${activeCategory === 'accessories' ? 'active' : ''}`}
                onClick={() => setActiveCategory('accessories')}
              >
                Accessories
              </span>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search vintage clothing..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="icon-btn" onClick={() => setIsCartOpen(true)} aria-label="Open Shopping Bag">
            <ShoppingBag size={22} />
            {cartTotalQty > 0 && <span className="badge">{cartTotalQty}</span>}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      {activeCategory === 'all' && !searchQuery && (
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <p className="hero-tagline">Exquisite Heritage Wear</p>
            <h1 className="hero-title">Timeless Style for the Modern Era</h1>
            <p className="hero-description">
              Step into curated luxury. VintageFashion celebrates authentic silhouettes, premium natural textiles, and unparalleled tailor-made details inspired by mid-century styling.
            </p>
            <button className="btn-primary" onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore Collection
            </button>
          </div>
        </section>
      )}

      {/* Main Catalog Content */}
      <main className="catalog-container" id="catalog" style={{ flexGrow: 1 }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              {searchQuery ? 'Search Results' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Collection`}
            </h2>
            <p className="results-count">
              {loading ? 'Analyzing catalog...' : `${products.length} exclusive articles found`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">
            <Sparkles size={36} className="star-filled" style={{ animation: 'spin 2s linear infinite' }} />
            <p>Curating our premium vintage catalog...</p>
          </div>
        ) : error ? (
          <div className="empty-state" style={{ color: 'var(--color-error)' }}>
            <X size={36} />
            <p>Could not load collection: {error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <Package size={36} />
            <p>No articles match your selection. Try adjusting filters or searches.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <article 
                key={p.id} 
                className="product-card"
                onClick={() => openProductDetails(p)}
              >
                <div className="product-image-wrapper">
                  <img src={p.image_url} alt={p.name} className="product-image" loading="lazy" />
                  {p.stock <= 5 && p.stock > 0 && <span className="product-badge">Limited Stock</span>}
                  {p.stock === 0 && <span className="product-badge" style={{ backgroundColor: 'var(--color-text-muted)' }}>Sold Out</span>}
                </div>
                <div className="product-info">
                  <span className="product-category">{p.category}</span>
                  <h3 className="product-name">{p.name}</h3>
                  <div className="product-rating">
                    <Star size={14} className="star-filled" />
                    <span>{p.rating} / 5.0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span className="product-price">${parseFloat(p.price).toFixed(2)}</span>
                    <span className={`stock-pill ${p.stock > 0 ? 'stock-in' : 'stock-out'}`}>
                      {p.stock > 0 ? `${p.stock} available` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Brand Value Props Bar */}
      <section style={{ background: '#f0ede8', padding: '40px 5%', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <Award size={32} style={{ color: 'var(--color-accent)' }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '5px' }}>Premium Craftsmanship</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Meticulous tailoring, authentic vintage patterns, and heirloom-grade hardware.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <ShieldCheck size={32} style={{ color: 'var(--color-accent)' }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '5px' }}>Secure Ordering</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Fully encrypted SSL checkouts and robust order protection schemes.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <Package size={32} style={{ color: 'var(--color-accent)' }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '5px' }}>Complimentary Courier</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Free insured boutique-quality global packaging and express transit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="icon-btn modal-close-btn" onClick={() => setSelectedProduct(null)} aria-label="Close details">
              <X size={20} />
            </button>
            <div className="product-detail-grid">
              <div className="product-detail-image-sec">
                <img src={selectedProduct.image_url} alt={selectedProduct.name} className="product-detail-image" />
              </div>
              <div className="product-detail-info-sec">
                <div>
                  <span className="product-category" style={{ fontSize: '0.85rem' }}>{selectedProduct.category}</span>
                  <h2 className="product-detail-name" style={{ marginTop: '5px' }}>{selectedProduct.name}</h2>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="product-rating">
                    {[1,2,3,4,5].map((s) => (
                      <Star 
                        key={s} 
                        size={16} 
                        className={s <= Math.round(selectedProduct.rating) ? "star-filled" : ""} 
                        style={{ color: s <= Math.round(selectedProduct.rating) ? '#d4af37' : '#e0e0e0', fill: s <= Math.round(selectedProduct.rating) ? '#d4af37' : 'none' }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>({selectedProduct.rating} score)</span>
                </div>

                <div className="product-detail-price">${parseFloat(selectedProduct.price).toFixed(2)}</div>
                <p className="product-detail-desc">{selectedProduct.description}</p>

                {/* Sizing Selector */}
                {selectedProduct.sizes && (
                  <div className="option-group">
                    <span className="option-title">Select Size</span>
                    <div className="size-selector">
                      {selectedProduct.sizes.split(',').map((sz) => (
                        <button 
                          key={sz} 
                          className={`size-pill ${selectedSize === sz ? 'active' : ''}`}
                          onClick={() => setSelectedSize(sz)}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors Selector */}
                {selectedProduct.colors && (
                  <div className="option-group">
                    <span className="option-title">Select Color: <strong style={{ color: 'var(--color-text-dark)', textTransform: 'capitalize' }}>{selectedColor}</strong></span>
                    <div className="color-selector">
                      {selectedProduct.colors.split(',').map((col) => {
                        // Simple color converter for visualization
                        let colorHex = '#e0e0e0';
                        const colLower = col.toLowerCase().trim();
                        if (colLower.includes('black')) colorHex = '#1c1c1c';
                        else if (colLower.includes('brown') || colLower.includes('chestnut')) colorHex = '#5c4033';
                        else if (colLower.includes('camel') || colLower.includes('tan') || colLower.includes('cognac')) colorHex = '#c19a6b';
                        else if (colLower.includes('cream') || colLower.includes('oatmeal')) colorHex = '#f5f5dc';
                        else if (colLower.includes('green')) colorHex = '#2e8b57';
                        else if (colLower.includes('emerald')) colorHex = '#0f52ba';
                        else if (colLower.includes('navy') || colLower.includes('royal')) colorHex = '#000080';
                        else if (colLower.includes('red') || colLower.includes('burgundy')) colorHex = '#800020';
                        else if (colLower.includes('gray')) colorHex = '#808080';
                        else if (colLower.includes('white')) colorHex = '#ffffff';
                        else if (colLower.includes('lavender')) colorHex = '#e6e6fa';
                        else if (colLower.includes('ochre') || colLower.includes('gold')) colorHex = '#cc7722';

                        return (
                          <button 
                            key={col} 
                            className={`color-dot ${selectedColor === col.trim() ? 'active' : ''}`}
                            style={{ backgroundColor: colorHex }}
                            onClick={() => setSelectedColor(col.trim())}
                            title={col}
                            aria-label={`Select color ${col}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '20px', borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                  {selectedProduct.stock > 0 ? (
                    <button 
                      className="btn-primary" 
                      style={{ width: '100%' }}
                      onClick={() => addToCart(selectedProduct, selectedSize, selectedColor)}
                    >
                      Add To Shopping Bag
                    </button>
                  ) : (
                    <button 
                      className="btn-primary" 
                      style={{ width: '100%', backgroundColor: 'var(--color-text-muted)', cursor: 'not-allowed', background: 'var(--color-text-muted)', boxShadow: 'none' }} 
                      disabled
                    >
                      Sold Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar Drawer */}
      {isCartOpen && (
        <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3 className="drawer-title">Shopping Bag ({cartTotalQty})</h3>
              <button className="icon-btn" onClick={() => setIsCartOpen(false)} aria-label="Close shopping bag">
                <X size={20} />
              </button>
            </div>
            
            <div className="drawer-content">
              {cart.length === 0 ? (
                <div className="empty-state" style={{ height: '100%', justifyContent: 'center' }}>
                  <CartIcon size={48} style={{ color: 'var(--color-border)' }} />
                  <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Your shopping bag is empty.</p>
                  <p style={{ fontSize: '0.85rem' }}>Select an heirloom garment to start your styling legacy.</p>
                  <button className="btn-secondary" style={{ marginTop: '10px' }} onClick={() => setIsCartOpen(false)}>
                    Browse Garments
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="cart-item">
                      <img src={item.image_url} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-info">
                        <div>
                          <h4 className="cart-item-name">{item.name}</h4>
                          <p className="cart-item-meta">Size: {item.size} | Color: {item.color}</p>
                        </div>
                        <div className="cart-item-controls">
                          <div className="qty-counter">
                            <button className="qty-btn" onClick={() => updateCartQuantity(item.cartItemId, -1)} aria-label="Decrease quantity">
                              <Minus size={12} />
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button className="qty-btn" onClick={() => updateCartQuantity(item.cartItemId, 1)} aria-label="Increase quantity">
                              <Plus size={12} />
                            </button>
                          </div>
                          <span style={{ fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="cart-summary-row">
                  <span>Standard Shipping</span>
                  <span style={{ color: 'var(--color-success)', fontWeight: '500' }}>Complimentary</span>
                </div>
                <div className="cart-summary-row cart-summary-total">
                  <span>Estimated Total</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Form Modal */}
      {isCheckoutOpen && (
        <div className="modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
            <button className="icon-btn modal-close-btn" onClick={() => setIsCheckoutOpen(false)} aria-label="Close checkout">
              <X size={20} />
            </button>
            <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
              <h2 style={{ fontSize: '2rem', marginBottom: '25px', textAlign: 'center' }}>Secure Checkout</h2>
              
              <div style={{ background: '#f5f3ef', padding: '20px', marginBottom: '25px', border: '1px solid var(--color-border)' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08rem', marginBottom: '10px', color: 'var(--color-text-dark)' }}>Order Summary</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Articles in cart: {cartTotalQty}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontWeight: '600', color: 'var(--color-text-dark)' }}>
                  <span>Grand Total:</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="custName">Full Name</label>
                <input 
                  type="text" 
                  id="custName"
                  className="form-input" 
                  required 
                  placeholder="E.g., Margaret Sterling"
                  value={checkoutForm.customerName}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, customerName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="custEmail">Email Address</label>
                <input 
                  type="email" 
                  id="custEmail"
                  className="form-input" 
                  required 
                  placeholder="E.g., margaret@sterling.com"
                  value={checkoutForm.customerEmail}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, customerEmail: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="custAddr">Shipping & Billing Address</label>
                <textarea 
                  id="custAddr"
                  className="form-input form-textarea" 
                  required 
                  placeholder="123 Vintage Lane, Suite 10, New York, NY 10001"
                  value={checkoutForm.shippingAddress}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, shippingAddress: e.target.value })}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '15px' }}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? 'Encrypting Connection...' : `Finalize Order • $${cartSubtotal.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Seeding / Confirmation Alert */}
      {orderReceipt && (
        <div className="modal-backdrop" onClick={() => setOrderReceipt(null)}>
          <div className="modal" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="success-state">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(74, 124, 89, 0.1)', color: 'var(--color-success)' }}>
                <Check size={36} />
              </div>
              <div>
                <h2>Order Confirmed</h2>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '5px' }}>Receipt generated for: {orderReceipt.customerName}</p>
              </div>
              <div style={{ width: '100%', textAlign: 'left', background: '#fff', border: '1px solid var(--color-border)', padding: '20px', fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>
                <p style={{ marginBottom: '8px' }}><strong>Order reference:</strong> VF-{orderReceipt.orderId}-{Math.floor(Math.random() * 899 + 100)}</p>
                <p style={{ marginBottom: '8px' }}><strong>Billing total:</strong> ${parseFloat(orderReceipt.totalAmount).toFixed(2)}</p>
                <p style={{ marginBottom: '8px' }}><strong>Deliver to:</strong> {orderReceipt.customerEmail}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '12px' }}>A premium dispatch courier will email you tracking specifics momentarily. Thank you for partnering with VintageFashion.</p>
              </div>
              <button className="btn-primary" style={{ width: '100%' }} onClick={() => setOrderReceipt(null)}>
                Continue Styling
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>VintageFashion</h3>
            <p>Curators of timeless boutique attire. Restoring high-quality garment styling, luxurious natural yarns, and classical fits to your contemporary wardrobe.</p>
          </div>
          <div>
            <h4 className="footer-title">Departments</h4>
            <ul className="footer-links">
              <li><span style={{ cursor: 'pointer' }} onClick={() => setActiveCategory('men')}>Men's Styling</span></li>
              <li><span style={{ cursor: 'pointer' }} onClick={() => setActiveCategory('women')}>Women's Styling</span></li>
              <li><span style={{ cursor: 'pointer' }} onClick={() => setActiveCategory('accessories')}>Boutique Accessories</span></li>
              <li><span style={{ cursor: 'pointer' }} onClick={() => setActiveCategory('all')}>New Arrivals</span></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Brand Standards</h4>
            <ul className="footer-links">
              <li><a href="#">Bespoke Tailoring</a></li>
              <li><a href="#">Natural Fibers Policy</a></li>
              <li><a href="#">Eco-Responsible Dyeing</a></li>
              <li><a href="#">Heritage Preservation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Assistance</h4>
            <ul className="footer-links">
              <li><a href="#">Concierge Styling</a></li>
              <li><a href="#">Boutique Shipments</a></li>
              <li><a href="#">Exchanges & Returns</a></li>
              <li><a href="#">GCP Cloud SQL Powered</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 VintageFashion Inc. Designed with rich premium aesthetics. Powered by Node.js & React.js.</p>
          <p>Delivered securely via Google Cloud Run & Cloud SQL Postgres.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
