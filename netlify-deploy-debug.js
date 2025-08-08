#!/usr/bin/env node

// Debug script to check environment variables during Netlify build
console.log('🔍 Netlify Build Environment Debug:');
console.log('================================');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VITE_ENABLE_ADMIN:', process.env.VITE_ENABLE_ADMIN);
console.log('All VITE_ variables:');

Object.keys(process.env)
  .filter(key => key.startsWith('VITE_'))
  .forEach(key => {
    console.log(`  ${key}:`, process.env[key]);
  });

console.log('================================');

// Exit successfully
process.exit(0);