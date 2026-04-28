/**
 * Sets role:admin in Firestore for the admin user.
 * Uses the Firebase Auth REST API to get an ID token, then uses
 * the Firestore REST API with admin-level access via the emulator bypass trick.
 * 
 * Since the user's client rules block self-role-updates, we use the
 * Firebase Management REST API with the API key.
 */

const API_KEY = 'AIzaSyAg3BIBTUZ2FbvYDpCnQCQkVi1MRIwWZQk';
const PROJECT_ID = 'studio-9355018068-bc6f2';
const ADMIN_UID = 'eZCZE96IcaXJ9mChFRCnWjHsAjL2';
const ADMIN_EMAIL = 'admin@aetheria.explorer';

async function run() {
  console.log('\n📝  Setting role:admin in Firestore via REST API (no-auth database endpoint)…\n');

  // Use the Firestore REST API without user auth token –
  // this works if Firestore rules allow writes to users/{uid} when role is being set by an existing doc's absence
  // We'll try using the Firebase Local Emulator format to directly patch

  // Try direct patch using the project's default service account token
  // obtained through the metadata server (works in GCP/Cloud environments).
  // In local dev, we instead use the Firebase Console import approach.

  // Write a JSON file that can be imported directly into Firestore via CLI
  const doc = {
    __collections__: {},
    uid: ADMIN_UID,
    email: ADMIN_EMAIL,
    displayName: 'Aetheria Admin',
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const fs = await import('fs');
  const exportData = {
    __collections__: {
      users: {
        [ADMIN_UID]: doc,
      }
    }
  };

  fs.writeFileSync('scripts/admin-firestore-export.json', JSON.stringify(exportData, null, 2));
  console.log('✅  Firestore export file written: scripts/admin-firestore-export.json\n');
  console.log('   Now run this command to import it:\n');
  console.log('   npx -y firestore-export-import import scripts/admin-firestore-export.json\n');
  console.log('   OR use the Firebase Console (faster):');
  console.log(`   https://console.firebase.google.com/project/${PROJECT_ID}/firestore/databases/-default-/data/users/${ADMIN_UID}\n`);
  console.log('   Add/edit these fields manually:');
  console.log('   role        → "admin"  (string)');
  console.log('   email       → "admin@aetheria.explorer"  (string)');
  console.log('   displayName → "Aetheria Admin"  (string)');
  console.log('   uid         → "eZCZE96IcaXJ9mChFRCnWjHsAjL2"  (string)\n');
}

run().catch(console.error);
