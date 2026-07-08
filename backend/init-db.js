import { pool } from './db.js';

const products = [
  // ORIGINAL 10 PRODUCTS
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
  },

  // 10 NEW MEN'S ITEMS
  {
    name: "1960s Ivy League Cardigan",
    category: "men",
    description: "An authentic collegiate classic, knit from ultra-soft lambswool. Features contrasting button borders, dual front pockets, and tortoiseshell button closures. Timeless Ivy style.",
    price: 135.00,
    image_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    sizes: "S,M,L,XL",
    colors: "Burgundy/Cream,Navy/White,Mustard",
    stock: 18
  },
  {
    name: "Selvedge Denim Worker Jacket",
    category: "men",
    description: "Constructed from heavy 14oz Japanese raw selvedge denim. This rugged workwear utility jacket boasts reinforced triple-stitched seams, multi-point utility pockets, and copper buttons that develop beautiful character over time.",
    price: 165.00,
    image_url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "M,L,XL,XXL",
    colors: "Indigo Blue,Midnight Charcoal",
    stock: 12
  },
  {
    name: "Vintage Suede Sherpa Coat",
    category: "men",
    description: "Luxuriously thick split-suede leather coat lined with premium plush sherpa fleece. Engineered with adjustable tab cuffs, a heavy-duty zipper and storm flap, and deep fleece-lined handwarmer pockets.",
    price: 295.00,
    image_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    sizes: "S,M,L,XL,XXL",
    colors: "Saddle Tan,Espresso Brown",
    stock: 10
  },
  {
    name: "Retro Fine-Knit Polo Shirt",
    category: "men",
    description: "Classic 1970s style knit polo shirt crafted in organic cotton. This shirt presents a beautiful knit point collar, tailored ribbed cuffs, and contrasting vintage stripes across the chest.",
    price: 79.00,
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    sizes: "S,M,L,XL",
    colors: "Amber Gold,Olive Green,Navy Blue",
    stock: 25
  },
  {
    name: "Chambray Utility Work Shirt",
    category: "men",
    description: "Woven on traditional shuttle looms using fine indigo-dyed cotton yarn. Features dual button-through chest pockets, a classic pen-slot pocket, and contrasting white stitching.",
    price: 85.00,
    image_url: "https://images.unsplash.com/photo-1620012253295-c05518e993be?w=600&auto=format&fit=crop&q=80",
    rating: 4.3,
    sizes: "M,L,XL,XXL",
    colors: "Chambray Indigo,Light Gray",
    stock: 30
  },
  {
    name: "Heritage Tweed Tailored Trousers",
    category: "men",
    description: "Crafted in beautifully textured wool-tweed fabric. Featuring a modern slim-straight silhouette, partial satin inner-lining for comfort, secure button-through welt back pockets, and belt loops.",
    price: 145.00,
    image_url: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    sizes: "30,32,34,36,38",
    colors: "Dark Gray Herringbone,Taupe Twist",
    stock: 16
  },
  {
    name: "1950s Leather Varsity Jacket",
    category: "men",
    description: "An absolute retro standout. Made with custom thick wool-blend body panels and contrasted with genuine, ultra-soft full-grain cowhide leather sleeves. Classic striped ribbed cuffs, hem, and collar.",
    price: 260.00,
    image_url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "S,M,L,XL",
    colors: "Red/White,Hunter Green/Cream",
    stock: 8
  },
  {
    name: "Waxed Cotton Field Jacket",
    category: "men",
    description: "The ultimate rugged outdoor jacket. Constructed from highly durable, water-resistant waxed cotton sailcloth. Features a soft corduroy-lined collar, brass snap button storm flap, and four oversized utility pockets.",
    price: 220.00,
    image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    sizes: "M,L,XL,XXL",
    colors: "Forest Olive,Mustard Ochre",
    stock: 14
  },
  {
    name: "Aran Fisherman Wool Turtleneck",
    category: "men",
    description: "Authentic, high-weight knit sweater featuring traditional Aran cable and diamond patterns. Spun from 100% thick, insulating Highland wool to keep you warm in any weather.",
    price: 155.00,
    image_url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "S,M,L,XL",
    colors: "Natural Off-White,Stone Gray",
    stock: 20
  },
  {
    name: "British Waxed Hunting Vest",
    category: "men",
    description: "Perfect layer for transitional weather. Tailored in water-repellent waxed canvas, featuring a zippered front, side-loading game pockets, corduroy lining inside, and dual front cartridges utility pockets.",
    price: 110.00,
    image_url: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    sizes: "M,L,XL",
    colors: "Dark Khaki,Deep Navy",
    stock: 22
  },

  // 10 NEW WOMEN'S ITEMS
  {
    name: "1940s Crepe Floral Tea Dress",
    category: "women",
    description: "A gorgeous, authentic vintage silhouette tea dress crafted in fluid crepe fabric. Adorned with a delicate hand-drawn wild floral pattern, gentle puff sleeves, a sweetheart neckline, and a cinched tie back.",
    price: 149.00,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "XS,S,M,L,XL",
    colors: "Sage Green,Dusty Rose,Black Floral",
    stock: 14
  },
  {
    name: "Victorian Lace High-Neck Blouse",
    category: "women",
    description: "An elegant, romantic blouse made from semi-sheer organic cotton. Features intricate floral lace inserts along the collar and chest, a sophisticated high buttoned neck, and ruffled cuffs.",
    price: 75.00,
    image_url: "https://images.unsplash.com/photo-1534126511673-b6899657816a?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    sizes: "XS,S,M,L",
    colors: "Antique Ivory,Soft Black",
    stock: 18
  },
  {
    name: "High-Waisted Sailor Denim Jeans",
    category: "women",
    description: "Vintage 1970s marine inspired denim jeans. High-rise waist with a classic double-breasted patch button front, a flattering wide-leg drape, and deep rectangular front pockets.",
    price: 110.00,
    image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    sizes: "24,26,28,30,32",
    colors: "Classic Indigo,Stone Washed Blue",
    stock: 20
  },
  {
    name: "Retro Suede A-Line Button Skirt",
    category: "women",
    description: "Structured A-line skirt tailored from genuine premium goat suede leather. Features a full snap-button front closure, a flattering high-waist band, and beautiful seam stitch paneling.",
    price: 139.00,
    image_url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "XS,S,M,L",
    colors: "Cognac Tan,Chestnut Brown,Charcoal",
    stock: 12
  },
  {
    name: "1960s Houndstooth Shift Dress",
    category: "women",
    description: "Channeling mid-century mod style. A beautifully structured shift dress woven in a classic houndstooth wool blend. Features a retro stand-up mock neckline and double front patch pockets.",
    price: 125.00,
    image_url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    sizes: "XS,S,M,L,XL",
    colors: "Black/White,Brown/Beige",
    stock: 15
  },
  {
    name: "Cashmere Silk Drape Cardigan",
    category: "women",
    description: "An incredibly luxurious open-front cardigan knitted with a premium 70% cashmere and 30% mulberry silk blend. Features a fluid, cascading drape, ribbed cuffs, and an ultra-soft lightweight feel.",
    price: 195.00,
    image_url: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    sizes: "S,M,L,XL",
    colors: "Soft Oatmeal,Pearl Gray,Midnight Black",
    stock: 10
  },
  {
    name: "Bohemian Embroidered Peasant Blouse",
    category: "women",
    description: "A breezy, vintage-style peasant blouse crafted from lightweight cotton-voile. Decorated with extensive, vibrant floral embroidery along the yoke, balloon sleeves, and tied tassels.",
    price: 69.50,
    image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    sizes: "XS,S,M,L,XL",
    colors: "Cloud White/Blue,Black/Gold",
    stock: 24
  },
  {
    name: "Vintage Satin Evening Gown",
    category: "women",
    description: "Pure glamour. Woven in liquid-like heavy satin that drapes and shines beautifully. Features an elegant cowl neck, cross-back adjustable spaghetti straps, and a sweeping floor-length hem.",
    price: 240.00,
    image_url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    sizes: "XS,S,M,L",
    colors: "Emerald Green,Champagne Gold,Classic Crimson",
    stock: 6
  },
  {
    name: "Flannel Plaid Heritage Dress",
    category: "women",
    description: "A cozy and classic shirt dress constructed from thick, double-brushed cotton flannel. Features a full button-through front, matching fabric tie-belt, buttoned sleeves, and a classic curved shirttail hem.",
    price: 98.00,
    image_url: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    sizes: "S,M,L,XL",
    colors: "Red Tartan,Forest Green Plaid",
    stock: 16
  },
  {
    name: "Herringbone Chesterfield Coat",
    category: "women",
    description: "A structured, full-length double-breasted overcoat tailored from heavy, warming herringbone wool. Designed with custom wide notched velvet collars, deep patch pockets, and premium interior satin lining.",
    price: 289.00,
    image_url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "XS,S,M,L,XL",
    colors: "Charcoal Herringbone,Brown Melange",
    stock: 9
  },

  // 10 NEW ACCESSORIES ITEMS
  {
    name: "1920s Brass Pocket Watch",
    category: "accessories",
    description: "A mechanical masterpiece. Features an antique-finished solid brass casing, highly detailed engraved scrollwork on the cover, a classic roman numeral dial, and a matching 12-inch fob chain.",
    price: 120.00,
    image_url: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    sizes: "One Size",
    colors: "Antique Gold,Gunmetal",
    stock: 15
  },
  {
    name: "Vintage Silk Pocket Square Set",
    category: "accessories",
    description: "A three-pack of premium pocket squares woven from pure 16mm Mulberry silk. Detailed with rolled edges, paisley, and geometric patterns to add classic elegance to any blazer pocket.",
    price: 45.00,
    image_url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    sizes: "30cm x 30cm",
    colors: "Classic Pack,Vintage Pack",
    stock: 40
  },
  {
    name: "Distressed Leather Engineer Boots",
    category: "accessories",
    description: "Rugged boots built to last. Crafted from thick full-grain oil-tanned steerhide leather, featuring heavy-duty brass adjustable buckles, steel shanks, and Goodyear welt construction.",
    price: 210.00,
    image_url: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "8,9,10,11,12",
    colors: "Distressed Black,Rustic Brown",
    stock: 14
  },
  {
    name: "Classic Fedora Wool Felt Hat",
    category: "accessories",
    description: "A sophisticated accessory structured from 100% premium wool felt. Styled with a classic teardrop crown crease, a wide bound-edge brim, and a matching grosgrain ribbon hat band.",
    price: 85.00,
    image_url: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    sizes: "S,M,L",
    colors: "Midnight Charcoal,Saddle Brown",
    stock: 18
  },
  {
    name: "Suede Fringe Crossbody Bag",
    category: "accessories",
    description: "Channeling retro bohemian 1970s styles. Crafted from genuine split-suede leather, styled with beautiful layered swinging fringe details, custom brass hardware, and adjustable strap.",
    price: 115.00,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "One Size",
    colors: "Caramel Suede,Olive Suede",
    stock: 12
  },
  {
    name: "Art Deco Onyx Silver Ring",
    category: "accessories",
    description: "A heavy, solid 925 sterling silver ring. Presents a large, polished geometric black onyx gemstone centerpiece surrounded by classic Art Deco engraved stair-step shoulders.",
    price: 89.00,
    image_url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    sizes: "8,9,10,11,12",
    colors: "Sterling Silver",
    stock: 22
  },
  {
    name: "Vintage Tortoiseshell Glasses",
    category: "accessories",
    description: "Originally popular in the 1950s, these prescription-ready optical glasses are structured with premium acetate frames in a rich, warm tortoiseshell patterns and keyhole bridge detail.",
    price: 79.00,
    image_url: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    sizes: "Standard",
    colors: "Amber Tortoise,Dark Havana",
    stock: 28
  },
  {
    name: "Distressed Leather Pilot Cap",
    category: "accessories",
    description: "An exceptional, authentic replica aviator cap. Made from distressed grain leather and fully lined with ultra-insulating, soft sheepskin wool. Includes buckle-down chin straps and earflaps.",
    price: 95.00,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    rating: 4.3,
    sizes: "M,L",
    colors: "Vintage Mahogany,Coal Black",
    stock: 10
  },
  {
    name: "Handwoven Alpaca Wool Scarf",
    category: "accessories",
    description: "Woven in the Peruvian Andes using 100% fine Baby Alpaca wool fibers. Naturally thermal, water-resistant, hypoallergenic, and detailed with elegant fringed edges for cozy luxury.",
    price: 65.00,
    image_url: "https://images.unsplash.com/photo-1520903781411-76fa5c8be90e?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "180cm x 35cm",
    colors: "Oatmeal Melange,Charcoal Twist,Deep Teal",
    stock: 32
  },
  {
    name: "1950s Gold Mesh Evening Clutch",
    category: "accessories",
    description: "An elegant evening bag structured from liquid metal gold-plated mesh scales. Features a secure clasp closure adorned with a small glass gemstone, and a tuck-away brass chain link strap.",
    price: 110.00,
    image_url: "https://images.unsplash.com/photo-1566150905458-1bf1fc15aae9?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "One Size",
    colors: "Bright Gold,Liquid Silver",
    stock: 15
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

    // 4. Robust upsert-style seeding of products list
    console.log('Checking and seeding dummy clothing data...');
    let addedCount = 0;
    for (const p of products) {
      const checkRes = await client.query('SELECT id FROM products WHERE name = $1', [p.name]);
      if (checkRes.rows.length === 0) {
        await client.query(
          `INSERT INTO products (name, category, description, price, image_url, rating, sizes, colors, stock)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [p.name, p.category, p.description, p.price, p.image_url, p.rating, p.sizes, p.colors, p.stock]
        );
        addedCount++;
      }
    }
    
    if (addedCount > 0) {
      console.log(`Successfully seeded ${addedCount} new products!`);
    } else {
      console.log('All catalog products already exist in database.');
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
