#!/usr/bin/env node

/**
 * Encryption Key Generator
 * 
 * Run this script to generate secure encryption keys for SkillSync.
 * 
 * Usage:
 *   node scripts/generate-keys.js
 */

const crypto = require('crypto');

console.log('\n🔐 SkillSync Encryption Key Generator\n');
console.log('='.repeat(60));

// Generate primary encryption key
const encryptionKey = crypto.randomBytes(32).toString('hex');
console.log('\n✅ ENCRYPTION_KEY (for general encryption):');
console.log(encryptionKey);

// Generate deterministic encryption key
const deterministicKey = crypto.randomBytes(32).toString('hex');
console.log('\n✅ DETERMINISTIC_KEY (for searchable encryption):');
console.log(deterministicKey);

console.log('\n' + '='.repeat(60));
console.log('\n📝 Next Steps:');
console.log('1. Copy these keys to your .env.local file');
console.log('2. NEVER commit .env.local to version control');
console.log('3. Use different keys for each environment');
console.log('4. Store keys securely (password manager, secrets vault)');

console.log('\n📄 Example .env.local:');
console.log('-'.repeat(60));
console.log(`ENCRYPTION_KEY=${encryptionKey}`);
console.log(`DETERMINISTIC_KEY=${deterministicKey}`);
console.log('-'.repeat(60));

console.log('\n⚠️  Security Reminders:');
console.log('• Keep these keys secret and secure');
console.log('• Rotate keys regularly (every 90 days recommended)');
console.log('• Use AWS KMS or similar in production');
console.log('• Never share keys via email or chat');

console.log('\n✅ Keys generated successfully!\n');
