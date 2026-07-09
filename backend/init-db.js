import { pool } from './db.js';

const products = [
  // ORIGINAL 10 PRODUCTS (AUDITED & CORRECTED)
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
    name: "Gabriela Classic Tan Bomber Jacket",
    category: "women",
    description: "A sleek and lightweight tan bomber jacket tailored for modern wear. Features a classic ribbed knit collar, full-front zipper closure, utility sleeve pockets, and comfortable handwarmer pockets. Designed to blend clean minimalist lines with everyday comfort.",
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
    image_url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "XS,S,M,L",
    colors: "Royal Burgundy,Midnight Emerald",
    stock: 8
  },
  {
    name: "Chevron Quilted Leather Handbag",
    category: "accessories",
    description: "Exquisite chevron-quilted black leather handbag with a luxurious padded texture. Accented with elegant gold-toned chain shoulder straps and a classic interlocking clasp closure. A premium accessory to elevate any semi-formal or evening outfit.",
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
    image_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80",
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
    name: "Editorial Burgundy Winter Coat",
    category: "women",
    description: "An exceptionally luxurious outerwear statement piece. Crafted from a thick, heavy-weight wool and cashmere blend in a deep, rich burgundy wine hue. Boasts high-set stand-up lapels, a tailored silhouette, and a warm, elegant beige turtleneck under-layer. Designed for unparalleled cold-weather sophistication.",
    price: 65.00,
    image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "XS,S,M,L,XL",
    colors: "Deep Burgundy",
    stock: 35
  },

  // 10 NEW MEN'S ITEMS (AUDITED & CORRECTED)
  {
    name: "1960s Ivy League Cardigan",
    category: "men",
    description: "An authentic collegiate classic, knit from ultra-soft lambswool. Features contrasting button borders, dual front pockets, and tortoiseshell button closures. Timeless Ivy style.",
    price: 135.00,
    image_url: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    sizes: "S,M,L,XL",
    colors: "Burgundy/Cream,Navy/White,Mustard",
    stock: 18
  },
  {
    name: "Selvedge Indigo Denim Jeans",
    category: "men",
    description: "Woven on traditional shuttle looms from premium raw Japanese selvedge denim. These high-waisted jeans feature a classic straight-leg cut, durable double-stitch construction, and a clean copper-riveted design. A rugged heritage piece that forms beautiful custom character.",
    price: 165.00,
    image_url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "M,L,XL,XXL",
    colors: "Indigo Blue,Midnight Charcoal",
    stock: 12
  },
  {
    name: "Terracotta Cotton Overshirt",
    category: "men",
    description: "Expertly tailored from premium, mid-weight brushed organic cotton canvas. This versatile overshirt features a rich terracotta/rust shade, a relaxed buttoned front, clean flat chest pockets, and a soft structured collar. Wear it open over a white tee for a refined, modern casual style.",
    price: 295.00,
    image_url: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    sizes: "S,M,L,XL,XXL",
    colors: "Terracotta,Rust,Oatmeal",
    stock: 10
  },
  {
    name: "Retro Orange Crewneck Sweatshirt",
    category: "men",
    description: "Spun from premium, ultra-soft organic cotton loopback fleece. This vintage-inspired crewneck sweatshirt presents a vibrant amber-orange shade, a classic relaxed fit, and cozy ribbed cuffs and hem. A standout layering piece for effortless weekend style.",
    price: 79.00,
    image_url: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    sizes: "30,32,34,36,38",
    colors: "Dark Gray Herringbone,Taupe Twist",
    stock: 16
  },
  {
    name: "Classic Plaid Flannel Work Shirt",
    category: "men",
    description: "A classic heavy-duty flannel button-up shirt featuring a rugged grey, black, and white plaid pattern. Crafted from thick, double-brushed cotton flannel with dual buttoned chest pockets and comfortable button cuffs. A durable workwear-inspired wardrobe staple.",
    price: 260.00,
    image_url: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    sizes: "M,L,XL,XXL",
    colors: "Forest Olive,Mustard Ochre",
    stock: 14
  },
  {
    name: "Classic Black Graphic T-Shirt",
    category: "men",
    description: "Cut from ultra-soft, premium heavyweight organic cotton. This classic black short-sleeve crewneck t-shirt features a striking, clean white graphic print on the chest. Designed with a structured ribbed collar and a comfortable relaxed drape.",
    price: 155.00,
    image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    sizes: "S,M,L,XL",
    colors: "Natural Off-White,Stone Gray",
    stock: 20
  },
  {
    name: "British Tweed Layering Blazer ensemble",
    category: "men",
    description: "The ultimate in dapper countryside layering. This premium item represents a dapper layered ensemble featuring a rugged wool-tweed blazer jacket styled over a dark, high-collar zip-up utility vest and a classic denim shirt. Includes a matching pocket square and leather strap accents.",
    price: 110.00,
    image_url: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    sizes: "M,L,XL",
    colors: "Brown Tweed & Olive Vest",
    stock: 22
  },

  // 10 NEW WOMEN'S ITEMS (AUDITED & CORRECTED)
  {
    name: "Sunny Crop Hoodie & Sweatpants Set",
    category: "women",
    description: "Spun from ultra-soft cotton-blend fleece for supreme cozy comfort. This vibrant sunny yellow matching lounge set includes a stylish cropped drawstring hoodie and relaxed-fit jogger sweatpants. Ideal for cozy days in or casual urban activewear.",
    price: 149.00,
    image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "XS,S,M,L,XL",
    colors: "Sage Green,Dusty Rose,Black Floral",
    stock: 14
  },
  {
    name: "Midnight Noir Tailored Trench Coat",
    category: "women",
    description: "An exceptionally tailored, double-breasted trench coat in deep midnight black. Boasts structured notch lapels, sharp shoulder silhouettes, deep welt pockets, and custom tonal buttons. A premium layering coat that offers sharp elegance and wind-resistant protection.",
    price: 75.00,
    image_url: "https://images.unsplash.com/photo-1583391265517-35bbdad01209?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    sizes: "24,26,28,30,32",
    colors: "Classic Indigo,Stone Washed Blue",
    stock: 20
  },
  {
    name: "Silver Sequined One-Shoulder Dress",
    category: "women",
    description: "Capture absolute nighttime glamour. This showstopping one-shoulder cocktail dress is adorned with thousands of shimmering silver sequins that catch the light beautifully. Designed with a sleek, body-hugging silhouette and premium stretch lining.",
    price: 139.00,
    image_url: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    sizes: "S,M,L,XL",
    colors: "Soft Oatmeal,Pearl Gray,Midnight Black",
    stock: 10
  },
  {
    name: "Vintage Floral Grey Lace Blouse",
    category: "women",
    description: "An elegant, romantic semi-sheer blouse crafted with delicate floral lace inserts and fine mesh panelling. Styled with an exquisite high-neck collar, intricate floral overlay, and gracefully flared cuffs. A perfect vintage-inspired dressy top.",
    price: 69.50,
    image_url: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    sizes: "XS,S,M,L,XL",
    colors: "Cloud White/Blue,Black/Gold",
    stock: 24
  },
  {
    name: "Vintage Scarf & Pink Coat Set",
    category: "women",
    description: "An elegant, cold-weather outerwear pairing. Features a beautifully tailored winter overcoat in soft pastel pink, styled with wide lapels and clean tailored lines, paired with a gorgeous vintage-patterned wool-fleece scarf for luxurious, cozy layering.",
    price: 240.00,
    image_url: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    sizes: "XS,S,M,L",
    colors: "Emerald Green,Champagne Gold,Classic Crimson",
    stock: 6
  },
  {
    name: "Satin Camisole & Trench Set",
    category: "women",
    description: "A premium and highly-curated casual chic set. Features an ultra-soft white silk-satin camisole top paired with high-waisted, form-fitting light wash denim jeans, completed by an elegant, lightweight beige trench coat draped over the shoulder. Effortlessly luxurious.",
    price: 98.00,
    image_url: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    sizes: "S,M,L,XL",
    colors: "Satin White & Light Wash",
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

  // 10 NEW ACCESSORIES ITEMS (AUDITED & CORRECTED)
  {
    name: "1920s Brass Pocket Watch",
    category: "accessories",
    description: "A mechanical masterpiece. Features an antique-finished solid brass casing, highly detailed engraved scrollwork on the cover, a classic roman numeral dial, and a matching 12-inch fob chain.",
    price: 120.00,
    image_url: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1614179924047-e1bf49a0a0cf?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1575425186775-b8de9fa427e6?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?w=600&auto=format&fit=crop&q=80",
    rating: 4.3,
    sizes: "M,L",
    colors: "Vintage Mahogany,Coal Black",
    stock: 10
  },
  {
    name: "Handwoven Crochet Fringe Poncho",
    category: "accessories",
    description: "Woven with a gorgeous, lightweight open-knit texture from ultra-soft cotton-blend yarns. This stunning bohemian poncho features a classic V-neckline, cascading drape, and beautiful fringed hem detail. A versatile, cozy layering piece for any season.",
    price: 65.00,
    image_url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    sizes: "One Size",
    colors: "Off-White,Cream",
    stock: 32
  },
  {
    name: "1950s Gold Mesh Evening Clutch",
    category: "accessories",
    description: "An elegant evening bag structured from liquid metal gold-plated mesh scales. Features a secure clasp closure adorned with a small glass gemstone, and a tuck-away brass chain link strap.",
    price: 110.00,
    image_url: "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=600&auto=format&fit=crop&q=80",
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
 
    // 4. Clean up old renamed product names to prevent duplicates
    const oldNames = [
      "Gabriela Wool Blend Trench Coat",
      "Handstitched Leather Satchel",
      "Genevieve Pleated Silk Scarf",
      "Selvedge Denim Worker Jacket",
      "Vintage Suede Sherpa Coat",
      "Retro Fine-Knit Polo Shirt",
      "1950s Leather Varsity Jacket",
      "Aran Fisherman Wool Turtleneck",
      "British Waxed Hunting Vest",
      "1940s Crepe Floral Tea Dress",
      "Victorian Lace High-Neck Blouse",
      "Retro Suede A-Line Button Skirt",
      "Bohemian Embroidered Peasant Blouse",
      "Vintage Satin Evening Gown",
      "Flannel Plaid Heritage Dress",
      "Handwoven Alpaca Wool Scarf"
    ];
    await client.query('DELETE FROM order_items WHERE product_id IN (SELECT id FROM products WHERE name = ANY($1))', [oldNames]);
    await client.query('DELETE FROM products WHERE name = ANY($1)', [oldNames]);
    console.log('Old renamed products cleaned up from database.');

    // 5. Robust upsert-style seeding of products list
    console.log('Checking and seeding/updating dummy clothing data...');
    let addedCount = 0;
    let updatedCount = 0;
    for (const p of products) {
      const checkRes = await client.query('SELECT id FROM products WHERE name = $1', [p.name]);
      if (checkRes.rows.length === 0) {
        await client.query(
          `INSERT INTO products (name, category, description, price, image_url, rating, sizes, colors, stock)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [p.name, p.category, p.description, p.price, p.image_url, p.rating, p.sizes, p.colors, p.stock]
        );
        addedCount++;
      } else {
        // ALWAYS update details to fix any discrepancies or broken links!
        await client.query(
          `UPDATE products 
           SET description = $1, image_url = $2, price = $3, rating = $4, sizes = $5, colors = $6, stock = $7, category = $8
           WHERE name = $9`,
          [p.description, p.image_url, p.price, p.rating, p.sizes, p.colors, p.stock, p.category, p.name]
        );
        updatedCount++;
      }
    }
    console.log(`Database sync: ${addedCount} added, ${updatedCount} updated.`);

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
