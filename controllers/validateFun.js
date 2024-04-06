class Validate {
  isValidUUID(value) {
    // uuid ni tekshiradigon validate
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
  containsSQLCode(text) {
    // Define regular expressions for common SQL code patterns
    const sqlPatterns = [
      /SELECT .*? FROM/i,
      /INSERT INTO .*? VALUES/i,
      /UPDATE .*? SET/i,
      /DELETE FROM .*? WHERE/i,
      /CREATE TABLE .*? \(/i,
      /ALTER TABLE .*? ADD/i,
      /DROP TABLE .*?/i,
      /CREATE DATABASE .*?/i,
      /USE DATABASE .*?/i,
      /--.*?$/m, // SQL comments
      /\/\*[\s\S]*?\*\//, // SQL multiline comments
    ];
  
    // Iterate through each pattern and check if it exists in the text
    for (const pattern of sqlPatterns) {
      if (pattern.test(text)) {
        return true; // Found SQL code
      }
    }
  
    return false; // No SQL code found
  }
}

module.exports = new Validate();
