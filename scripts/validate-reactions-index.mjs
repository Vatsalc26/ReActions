#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const indexPath = path.join(root, "reactions.json");

function fail(message) {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`✅ ${message}`);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseFrontmatter(content) {
  if (!content.startsWith("---")) return {};

  const end = content.indexOf("\n---", 3);
  if (end === -1) return {};

  const raw = content.slice(3, end).trim();
  const data = {};

  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) {
      data[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
    }
  }

  return data;
}

if (!fs.existsSync(indexPath)) {
  fail("Missing reactions.json");
  process.exit(1);
}

let index;

try {
  index = JSON.parse(readFile(indexPath));
  pass("reactions.json is valid JSON");
} catch (error) {
  fail(`reactions.json is invalid JSON: ${error.message}`);
  process.exit(1);
}

if (!Array.isArray(index.reactions)) {
  fail("reactions.json must contain a reactions array");
  process.exit(1);
}

const seenIds = new Set();
const seenTriggers = new Set();

for (const reaction of index.reactions) {
  const label = reaction.id || "(missing id)";

  if (!reaction.id) fail("Reaction is missing id");
  if (!reaction.name) fail(`${label} is missing name`);
  if (!reaction.trigger) fail(`${label} is missing trigger`);
  if (!reaction.path) fail(`${label} is missing path`);
  if (!reaction.category) fail(`${label} is missing category`);
  if (!reaction.subcategory) fail(`${label} is missing subcategory`);
  if (!reaction.summary) fail(`${label} is missing summary`);

  if (reaction.id && seenIds.has(reaction.id)) {
    fail(`Duplicate reaction id: ${reaction.id}`);
  }
  seenIds.add(reaction.id);

  if (reaction.trigger && seenTriggers.has(reaction.trigger)) {
    fail(`Duplicate reaction trigger: ${reaction.trigger}`);
  }
  seenTriggers.add(reaction.trigger);

  if (reaction.trigger && !reaction.trigger.startsWith("/ReAction-")) {
    fail(`${label} trigger must start with /ReAction-`);
  }

  if (reaction.path && !reaction.path.endsWith(".reaction.md")) {
    fail(`${label} path must end with .reaction.md`);
  }

  const fullPath = path.join(root, reaction.path || "");

  if (!fs.existsSync(fullPath)) {
    fail(`${label} path does not exist: ${reaction.path}`);
    continue;
  }

  const content = readFile(fullPath);
  const frontmatter = parseFrontmatter(content);

  if (!frontmatter.id) {
    fail(`${label} file is missing frontmatter id`);
  } else if (frontmatter.id !== reaction.id) {
    fail(`${label} frontmatter id mismatch: expected ${reaction.id}, got ${frontmatter.id}`);
  }

  if (frontmatter.name && frontmatter.name !== reaction.name) {
    console.warn(`⚠️  ${label} frontmatter name differs from reactions.json name`);
  }
}

if (process.exitCode) {
  console.error("\nValidation failed.");
  process.exit(process.exitCode);
}

console.log(`\nValidated ${index.reactions.length} ReActions.`);
