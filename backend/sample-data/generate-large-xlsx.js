const XLSX = require('xlsx');
const { v4: uuidv4 } = require('uuid');

// Configuration
const NUM_PRODUCTS = 10000; // Generate 10,000 products for stress testing

// Product name templates
const adjectives = [
  'Premium', 'Professional', 'Advanced', 'Ultimate', 'Deluxe', 'Standard', 'Basic',
  'Pro', 'Elite', 'Superior', 'Enhanced', 'Modern', 'Classic', 'Digital', 'Smart',
  'Wireless', 'Portable', 'Compact', 'Heavy-Duty', 'Industrial', 'Commercial'
];

const productTypes = [
  'Laptop', 'Phone', 'Tablet', 'Monitor', 'Keyboard', 'Mouse', 'Headphones',
  'Speaker', 'Camera', 'Printer', 'Scanner', 'Router', 'Switch', 'Charger',
  'Cable', 'Adapter', 'Webcam', 'Microphone', 'Controller', 'Console'
];

const brands = [
  'TechPro', 'DigiCorp', 'SmartTech', 'ElectroMax', 'GadgetHub', 'TechVision',
  'DigitalWave', 'ProElectronics', 'MegaTech', 'UltraGadget', 'InnovateTech'
];

// Generate random product name
function generateProductName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const type = productTypes[Math.floor(Math.random() * productTypes.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = Math.floor(Math.random() * 9000) + 1000;

  return `${brand} ${adjective} ${type} ${model}`;
}

// Generate random price between 10 and 5000
function generatePrice() {
  const price = (Math.random() * 4990 + 10).toFixed(2);
  return parseFloat(price);
}

// Generate products data
const products = [];
for (let i = 1; i <= NUM_PRODUCTS; i++) {
  products.push({
    name: generateProductName(),
    price: generatePrice(),
    category_id: 1, // Using category ID 1 (Electronics)
    image: '' // Empty image field
  });

  // Progress indicator
  if (i % 1000 === 0) {
    process.stdout.write(`\r⏳ Progress: ${i.toLocaleString()} / ${NUM_PRODUCTS.toLocaleString()} products generated`);
  }
}

console.log(`\n✅ Generated ${NUM_PRODUCTS.toLocaleString()} products!\n`);

// Create worksheet
const worksheet = XLSX.utils.json_to_sheet(products);

// Create workbook
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

// Write to file
const filename = `products-bulk-${NUM_PRODUCTS}.xlsx`;
XLSX.writeFile(workbook, filename);

console.log(`📄 File created: ${filename}`);
console.log(`📦 File size: ${(require('fs').statSync(filename).size / 1024 / 1024).toFixed(2)} MB`);
console.log('');
console.log('🎯 How to test:');
console.log('   1. Make sure backend is running (npm run dev)');
console.log('   2. Make sure category with ID 1 exists (run npm run db:seed)');
console.log('   3. Use Postman or frontend to upload this file');
console.log('   4. Check that all products are imported without timeout!');
console.log('');
console.log('✅ Ready for bulk upload testing! 🚀');
