import { db, initDb } from './db.mjs';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Esecuzione verifica build di Lumina...');

// 1. Database & seed check
initDb();
const categoriesCount = db.prepare('SELECT count(*) as count FROM categories').get().count;
const coursesCount = db.prepare('SELECT count(*) as count FROM courses').get().count;
const lessonsCount = db.prepare('SELECT count(*) as count FROM lessons').get().count;
const quizCount = db.prepare('SELECT count(*) as count FROM quiz_questions').get().count;

if (categoriesCount < 6 || lessonsCount < 3 || quizCount < 5) {
  console.error(`❌ Verifica DB fallita: categorie=${categoriesCount}, lezioni=${lessonsCount}, quiz=${quizCount}`);
  process.exit(1);
}
console.log(`✅ Database integro: ${categoriesCount} categorie, ${coursesCount} percorsi, ${lessonsCount} lezioni, ${quizCount} domande quiz.`);

// 2. Static files check
const requiredFiles = [
  '../public/index.html',
  '../public/css/tokens.css',
  '../public/css/style.css',
  '../public/js/app.js',
  '../public/manifest.json',
  '../public/sw.js',
  '../replica/schema.sql',
  '../replica/design/tokens.json'
];

for (const rel of requiredFiles) {
  const p = join(__dirname, rel);
  if (!existsSync(p)) {
    console.error(`❌ File richiesto mancante: ${rel}`);
    process.exit(1);
  }
}
console.log(`✅ Tutti i file dell'applicazione sono presenti e verificati.`);
console.log(`🎉 Build check completato con successo: Lumina è pronta per l'avvio!`);
