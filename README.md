# 🧥 VintageFashion

VintageFashion is a premium, professionally-tailored e-commerce platform for vintage clothing enthusiasts. This application features a robust **React.js** frontend with custom typography, transition motion, and modern layouts, coupled with a fast **Express.js (Node.js)** backend, backed by a **Google Cloud SQL PostgreSQL** relational database, and deployed globally via **Google Cloud Run**.

---

## 🌐 Live Production Link

The application is deployed and fully active at:  
👉 **[https://vintage-fashion-446449044316.us-central1.run.app](https://vintage-fashion-446449044316.us-central1.run.app)**

---

## 🚀 Features

-   **Curated Vintage Aesthetics**: Warm champagne gold accents, charcoal tones, elegant serif typography pairings, and micro-animations.
-   **Stateful Category Filter**: Live navigation filtering for Men, Women, Accessories, or the entire curated catalog.
-   **Instant Product Search**: Fluid client-side queries analyzing garment names and descriptions instantly.
-   **Heirloom Details Modal**: Dynamic presentation drawers presenting fabric descriptions, rating scales, stock quantities, sizing pills, and color dot previewers.
-   **Shopping Bag Drawer**: Fully integrated shopping bag managing items, updating purchase quantities, and calculating checkout subtotals.
-   **Secure Form Transaction**: Interactive checkout collecting user billing/shipping information, validating parameters, decreasing product stock, and saving receipts.
-   **Cloud SQL Integration**: Relational tables (`products`, `orders`, `order_items`) that automatically verify and seed 10 premium garments on backend server boots.

---

## ⚙️ Technical Stack

-   **Frontend**: React.js 19, Vite, Lucide-React, custom Vanilla CSS.
-   **Backend**: Express.js (Node.js), PG Connection Pool.
-   **Database**: GCP Cloud SQL (PostgreSQL 15).
-   **Containerization**: Docker, Google Artifact Registry.
-   **Production Hosting**: Google Cloud Run.

---

## 💻 Running Locally

### 1. Database Setup
Set up a local PostgreSQL instance and create a database named `postgres` (or customize the name).

### 2. Configure Environment Parameters
Create a `.env` file in the root directory:
```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourlocalpassword
DB_NAME=postgres
PORT=8080
```

### 3. Installation & Local Execution
From the project root:
```bash
# Install root and frontend dependencies
npm install

# Compile the frontend assets into backend distribution folder
npm run build

# Start the server (which initializes and seeds tables)
npm start
```
Open **`http://localhost:8080`** in your browser to view the application locally.

---

## 🛠️ Deploying to GCP Cloud Run

Redeploy the application to Cloud Run with automatic Cloud SQL proxy bindings by running the following command from the root directory:

```bash
gcloud run deploy vintage-fashion \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars INSTANCE_CONNECTION_NAME=inspiring-folio-460016-u4:us-central1:vintage-fashion-db,DB_USER=postgres,DB_PASS=vintagesecretpass,DB_NAME=postgres,NODE_ENV=production \
  --add-cloudsql-instances inspiring-folio-460016-u4:us-central1:vintage-fashion-db
```
