/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  // In production, serve the webpacked server file
  require('./build/server.bundle.js');
} else {
  require('./server/server.ts');
}
