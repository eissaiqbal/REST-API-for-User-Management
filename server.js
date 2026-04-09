const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log('\n' + '='.repeat(60));
  console.log('REST API for User Management');
  console.log('='.repeat(60));
  console.log(` Server running on: http://localhost:${PORT}`);
  console.log(` Network access: http://0.0.0.0:${PORT}`);
  console.log(` API Docs: http://localhost:${PORT}/api/docs`);
  console.log(` Health Check: http://localhost:${PORT}/health`);
  console.log('='.repeat(60));
  console.log(' Frontend: http://localhost:' + PORT);
  console.log(' Press Ctrl+C to stop the server\n');
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n ERROR: Port ${PORT} is already in use!`);
    console.error('\n🔧 Solutions:');
    console.error(`   1. Kill process on port ${PORT}:`);
    console.error(`      - Mac/Linux: lsof -i :${PORT} | grep LISTEN | awk '{print $2}' | xargs kill -9`);
    console.error(`      - Windows: netstat -ano | findstr :${PORT}`);
    console.error(`   2. Use different port: PORT=3000 npm run dev`);
    console.error(`   3. Wait a few seconds and try again\n`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n📴 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n📴 SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});