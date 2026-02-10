// ===========================================
// PayMongo API Client
// ===========================================
// Centralized PayMongo API client with authentication
// and request helpers. PayMongo uses Basic Auth with
// the secret key as username and empty password.
//
// WHY THIS DESIGN:
// - PayMongo doesn't have an official Node.js SDK
// - Centralized client ensures consistent auth/error handling
// - Easy to mock for testing

import config from '../config/index.js';

const PAYMONGO_BASE_URL = config.paymongo.baseUrl;

/**
 * Creates authorization header for PayMongo API
 * PayMongo uses Basic Auth: base64(secretKey:)
 */
const getAuthHeader = () => {
  const credentials = Buffer.from(`${config.paymongo.secretKey}:`).toString('base64');
  return `Basic ${credentials}`;
};

/**
 * Makes an authenticated request to PayMongo API
 * 
 * @param {string} endpoint - API endpoint (e.g., '/customers')
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} API response
 */
export const paymongoRequest = async (endpoint, options = {}) => {
  const url = `${PAYMONGO_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.errors?.[0]?.detail || 'PayMongo API error');
    error.status = response.status;
    error.code = data.errors?.[0]?.code;
    error.paymongoErrors = data.errors;
    throw error;
  }

  return data;
};

// ===========================================
// Customer API
// ===========================================

/**
 * Creates a PayMongo customer
 * 
 * @param {Object} params - Customer details
 * @param {string} params.email - Customer email
 * @param {string} params.firstName - Customer first name
 * @param {string} params.lastName - Customer last name
 * @param {string} params.phone - Customer phone (optional)
 * @param {Object} params.metadata - Additional metadata
 * @returns {Promise<Object>} Created customer
 */
export const createCustomer = async ({ email, firstName, lastName, phone, metadata = {} }) => {
  const attributes = {
    email,
    first_name: firstName,
    last_name: lastName,
    default_device: 'email', // Required field - use email for notifications
    metadata,
  };

  // Add phone if provided
  if (phone) {
    attributes.phone = phone;
  }

  const response = await paymongoRequest('/customers', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        attributes,
      },
    }),
  });
  return response.data;
};

/**
 * Retrieves a PayMongo customer by ID
 * 
 * @param {string} customerId - PayMongo customer ID
 * @returns {Promise<Object>} Customer object
 */
export const getCustomer = async (customerId) => {
  const response = await paymongoRequest(`/customers/${customerId}`);
  return response.data;
};

// ===========================================
// Plan API
// ===========================================

/**
 * Creates a subscription plan
 * Plans define the billing cycle, amount, and currency
 * 
 * @param {Object} params - Plan details
 * @returns {Promise<Object>} Created plan
 */
export const createPlan = async ({ name, description, amount, currency = 'PHP', interval = 'monthly', intervalCount = 1 }) => {
  const response = await paymongoRequest('/plans', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        attributes: {
          name,
          description,
          amount, // In centavos (e.g., 50000 = PHP 500)
          currency,
          interval,
          interval_count: intervalCount,
        },
      },
    }),
  });
  return response.data;
};

/**
 * Retrieves a plan by ID
 * 
 * @param {string} planId - PayMongo plan ID
 * @returns {Promise<Object>} Plan object
 */
export const getPlan = async (planId) => {
  const response = await paymongoRequest(`/plans/${planId}`);
  return response.data;
};

// ===========================================
// Subscription API
// ===========================================

/**
 * Creates a subscription for a customer
 * Requires a payment method to be attached first
 * 
 * @param {Object} params - Subscription details
 * @returns {Promise<Object>} Created subscription with payment intent
 */
export const createSubscription = async ({ customerId, planId, paymentMethodId, metadata = {} }) => {
  const attributes = {
    customer_id: customerId,
    plan_id: planId,
    metadata,
  };
  
  // PayMongo requires a default payment method for subscriptions
  if (paymentMethodId) {
    attributes.default_payment_method_id = paymentMethodId;
  }
  
  const response = await paymongoRequest('/subscriptions', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        attributes,
      },
    }),
  });
  return response.data;
};

/**
 * Retrieves a subscription by ID
 * 
 * @param {string} subscriptionId - PayMongo subscription ID
 * @returns {Promise<Object>} Subscription object
 */
export const getSubscription = async (subscriptionId) => {
  const response = await paymongoRequest(`/subscriptions/${subscriptionId}`);
  return response.data;
};

/**
 * Cancels a subscription
 * Takes effect immediately, no further invoices generated
 * 
 * @param {string} subscriptionId - PayMongo subscription ID
 * @returns {Promise<Object>} Cancelled subscription
 */
export const cancelSubscription = async (subscriptionId) => {
  const response = await paymongoRequest(`/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
  });
  return response.data;
};

