import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, testConnection } from './db.js';
import { initializeDatabase } from './init-db.js';

const app = express();
const port = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS and parsing of JSON payloads
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  const dbOk = await testConnection();
  res.status(dbOk ? 200 : 500).json({
    status: dbOk ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    database: dbOk ? 'connected' : 'disconnected'
  });
});

// GET /api/products - Get all products with optional filters
app.get('/api/products', async (req, res) => {
  const { category, q } = req.query;
  try {
    let queryText = 'SELECT * FROM products';
    const params = [];

    const conditions = [];
    if (category && category !== 'all') {
      params.push(category.toLowerCase());
      conditions.push(`category = $${params.length}`);
    }

    if (q) {
      params.push(`%${q.toLowerCase()}%`);
      conditions.push(`(LOWER(name) LIKE $${params.length} OR LOWER(description) LIKE $${params.length})`);
    }

    if (conditions.length > 0) {
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    // Always order by id to have a deterministic order
    queryText += ' ORDER BY id ASC';

    const result = await pool.query(queryText, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// GET /api/products/:id - Get product details
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err);
    res.status(500).json({ error: 'Failed to retrieve product details' });
  }
});

// POST /api/orders - Submit order and update stock
app.post('/api/orders', async (req, res) => {
  const { customerName, customerEmail, shippingAddress, items, totalAmount } = req.body;

  if (!customerName || !customerEmail || !shippingAddress || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required order fields' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Create order
    const orderRes = await client.query(
      `INSERT INTO orders (customer_name, customer_email, shipping_address, total_amount)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [customerName, customerEmail, shippingAddress, totalAmount]
    );
    const orderId = orderRes.rows[0].id;

    // 2. Insert items and update stock
    for (const item of items) {
      // Fetch product to verify stock and price
      const productRes = await client.query('SELECT price, stock FROM products WHERE id = $1 FOR UPDATE', [item.productId]);
      if (productRes.rows.length === 0) {
        throw new Error(`Product ID ${item.productId} not found`);
      }

      const product = productRes.rows[0];
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.productId}. Available: ${product.stock}, Requested: ${item.quantity}`);
      }

      // Insert order item
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price, size, color)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [orderId, item.productId, item.quantity, product.price, item.size, item.color]
      );

      // Decrement product stock
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.productId]
      );
    }

    await client.query('COMMIT');
    console.log(`Order ${orderId} successfully created for ${customerName}`);
    res.status(201).json({
      success: true,
      orderId,
      message: 'Order processed successfully',
      receipt: {
        customerName,
        customerEmail,
        totalAmount,
        orderId
      }
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error placing order, transaction rolled back:', err);
    res.status(400).json({ error: err.message || 'Failed to place order' });
  } finally {
    client.release();
  }
});

// Serve frontend static files in production
const frontendBuildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendBuildPath));

// For SPA routes, fallback to index.html
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Initialize DB and start server
async function startServer() {
  try {
    // Wait for DB to be initialized first
    await initializeDatabase();
    
    app.listen(port, () => {
      console.log(`==================================================`);
      console.log(` VintageFashion Server running on port ${port}`);
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`==================================================`);
    });
  } catch (err) {
    console.error('Fatal error starting server, database initialization failed:', err);
    process.exit(1);
  }
}

startServer();
