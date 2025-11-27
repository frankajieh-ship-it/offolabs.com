# Email Configuration Guide

The services intake form can send emails via multiple providers. This guide covers setup for each.

## Overview

When a user submits the services intake form, the system sends:

1. **User Confirmation Email** - Confirmation that we received their inquiry
2. **Internal Support Notification** - Alert to the support team with submission details

Both are sent asynchronously and don't block the form submission.

## Quick Setup

### For Development (Log-Only Mode)

By default, emails are logged to the console without sending. This is perfect for local development.

```bash
# No environment variables needed - just submit the form and check console logs
```

### For Production (Choose One Provider)

## Option 1: Resend (Recommended for Vercel)

[Resend](https://resend.com) is a modern email API built for developers.

### Installation

```bash
npm install resend
```

### Environment Variables

```env
# .env.local or your deployment platform
EMAIL_PROVIDER=resend
EMAIL_FROM=noreply@offodlabs.com
EMAIL_TO_SUPPORT=support@offodlabs.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx  # Get from https://resend.com/api-keys
```

### Setup Steps

1. Go to [resend.com](https://resend.com)
2. Create an account
3. Go to Settings → API Keys
4. Create a new API key
5. Verify your domain (or use the default Resend domain for testing)
6. Copy the API key and add to environment variables

---

## Option 2: SendGrid

[SendGrid](https://sendgrid.com) is a widely-used email delivery service.

### Installation

```bash
npm install @sendgrid/mail
```

### Environment Variables

```env
EMAIL_PROVIDER=sendgrid
EMAIL_FROM=noreply@offodlabs.com
EMAIL_TO_SUPPORT=support@offodlabs.com
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxx  # Get from SendGrid
```

### Setup Steps

1. Go to [sendgrid.com](https://sendgrid.com)
2. Create an account
3. Go to Settings → API Keys
4. Create a new API key with Mail Send permissions
5. Copy the API key and add to environment variables

---

## Option 3: SMTP (Generic)

Use any SMTP-compatible email service (Gmail, Mailgun, AWS SES, etc.).

### Installation

```bash
npm install nodemailer
```

### Environment Variables

```env
EMAIL_PROVIDER=smtp
EMAIL_FROM=noreply@offodlabs.com
EMAIL_TO_SUPPORT=support@offodlabs.com

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false          # true for port 465, false for 587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Setup Steps for Gmail

1. Enable 2-factor authentication on your Google account
2. Generate an app password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Copy the 16-character password
4. Use the settings above with:
   - `SMTP_USER`: your full Gmail address
   - `SMTP_PASS`: the 16-character app password

---

## Testing

### Local Development

1. Set `EMAIL_PROVIDER` to anything or leave unset
2. Submit the form at `/services`
3. Check the browser console for log output
4. Check your server logs for detailed email content

### With Real Email Provider

1. Install the package: `npm install resend` (or other provider)
2. Set all environment variables
3. Restart your development server
4. Submit the form
5. Check your inbox and the support team email

### Testing Tools

- **Mailtrap** - Free SMTP sandbox for testing
- **Ethereal** - Temporary test emails
- **Local Mail Server** - MailHog for development

Example with Ethereal:

```env
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ethereal-user@ethereal.email
SMTP_PASS=your-ethereal-password
```

---

## Email Templates

### User Confirmation Email

Sent to the user confirming receipt of their inquiry.

**Subject:** "We received your services inquiry"

**Content:**
- Thank you message
- Service type and details
- Support contact information
- 24-hour response promise

### Internal Support Email

Sent to the support team with submission details.

**Subject:** "New Services Intake: [Name] - [Service Type]"

**Content:**
- All form fields (name, email, company, service type, budget, timeline)
- Full project description
- Submission timestamp
- Submission source

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `EMAIL_PROVIDER` | No | `log-only` | Which email provider to use: `resend`, `sendgrid`, `smtp`, or `log-only` |
| `EMAIL_FROM` | No | `noreply@offodlabs.com` | Sender email address |
| `EMAIL_TO_SUPPORT` | No | `support@offodlabs.com` | Support team email address |
| `RESEND_API_KEY` | If using Resend | - | API key from resend.com |
| `SENDGRID_API_KEY` | If using SendGrid | - | API key from sendgrid.com |
| `SMTP_HOST` | If using SMTP | - | SMTP server hostname |
| `SMTP_PORT` | If using SMTP | `587` | SMTP server port |
| `SMTP_SECURE` | If using SMTP | `false` | Use TLS/SSL (true for 465, false for 587) |
| `SMTP_USER` | If using SMTP | - | SMTP username |
| `SMTP_PASS` | If using SMTP | - | SMTP password |

---

## Troubleshooting

### "Failed to send email" in logs

**Check:**
1. Is `EMAIL_PROVIDER` set correctly?
2. Are the API keys/credentials valid?
3. Is the sender email verified?
4. Check the error message in logs for specific details

### Email not reaching inbox

**Check:**
1. Email in spam folder?
2. Sender domain not verified (common with Resend)
3. API rate limits reached?
4. Check email provider's activity log

### Authentication errors

**Check:**
1. Verify API keys are correct (no extra spaces)
2. Verify credentials match the provider
3. Check if API key has correct permissions

---

## Production Deployment

### Vercel

1. Go to your Vercel project settings
2. Add environment variables in Settings → Environment Variables
3. Select which environments they apply to (Production, Preview, Development)
4. Redeploy your application

### Other Platforms

Consult your platform's documentation for setting environment variables:

- **Netlify**: Site Settings → Build & Deploy → Environment
- **Railway**: Variables in the environment
- **Heroku**: Config Vars in settings
- **AWS Amplify**: App Settings → Environment Variables

---

## Future Enhancements

Possible additions for Phase 6.5:

1. **Database Storage** - Save submissions to PostgreSQL/Supabase
2. **CRM Integration** - Sync to HubSpot, Pipedrive, Salesforce
3. **Slack Notifications** - Alert team in Slack
4. **Webhook Triggers** - Call external services
5. **Email Templates** - Design custom HTML templates
6. **Multi-language** - Support multiple languages

---

## Support

For issues or questions:

1. Check the [sendIntakeEmail.ts](../lib/email/sendIntakeEmail.ts) source code
2. Check the API route at [app/api/services/intake/route.ts](../app/api/services/intake/route.ts)
3. Review logs in your deployment platform
4. Check the email provider's documentation
