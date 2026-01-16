// app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter configuration (5 requests per 15 minutes per IP)
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 15 * 60, // 15 minutes
});

// Simple spam protection
const spamKeywords = ['viagra', 'casino', 'loan', 'http://', 'https://'];
const suspiciousPatterns = /\b(?:http|https|www\.|\.com|\.net|\.org)\b/i;

// Email template
const createEmailTemplate = (data: any) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Quote Request</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .field {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .field:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #667eea;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .value {
            font-size: 16px;
            color: #333;
        }
        .message-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin-top: 10px;
            border-radius: 0 4px 4px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #eee;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            background: #e9ecef;
            color: #495057;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            margin-left: 10px;
        }
        .priority {
            display: inline-block;
            padding: 4px 12px;
            background: #ff6b6b;
            color: white;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            margin-left: 10px;
        }
        @media (max-width: 600px) {
            .content {
                padding: 20px;
            }
            .header {
                padding: 20px;
            }
            .header h1 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 New Quote Request - Sqrock IT Solutions</h1>
            <p style="opacity: 0.9; margin-top: 10px; font-size: 14px;">Received at ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">👤 Client Information</div>
                <div class="value">
                    <strong>${data.name}</strong>
                    <span class="badge">${getPriorityBadge(data.budget)}</span>
                </div>
                <div style="margin-top: 8px; font-size: 14px;">
                    📧 ${data.email}<br>
                    📱 ${data.phone}
                </div>
            </div>
            
            <div class="field">
                <div class="label">🛠️ Service Requested</div>
                <div class="value">
                    <strong>${data.service}</strong>
                    ${data.service.includes('Custom') ? '<span class="priority">Custom Project</span>' : ''}
                </div>
            </div>
            
            <div class="field">
                <div class="label">💰 Budget Range</div>
                <div class="value">
                    <strong>${data.budget}</strong>
                    ${getBudgetEmoji(data.budget)}
                </div>
            </div>
            
            <div class="field">
                <div class="label">📝 Project Details</div>
                <div class="message-box">
                    ${data.message.replace(/\n/g, '<br>')}
                </div>
            </div>
            
            <div class="field">
                <div class="label">⚡ Quick Actions</div>
                <div style="margin-top: 10px;">
                    <a href="mailto:${data.email}" style="background: #667eea; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px; margin-right: 10px;">Reply via Email</a>
                    <a href="tel:${data.phone}" style="background: #38a169; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">Call Client</a>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>This quote request was submitted through the Sqrock IT Solutions website.</p>
            <p style="opacity: 0.7; margin-top: 5px;">
                IP Address: ${data.ip || 'Not available'} | 
                User Agent: ${data.userAgent ? data.userAgent.substring(0, 50) + '...' : 'Not available'}
            </p>
        </div>
    </div>
</body>
</html>
`;

// Helper functions for email template
function getPriorityBadge(budget: string): string {
  const budgets = ['Below ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', 'Above ₹50,000'];
  const index = budgets.indexOf(budget);
  if (index >= 3) return 'High Priority';
  if (index >= 1) return 'Medium Priority';
  return 'Standard Priority';
}

function getBudgetEmoji(budget: string): string {
  if (budget.includes('Above ₹50,000')) return '💰💎';
  if (budget.includes('₹25,000')) return '💰💰';
  if (budget.includes('₹10,000')) return '💰';
  if (budget.includes('₹5,000')) return '💵';
  return '💸';
}

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Validation function
const validateRequest = (data: any) => {
  const errors: string[] = [];

  // Required fields
  const requiredFields = ['name', 'email', 'phone', 'service', 'budget', 'message'];
  requiredFields.forEach(field => {
    if (!data[field]?.trim()) {
      errors.push(`${field} is required`);
    }
  });

  // Email validation
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }

  // Phone validation (basic Indian format)
  if (data.phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanedPhone = data.phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      errors.push('Phone number must be 10 digits');
    }
  }

  // Message length validation
  if (data.message && data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  // Message length limit
  if (data.message && data.message.trim().length > 2000) {
    errors.push('Message is too long (max 2000 characters)');
  }

  return errors;
};

// Spam detection
const checkForSpam = (data: any) => {
  const message = (data.message + ' ' + data.name + ' ' + data.email).toLowerCase();
  
  // Check for spam keywords
  if (spamKeywords.some(keyword => message.includes(keyword))) {
    return true;
  }
  
  // Check for suspicious patterns (too many links)
  const linkCount = (message.match(/(http|https|www\.)/gi) || []).length;
  if (linkCount > 3) {
    return true;
  }
  
  // Check for excessive repetition
  const words = message.split(/\s+/);
  const uniqueWords = new Set(words);
  if (uniqueWords.size / words.length < 0.3) {
    return true;
  }
  
  return false;
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    try {
      await rateLimiter.consume(ip);
    } catch (rateLimiterRes) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    let data;
    try {
      data = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    // Add metadata
    const metadata = {
      ip,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
    };

    // Validate request
    const validationErrors = validateRequest(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    // Spam check
    if (checkForSpam(data)) {
      console.warn(`Potential spam detected from IP: ${ip}`);
      // Don't reveal spam detection to user
      return NextResponse.json(
        { success: true, message: 'Quote request received successfully' },
        { status: 200 }
      );
    }

    // Check environment variables
    const requiredEnvVars = ['SMTP_USER', 'SMTP_PASS', 'QUOTE_RECEIVER_EMAIL'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = createTransporter();
    
    // Prepare email data
    const mailData = {
      from: `"Sqrock IT Solutions" <${process.env.SMTP_USER}>`,
      to: process.env.QUOTE_RECEIVER_EMAIL,
      subject: `New Quote Request - ${data.service} - ${data.name}`,
      html: createEmailTemplate({ ...data, ...metadata }),
      replyTo: data.email,
      // Text version for email clients that don't support HTML
      text: `
New Quote Request - Sqrock IT Solutions

Client Information:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Service Requested: ${data.service}
Budget Range: ${data.budget}

Project Details:
${data.message}

---
Submitted at: ${new Date().toLocaleString()}
IP Address: ${metadata.ip}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailData);
    
    console.log(`Quote request sent successfully: ${info.messageId}`);
    console.log(`From: ${data.name} (${data.email}), Service: ${data.service}`);

    // Send auto-reply to client
    try {
      const clientAutoReply = {
        from: `"Sqrock IT Solutions" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: 'We Received Your Quote Request - Sqrock IT Solutions',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #667eea;">Thank You for Your Interest!</h2>
            <p>Hi ${data.name},</p>
            <p>We've received your quote request for <strong>${data.service}</strong> and our team will review it shortly.</p>
            <p>We typically respond within 24 hours during business days.</p>
            <p><strong>Your Request ID:</strong> ${Date.now().toString(36).toUpperCase()}</p>
            <p>Best regards,<br>The Sqrock IT Solutions Team</p>
          </div>
        `,
      };
      
      await transporter.sendMail(clientAutoReply);
      console.log(`Auto-reply sent to client: ${data.email}`);
    } catch (autoReplyError) {
      console.warn('Failed to send auto-reply to client:', autoReplyError);
      // Don't fail the main request if auto-reply fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request sent successfully',
        requestId: Date.now().toString(36).toUpperCase()
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error processing quote request:', error);
    
    // Specific error handling
    if (error.code === 'EAUTH') {
      console.error('SMTP authentication failed. Check email credentials.');
      return NextResponse.json(
        { success: false, message: 'Email service configuration error' },
        { status: 500 }
      );
    }
    
    if (error.code === 'EENVELOPE') {
      console.error('Email envelope error:', error.message);
      return NextResponse.json(
        { success: false, message: 'Invalid email data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to send quote request' },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to provide form schema or test endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Sqrock IT Solutions - Quote Request API',
    version: '1.0.0',
    endpoints: {
      POST: '/api/quote',
    },
    required_fields: [
      'name (string)',
      'email (string)',
      'phone (string)',
      'service (string)',
      'budget (string)',
      'message (string)',
    ],
    budget_options: [
      'Below ₹5,000',
      '₹5,000 - ₹10,000',
      '₹10,000 - ₹25,000',
      '₹25,000 - ₹50,000',
      'Above ₹50,000',
    ],
    rate_limit: '5 requests per 15 minutes per IP',
  });
}