/**
 * Changes subscription plan
 * New plan takes effect on next billing cycle
 * 
 * @param {string} subscriptionId - PayMongo subscription ID
 * @param {string} newPlanId - New plan ID
 * @returns {Promise<Object>} Updated subscription
 */
export const changeSubscriptionPlan = async (subscriptionId, newPlanId) => {
  const response = await paymongoRequest(`/subscriptions/${subscriptionId}/change_plan`, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        attributes: {
          plan_id: newPlanId,
        },
      },
    }),
  });
  return response.data;
};

// ===========================================
// Payment Intent API
// ===========================================

/**
 * Attaches a payment method to a payment intent
 * Required after creating a subscription to complete first payment
 * 
 * @param {string} paymentIntentId - Payment intent ID from subscription
 * @param {string} paymentMethodId - Payment method ID
 * @param {string} returnUrl - URL to redirect after 3DS authentication
 * @returns {Promise<Object>} Updated payment intent
 */
export const attachPaymentMethod = async (paymentIntentId, paymentMethodId, returnUrl) => {
  const response = await paymongoRequest(`/payment_intents/${paymentIntentId}/attach`, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        attributes: {
          payment_method: paymentMethodId,
          return_url: returnUrl,
        },
      },
    }),
  });
  return response.data;
};

/**
 * Creates a payment method
 * 
 * @param {Object} params - Payment method details
 * @returns {Promise<Object>} Created payment method
 */
export const createPaymentMethod = async ({ type, details, billingDetails }) => {
  const response = await paymongoRequest('/payment_methods', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        attributes: {
          type,
          details,
          billing: billingDetails,
        },
      },
    }),
  });
  return response.data;
};

// ===========================================
// Invoice API
// ===========================================

/**
 * Retrieves an invoice by ID
 * 
 * @param {string} invoiceId - PayMongo invoice ID
 * @returns {Promise<Object>} Invoice object
 */
export const getInvoice = async (invoiceId) => {
  const response = await paymongoRequest(`/invoices/${invoiceId}`);
  return response.data;
};

/**
 * Pays an open invoice manually
 * Use when subscription payment fails and customer updates payment method
 * 
 * @param {string} invoiceId - PayMongo invoice ID
 * @returns {Promise<Object>} Updated invoice
 */
export const payInvoice = async (invoiceId) => {
  const response = await paymongoRequest(`/invoices/${invoiceId}/pay`, {
    method: 'POST',
  });
  return response.data;
};

// ===========================================
// Webhook Signature Verification
// ===========================================

/**
 * Verifies PayMongo webhook signature
 * PayMongo signs webhooks using HMAC-SHA256
 * 
 * @param {string} payload - Raw request body
 * @param {string} signature - Signature from Paymongo-Signature header
 * @param {string} secret - Webhook secret
 * @returns {boolean} Whether signature is valid
 */
export const verifyWebhookSignature = (payload, signature, secret) => {
  const crypto = require('crypto');
  
  // PayMongo signature format: t=timestamp,te=test_signature,li=live_signature
  const parts = signature.split(',');
  const timestampPart = parts.find(p => p.startsWith('t='));
  const signaturePart = parts.find(p => p.startsWith('li=') || p.startsWith('te='));
  
  if (!timestampPart || !signaturePart) {
    return false;
  }
  
  const timestamp = timestampPart.split('=')[1];
  const providedSignature = signaturePart.split('=')[1];
  
  // Compute expected signature
  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  
  // Constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(providedSignature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
};

export default {
  paymongoRequest,
  createCustomer,
  getCustomer,
  createPlan,
  getPlan,
  createSubscription,
  getSubscription,
  cancelSubscription,
  changeSubscriptionPlan,
  attachPaymentMethod,
  createPaymentMethod,
  getInvoice,
  payInvoice,
  verifyWebhookSignature,
};
