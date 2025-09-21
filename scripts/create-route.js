#!/usr/bin/env node

/**
 * Simple script to create new routes following the file-system structure
 * Usage: node scripts/create-route.js <route-path> [--page] [--layout]
 * 
 * Examples:
 * node scripts/create-route.js users/profile --page
 * node scripts/create-route.js admin --layout
 * node scripts/create-route.js products/[id] --page
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const routePath = args[0];
const hasPage = args.includes('--page');
const hasLayout = args.includes('--layout');

if (!routePath) {
  console.error('Please provide a route path');
  console.log('Usage: node scripts/create-route.js <route-path> [--page] [--layout]');
  process.exit(1);
}

const srcDir = path.join(__dirname, '..', 'src', 'app', '(app)');
const routeDir = path.join(srcDir, routePath);

// Create directory structure
fs.mkdirSync(routeDir, { recursive: true });

// Create page.jsx if requested
if (hasPage) {
  const pageContent = `import { useParams } from 'react-router-dom';

export default function ${routePath.split('/').pop().replace(/[^a-zA-Z0-9]/g, '')}Page() {
  const params = useParams();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">${routePath.split('/').pop().replace(/[^a-zA-Z0-9]/g, ' ')}</h1>
      <p className="text-gray-600">Route: /${routePath}</p>
      {Object.keys(params).length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Parameters:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(params, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}`;

  fs.writeFileSync(path.join(routeDir, 'page.jsx'), pageContent);
  console.log(`✅ Created page.jsx at ${routePath}/page.jsx`);
}

// Create layout.jsx if requested
if (hasLayout) {
  const layoutContent = `import { Outlet } from 'react-router-dom';

export default function ${routePath.split('/').pop().replace(/[^a-zA-Z0-9]/g, '')}Layout() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">${routePath.split('/').pop().replace(/[^a-zA-Z0-9]/g, ' ')} Layout</h1>
      <Outlet />
    </div>
  );
}`;

  fs.writeFileSync(path.join(routeDir, 'layout.jsx'), layoutContent);
  console.log(`✅ Created layout.jsx at ${routePath}/layout.jsx`);
}

console.log(`✅ Created route directory: ${routePath}`);
console.log('📝 Remember to update src/router.jsx to include the new route!');
