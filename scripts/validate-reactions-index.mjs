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

// Top-level schema validation
if (index.schema_version === undefined) {
  fail("Missing top-level schema_version");
} else if (typeof index.schema_version !== "string") {
  fail("schema_version must be a string");
} else {
  pass(`schema_version is ${index.schema_version}`);
}

if (!Array.isArray(index.reactions)) {
  fail("reactions.json must contain a reactions array");
  process.exit(1);
}

const seenIds = new Set();
const seenTriggers = new Set();

const allowedDifficulty = new Set(["beginner", "intermediate", "advanced"]);
const allowedSafetyLevel = new Set(["low", "medium", "high"]);
const allowedRelationship = new Set([
  "alternative",
  "use-with",
  "next-step",
  "do-not-confuse-with",
  "prerequisite"
]);

// Build index set of all reaction IDs first for reference checks
const allReactionIds = new Set(index.reactions.map(r => r.id).filter(Boolean));

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

  // Validate presence of new metadata fields
  const requiredMetadata = [
    "difficulty",
    "estimated_context_tokens",
    "supported_frameworks",
    "capabilities",
    "verification",
    "safety_level",
    "read_only",
    "tags",
    "related_reactions"
  ];

  for (const field of requiredMetadata) {
    if (reaction[field] === undefined) {
      fail(`${label} is missing required metadata field: ${field}`);
    }
  }

  // Validate difficulty
  if (reaction.difficulty !== undefined && !allowedDifficulty.has(reaction.difficulty)) {
    fail(`${label} difficulty "${reaction.difficulty}" is not allowed`);
  }

  // Validate safety_level
  if (reaction.safety_level !== undefined && !allowedSafetyLevel.has(reaction.safety_level)) {
    fail(`${label} safety_level "${reaction.safety_level}" is not allowed`);
  }

  // Validate estimated_context_tokens
  if (reaction.estimated_context_tokens !== undefined) {
    if (typeof reaction.estimated_context_tokens !== "string" || reaction.estimated_context_tokens.trim() === "") {
      fail(`${label} estimated_context_tokens must be a non-empty string`);
    }
  }

  // Validate supported_frameworks
  if (reaction.supported_frameworks !== undefined) {
    if (!Array.isArray(reaction.supported_frameworks) || reaction.supported_frameworks.length === 0) {
      fail(`${label} supported_frameworks must be a non-empty array`);
    } else {
      for (const framework of reaction.supported_frameworks) {
        if (typeof framework !== "string" || framework.trim() === "") {
          fail(`${label} supported_frameworks contains invalid framework string`);
        }
      }
    }
  }

  // Validate capabilities
  if (reaction.capabilities !== undefined) {
    if (!Array.isArray(reaction.capabilities) || reaction.capabilities.length === 0) {
      fail(`${label} capabilities must be a non-empty array`);
    } else {
      for (const cap of reaction.capabilities) {
        if (typeof cap !== "string" || cap.trim() === "") {
          fail(`${label} capabilities contains invalid capability string`);
        }
      }
    }
  }

  // Validate verification
  if (reaction.verification !== undefined) {
    if (!Array.isArray(reaction.verification) || reaction.verification.length === 0) {
      fail(`${label} verification must be a non-empty array`);
    } else {
      for (const ver of reaction.verification) {
        if (typeof ver !== "string" || ver.trim() === "") {
          fail(`${label} verification contains invalid verification string`);
        }
      }
    }
  }

  // Validate read_only
  if (reaction.read_only !== undefined && typeof reaction.read_only !== "boolean") {
    fail(`${label} read_only must be a boolean`);
  }

  // Validate tags
  if (reaction.tags !== undefined) {
    if (!Array.isArray(reaction.tags) || reaction.tags.length === 0) {
      fail(`${label} tags must be a non-empty array`);
    } else {
      for (const tag of reaction.tags) {
        if (typeof tag !== "string" || tag.trim() === "") {
          fail(`${label} tags contains invalid tag string`);
        }
      }
    }
  }

  // Validate related_reactions
  if (reaction.related_reactions !== undefined) {
    if (!Array.isArray(reaction.related_reactions)) {
      fail(`${label} related_reactions must be an array`);
    } else {
      for (const rel of reaction.related_reactions) {
        if (typeof rel !== "object" || rel === null || !rel.id || !rel.relationship) {
          fail(`${label} related_reactions must contain objects with id and relationship`);
        } else {
          if (!allReactionIds.has(rel.id)) {
            fail(`${label} relates to non-existent reaction ID: ${rel.id}`);
          }
          if (rel.id === reaction.id) {
            fail(`${label} cannot relate to itself`);
          }
          if (!allowedRelationship.has(rel.relationship)) {
            fail(`${label} has invalid relationship: ${rel.relationship}`);
          }
        }
      }
    }
  }

  // Category specific rules
  if (reaction.category === "frontend" && reaction.subcategory === "buttons") {
    if (reaction.verification && !reaction.verification.includes("browser")) {
      fail(`${label} (frontend/buttons) must include "browser" in verification`);
    }
  }

  if (reaction.category === "devtools" && reaction.subcategory === "vercel") {
    if (reaction.verification && !reaction.verification.includes("terminal")) {
      fail(`${label} (devtools/vercel) must include "terminal" in verification`);
    }
  }

  if (reaction.tags && reaction.tags.includes("redaction")) {
    if (reaction.verification && !reaction.verification.includes("redaction")) {
      fail(`${label} with redaction tag must include "redaction" in verification`);
    }
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
