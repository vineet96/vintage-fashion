import { pool } from './db.js';

const products = [
  {
    name: "Classic Heritage Leather Jacket",
    category: "men",
    description: "Crafted from premium full-grain lambskin leather. This classic biker jacket features dual zippered waist pockets, asymmetrical zipper closure, and is fully lined for maximum comfort and wind protection. A timeless investment piece that ages beautifully.",
    price: 349.99,
    image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "M,L,XL,XXL",
    colors: "Vintage Brown,Midnight Black",
    stock: 24
  },
  {
    name: "Gabriela Wool Blend Trench Coat",
    category: "women",
    description: "An elegant, double-breasted trench coat tailored in a premium wool blend. Features a structured lapel, button-adjustable cuffs, removable tie-belt at the waist, and deep welt pockets. Designed to drape gracefully over any attire.",
    price: 279.50,
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "XS,S,M,L,XL",
    colors: "Soft Camel,Charcoal Gray,Black",
    stock: 15
  },
  {
    name: "1970s Cable-Knit Crewneck Sweater",
    category: "men",
    description: "Spun from 100% merino wool, this chunky cable-knit sweater provides exceptional warmth and a rich vintage look. Thick ribbed collar, cuffs, and hem. Inspired by mid-century alpine styles.",
    price: 129.00,
    image_url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    sizes: "S,M,L,XL",
    colors: "Oatmeal Cream,Forest Green,Rust",
    stock: 32
  },
  {
    name: "Audrey Silk Polka Dot Midi Dress",
    category: "women",
    description: "Channeling 1950s elegance, this dress is cut from liquid-smooth silk-crepe with a charming polka-dot print. Features a cinched waist with a thin sash belt, a classic boat neckline, and a gently pleated A-line skirt that moves beautifully.",
    price: 189.00,
    image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    sizes: "XS,S,M,L",
    colors: "Navy/White,Black/Red",
    stock: 12
  },
  {
    name: "Heritage Tweed Wool Blazer",
    category: "men",
    description: "A beautifully structured blazer crafted from pure Shetland tweed wool. Impeccably tailored with custom notched lapels, two-button front, double back vents, and genuine leather-wrapped buttons. Fully lined with satin fabric.",
    price: 245.00,
    image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    sizes: "M,L,XL",
    colors: "Brown Herringbone,Olive Check",
    stock: 18
  },
  {
    name: "Charlotte Velvet Evening Slip Dress",
    category: "women",
    description: "Slip into pure luxury. This evening slip dress is made from silk-blend velvet that hugs the frame elegantly. Delicate, adjustable spaghetti straps, a soft cowl neckline, and a thigh-high side slit make it perfect for formal events.",
    price: 210.00,
    image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "XS,S,M,L",
    colors: "Royal Burgundy,Midnight Emerald",
    stock: 8
  },
  {
    name: "Handstitched Leather Satchel",
    category: "accessories",
    description: "A masterclass in traditional leathercraft. Made from thick vegetable-tanned leather, handstitched with heavy-duty waxed thread. Solid brass buckles, an adjustable shoulder strap, and multiple internal compartments designed to comfortably fit a 15-inch laptop.",
    price: 159.00,
    image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    sizes: "One Size",
    colors: "Chestnut Brown,Cognac Tan",
    stock: 20
  },
  {
    name: "Gold-Rimmed Classic Aviator Sunglasses",
    category: "accessories",
    description: "Originally designed for pilots in the 1930s, these classic aviator sunglasses are engineered with polished, gold-plated titanium frames and green-tinted polarized mineral glass lenses. Offers 100% UVA/UVB protection.",
    price: 95.00,
    image_url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    sizes: "Standard",
    colors: "Gold/Green Lens,Silver/Dark Gray Lens",
    stock: 45
  },
  {
    name: "Classic Silk Oxford Dress Shirt",
    category: "men",
    description: "Combining the breathability of linen with the soft drape of pure mulberry silk. A classic collar shirt with single-needle tailoring, back box pleat for movement, and clean pearl-effect buttons. Perfect for semi-formal layering.",
    price: 89.00,
    image_url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80",
    rating: 4.3,
    sizes: "S,M,L,XL,XXL",
    colors: "Oxford White,Sky Blue,Soft Lavender",
    stock: 50
  },
  {
    name: "Genevieve Pleated Silk Scarf",
    category: "accessories",
    description: "Luxurious 100% silk twill scarf with a rich retro floral and geometric hand-rolled edge pattern. Soft, lightweight, and versatile - can be styled as a head scarf, necktie, or wrapped around the handle of your favorite handbag.",
    price: 65.00,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "90cm x 90cm",
    colors: "Vintage Ochre,Ruby Red",
    stock: 35
  }
];

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log('Beginning database initialization...');

    // 1. Create table products
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(255),
        rating DECIMAL(3,2),
        sizes VARCHAR(100),
        colors VARCHAR(100),
        stock INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Products table verified/created.');

    // 2. Create table orders
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        customer_email VARCHAR(100) NOT NULL,
        shipping_address TEXT NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Orders table verified/created.');

    // 3. Create table order_items
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        size VARCHAR(50),
        color VARCHAR(50)
      );
    `);
    console.log('Order Items table verified/created.');

    // 4. Check if we already have products, if not insert dummy data
    const res = await client.query('SELECT COUNT(*) FROM products');
    const count = parseInt(res.rows[0].count, 10);
    
    if (count === 0) {
      console.log('No products found, seeding dummy clothing data...');
      for (const p of products) {
        await client.query(
          `INSERT INTO products (name, category, description, price, image_url, rating, sizes, colors, stock)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [p.name, p.category, p.description, p.price, p.image_url, p.rating, p.sizes, p.colors, p.stock]
        );
      }
      console.log(`Successfully seeded ${products.length} products!`);
    } else {
      console.log(`Database already has ${count} products. Skipping seeding.`);
    }

    console.log('Database initialization complete!');
  } catch (err) {
    console.error('Error during database initialization:', err);
    throw err;
  } finally {
    client.release();
  }
}

// Allow running this file directly
if (process.argv[1] && process.argv[1].endsWith('init-db.js')) {
  initializeDatabase()
    .then(() => {
      console.log('Script run succeeded.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Script run failed:', err);
      process.exit(1);
    });
}
