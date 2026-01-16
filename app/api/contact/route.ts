// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter configuration (5 requests per 15 minutes per IP)
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 15 * 60, // 15 minutes
});

// Spam protection
const spamKeywords = ['viagra', 'casino', 'loan', 'bitcoin', 'forex', 'http://', 'https://'];
const maxMessageLength = 5000;

// Email template
const createEmailTemplate = (data: any) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission - Sqrock IT Solutions</title>
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
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
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
        .field-group {
            margin-bottom: 25px;
            padding-bottom: 25px;
            border-bottom: 2px solid #f0f0f0;
        }
        .field-group:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .label {
            font-weight: 600;
            color: #667eea;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            display: block;
        }
        .value {
            font-size: 16px;
            color: #333;
        }
        .message-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin-top: 15px;
            border-radius: 0 8px 8px 0;
            white-space: pre-wrap;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #eee;
        }
        .priority-badge {
            display: inline-block;
            padding: 6px 16px;
            background: ${getPriorityColor(data.service)};
            color: white;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            margin-left: 10px;
        }
        .contact-info {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
        }
        .contact-info p {
            margin: 8px 0;
            font-size: 14px;
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
            <h1>📧 New Contact Form Submission</h1>
            <p style="opacity: 0.9; margin-top: 10px; font-size: 14px;">
                Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
        </div>
        
        <div class="content">
            <div class="field-group">
                <div class="label">👤 Contact Information</div>
                <div class="value">
                    <strong>${data.name}</strong>
                    <span class="priority-badge">${getPriorityLevel(data.service)}</span>
                </div>
                <div style="margin-top: 12px;">
                    <p style="margin: 4px 0; font-size: 14px;">
                        📧 <strong>Email:</strong> ${data.email}
                    </p>
                    ${data.phone ? `<p style="margin: 4px 0; font-size: 14px;">
                        📱 <strong>Phone:</strong> ${data.phone}
                    </p>` : ''}
                </div>
            </div>
            
            <div class="field-group">
                <div class="label">🛠️ Service Interest</div>
                <div class="value">
                    <strong>${data.service}</strong>
                </div>
                ${getServiceDescription(data.service)}
            </div>
            
            <div class="field-group">
                <div class="label">📝 Project Details</div>
                <div class="message-box">
                    ${data.message.replace(/\n/g, '<br>')}
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: #666;">
                    📊 <strong>Message Length:</strong> ${data.message.length} characters
                </div>
            </div>
            
            <div class="field-group">
                <div class="label">🔍 Additional Information</div>
                <div class="contact-info">
                    <p><strong>📅 Submitted:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>🌐 IP Address:</strong> ${data.ip || 'Not available'}</p>
                    <p><strong>📍 Location:</strong> ${data.location || 'India'}</p>
                    <p><strong>📱 User Agent:</strong> ${data.userAgent ? data.userAgent.substring(0, 60) + '...' : 'Not available'}</p>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #e8f4fd; border-radius: 8px; border-left: 4px solid #1890ff;">
                <p style="margin: 0; font-size: 14px; color: #1890ff;">
                    ⚡ <strong>Action Required:</strong> Please respond within 24 hours
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>This contact form submission was received through the Sqrock IT Solutions website.</p>
            <p style="opacity: 0.7; margin-top: 8px;">
                Submission ID: ${Date.now().toString(36).toUpperCase()} | 
                Response Time: < 24h
            </p>
        </div>
    </div>
</body>
</html>
`;

// Helper functions
function getPriorityColor(service: string): string {
    const highPriority = ['Custom Software', 'Web Application', 'Mobile App Development'];
    const mediumPriority = ['Web Development', 'Cloud & DevOps'];
    
    if (highPriority.some(s => service.includes(s))) return '#ff6b6b';
    if (mediumPriority.some(s => service.includes(s))) return '#ffa726';
    return '#66bb6a';
}

function getPriorityLevel(service: string): string {
    const highPriority = ['Custom Software', 'Web Application', 'Mobile App Development'];
    const mediumPriority = ['Web Development', 'Cloud & DevOps'];
    
    if (highPriority.some(s => service.includes(s))) return 'High Priority';
    if (mediumPriority.some(s => service.includes(s))) return 'Medium Priority';
    return 'Standard Priority';
}

function getServiceDescription(service: string): string {
    const descriptions: Record<string, string> = {
        'Web Development': 'Website development & design projects',
        'Mobile App Development': 'iOS/Android application development',
        'UI/UX Design': 'User interface and experience design',
        'Custom Software': 'Custom software solutions',
        'Cloud & DevOps': 'Cloud infrastructure & DevOps services',
    };
    
    const desc = descriptions[service] || 'IT service inquiry';
    return `<p style="margin-top: 8px; font-size: 14px; color: #666;">${desc}</p>`;
}

// Email transporter
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

// Validation
const validateRequest = (data: any) => {
    const errors: string[] = [];

    // Required fields
    if (!data.name?.trim()) errors.push('Name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!data.message?.trim()) errors.push('Message is required');
    if (!data.service?.trim()) errors.push('Service is required');

    // Email format
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format');
    }

    // Message length
    if (data.message && data.message.length > maxMessageLength) {
        errors.push(`Message is too long (max ${maxMessageLength} characters)`);
    }

    // Phone validation (if provided)
    if (data.phone && data.phone.trim()) {
        const cleanedPhone = data.phone.replace(/\D/g, '');
        if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
            errors.push('Phone number must be 10-15 digits');
        }
    }

    // Spam check
    const combinedText = (data.name + ' ' + data.email + ' ' + data.message).toLowerCase();
    if (spamKeywords.some(keyword => combinedText.includes(keyword))) {
        console.warn('Spam detected in submission');
        // Still return success to avoid revealing spam detection
        return { isValid: true, errors: [] };
    }

    return { isValid: errors.length === 0, errors };
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
                { 
                    success: false, 
                    message: 'Too many requests. Please try again later.',
                    code: 'RATE_LIMIT_EXCEEDED'
                },
                { status: 429 }
            );
        }

        // Parse request
        let data;
        try {
            data = await request.json();
        } catch (error) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Invalid JSON format',
                    code: 'INVALID_JSON'
                },
                { status: 400 }
            );
        }

        // Add metadata
        const metadata = {
            ip,
            userAgent: request.headers.get('user-agent'),
            location: 'India',
            timestamp: new Date().toISOString(),
        };

        // Validate
        const validation = validateRequest(data);
        if (!validation.isValid) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Validation failed',
                    errors: validation.errors,
                    code: 'VALIDATION_FAILED'
                },
                { status: 400 }
            );
        }

        // Check environment variables
        const requiredEnvVars = ['SMTP_USER', 'SMTP_PASS', 'CONTACT_RECEIVER_EMAIL'];
        const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
        
        if (missingEnvVars.length > 0) {
            console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Server configuration error',
                    code: 'SERVER_ERROR'
                },
                { status: 500 }
            );
        }

        // Create transporter
        const transporter = createTransporter();
        
        // Prepare email data
        const mailData = {
            from: `"Sqrock IT Solutions Contact" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_RECEIVER_EMAIL,
            cc: process.env.CONTACT_CC_EMAIL || '',
            subject: `New Contact: ${data.name} - ${data.service}`,
            html: createEmailTemplate({ ...data, ...metadata }),
            replyTo: data.email,
            text: `
NEW CONTACT FORM SUBMISSION - Sqrock IT Solutions
=================================================

Contact Information:
────────────────────
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Service Interest: ${data.service}

Project Details:
────────────────
${data.message}

Additional Information:
──────────────────────
Submitted: ${new Date().toLocaleString()}
IP Address: ${metadata.ip}
User Agent: ${metadata.userAgent?.substring(0, 100) || 'Not available'}

---
This message was sent from the contact form on Sqrock IT Solutions website.
            `,
        };

        // Send email
        const info = await transporter.sendMail(mailData);
        
        console.log(`Contact form sent successfully: ${info.messageId}`);
        console.log(`From: ${data.name} (${data.email}), Service: ${data.service}`);

        // Send auto-reply to user
        try {
            const userAutoReply = {
                from: `"Sqrock IT Solutions" <${process.env.SMTP_USER}>`,
                to: data.email,
                subject: 'Thank You for Contacting Sqrock IT Solutions',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; color: white;">
                            <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
                        </div>
                        
                        <div style="padding: 30px; background: #fff; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0; border-top: none;">
                            <p>Hi ${data.name},</p>
                            
                            <p>We've received your inquiry regarding <strong>${data.service}</strong> and our team is reviewing it now.</p>
                            
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                                <p style="margin: 0; font-weight: bold;">📋 Your Submission Details:</p>
                                <p style="margin: 8px 0 0 0;">• Service: ${data.service}</p>
                                <p style="margin: 4px 0;">• Submitted: ${new Date().toLocaleString()}</p>
                                <p style="margin: 4px 0;">• Reference ID: ${Date.now().toString(36).toUpperCase()}</p>
                            </div>
                            
                            <p><strong>What happens next?</strong></p>
                            <ol style="margin-top: 10px;">
                                <li>Our team reviews your requirements (within 24 hours)</li>
                                <li>We'll contact you to discuss details</li>
                                <li>We'll provide a custom solution proposal</li>
                            </ol>
                            
                            <p style="margin-top: 25px;">If you have any urgent questions, please reply to this email.</p>
                            
                            <p>Best regards,<br>
                            <strong>The Sqrock IT Solutions Team</strong></p>
                            
                            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
                            
                            <div style="text-align: center; font-size: 12px; color: #666;">
                                <p style="margin: 5px 0;">
                                    <strong>Sqrock IT Solutions</strong><br>
                                    contact@sqrock.com | +91 12345 67890
                                </p>
                                <p style="margin: 5px 0; font-size: 11px;">
                                    This is an automated response. Please do not reply to this email.
                                </p>
                            </div>
                        </div>
                    </div>
                `,
            };
            
            await transporter.sendMail(userAutoReply);
            console.log(`Auto-reply sent to user: ${data.email}`);
        } catch (autoReplyError) {
            console.warn('Failed to send auto-reply to user:', autoReplyError);
            // Don't fail the main request if auto-reply fails
        }

        return NextResponse.json(
            { 
                success: true, 
                message: 'Contact form submitted successfully',
                submissionId: Date.now().toString(36).toUpperCase(),
                timestamp: new Date().toISOString()
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error processing contact form:', error);
        
        // Specific error handling
        if (error.code === 'EAUTH') {
            console.error('SMTP authentication failed');
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Email service configuration error',
                    code: 'EMAIL_CONFIG_ERROR'
                },
                { status: 500 }
            );
        }
        
        if (error.code === 'EENVELOPE') {
            console.error('Email envelope error:', error.message);
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Invalid email data',
                    code: 'INVALID_EMAIL_DATA'
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to submit contact form',
                code: 'SUBMISSION_FAILED'
            },
            { status: 500 }
        );
    }
}

// GET method for information
export async function GET(request: NextRequest) {
    return NextResponse.json({
        message: 'Sqrock IT Solutions - Contact Form API',
        version: '1.0.0',
        endpoints: {
            POST: '/api/contact',
        },
        required_fields: [
            'name (string) - Required',
            'email (string) - Required',
            'service (string) - Required',
            'message (string) - Required',
        ],
        optional_fields: [
            'phone (string)',
        ],
        service_options: [
            'Web Development',
            'Mobile App Development',
            'UI/UX Design',
            'Custom Software',
            'Cloud & DevOps',
            'Other',
        ],
        rate_limit: '5 requests per 15 minutes per IP',
        privacy: 'We do not store submitted data. All information is sent via email only.',
    });
}