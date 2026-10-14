const config = require('../config');
const { getDatabaseStatus } = require('../config/db');
const ContactMessage = require('../models/ContactMessage');

/**
 * Process an incoming contact submission.
 * Validates, records (in MongoDB if available or in memory/logs), and provides an honest status.
 *
 * @param {object} contactData
 * @param {string} contactData.name
 * @param {string} contactData.email
 * @param {string} contactData.message
 * @param {string} [contactData.ipAddress]
 * @param {string} [contactData.userAgent]
 * @returns {Promise<{success: boolean, message: string, stored: boolean, emailed: boolean}>}
 */
async function processContactMessage({ name, email, message, ipAddress, userAgent }) {
  const dbStatus = getDatabaseStatus();
  let stored = false;

  if (dbStatus.connected) {
    try {
      await ContactMessage.create({
        name,
        email,
        message,
        ipAddress,
        userAgent
      });
      stored = true;
      console.log(`[Contact Service] Message from ${email} saved to database.`);
    } catch (err) {
      console.warn(`[Contact Service] Failed to persist message to database: ${err.message}`);
    }
  } else {
    console.log(`[Contact Service] Received contact message from "${name}" <${email}>: "${message.slice(0, 80)}..." (Stored in log)`);
  }

  // Provide honest status regarding email transmission
  return {
    success: true,
    message: stored
      ? 'Your message has been securely recorded. Direct contact is also available via adityasinhaa001@gmail.com.'
      : 'Your message has been received and logged. Note: automated SMTP delivery is not configured, but you can also reach Aditya directly at adityasinhaa001@gmail.com.',
    stored,
    emailed: false,
    directEmail: config.contact.receiverEmail
  };
}

module.exports = {
  processContactMessage
};
