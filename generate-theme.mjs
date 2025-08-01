// @ts-nocheck
// Purpose: Reads an INI file and generates the TypeScript theme object file using ES Module syntax.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// --- Configuration ---
const INI_FILENAME = "DefaultColors.ini"; // The input INI file
const OUTPUT_DIR_NAME = "src/lib"; // The relative output directory
const OUTPUT_FILENAME = "default-theme.ts"; // The output TypeScript file
const OUTPUT_OBJECT_NAME = "initialThemeData"; // The name for the exported const
// --------------------

// In ES Modules, __dirname is not available by default. This is the standard way to get it.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parses a string in INI format into a JavaScript object.
 *
 * ---
 * @credit This function is a direct adaptation of logic found in a popular Stack Overflow answer,
 *         which is a common and effective solution for this specific problem.
 * @link https://stackoverflow.com/a/12452845/10363768
 *
 * This specific snippet was originally sourced from Saadbruno's repository for his
 * Clone Hero color editor project, which served as the initial inspiration.
 * @link https://github.com/saadbruno/clone-hero-color-editor
 * ---
 *
 * @param {string} data The INI-formatted string.
 * @returns {object} A nested JavaScript object representing the INI data.
 */
function parseINIString(data) {
  const regex = {
    section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
    param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
    comment: /^\s*;.*$/,
  };
  const value = {};
  const lines = data.split(/[\r\n]+/);
  let section = null;
  lines.forEach(function (line) {
    if (regex.comment.test(line)) {
      return;
    } else if (regex.param.test(line)) {
      const match = line.match(regex.param);
      if (section) {
        value[section][match[1].trim()] = match[2].trim();
      } else {
        value[match[1].trim()] = match[2].trim();
      }
    } else if (regex.section.test(line)) {
      const match = line.match(regex.section);
      value[match[1]] = {};
      section = match[1];
    } else if (line.length == 0 && section) {
      section = null;
    }
  });
  return value;
}

// --- Main Execution Logic ---
function main() {
  console.log("🚀 Starting theme generation using ES Module script...");

  const inputFilePath = path.join(__dirname, INI_FILENAME);
  const outputDir = path.join(__dirname, OUTPUT_DIR_NAME);
  const outputFilePath = path.join(outputDir, OUTPUT_FILENAME);

  try {
    if (!fs.existsSync(inputFilePath)) {
      throw new Error(
        `Input file not found at '${inputFilePath}'. Make sure '${INI_FILENAME}' is in the project root.`,
      );
    }

    console.log(`- Reading from '${INI_FILENAME}'...`);
    const fileContent = fs.readFileSync(inputFilePath, "utf8");

    const parsedObject = parseINIString(fileContent);
    console.log("- Successfully parsed INI data.");

    const prettyJson = JSON.stringify(parsedObject, null, 2);

    // Construct the file content with attribution
    const fileContentString = `// This file is auto-generated by the 'generate-theme.mjs' script.
// Do not edit this file directly, as your changes will be overwritten.
// Generated from: ${INI_FILENAME}
// Generated at: ${new Date().toISOString()}
//
// Credits for the original parsing logic:
// - Stack Overflow: https://stackoverflow.com/a/12452845/10363768
// - Saadbruno's Repo: https://github.com/saadbruno/clone-hero-color-editor

export const ${OUTPUT_OBJECT_NAME} = ${prettyJson};
`;

    if (!fs.existsSync(outputDir)) {
      console.log(`- Output directory not found. Creating '${outputDir}'...`);
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFilePath, fileContentString);

    console.log(`\n\x1b[32m✅ Success! Default theme file created at:\x1b[0m`);
    console.log(`   ${outputFilePath}`);
  } catch (error) {
    console.error(`\n\x1b[31m❌ Error during theme generation:\x1b[0m`);
    console.error(error.message);
    process.exit(1);
  }
}

// Run the main function
main();
