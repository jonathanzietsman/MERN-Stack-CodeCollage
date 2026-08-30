// ==========================================
// DATE FORMATTING HELPER
// ==========================================
// Converts any valid JS Date object or date string into a standardized ISO string format (YYYY-MM-DDTHH:mm:ss.sssZ)
// This ensures consistent date formatting across GraphQL responses and database queries
exports.dateToString = date => new Date(date).toISOString();