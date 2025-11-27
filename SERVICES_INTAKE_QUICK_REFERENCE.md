# Services Intake System — Quick Reference Guide

**For:** Engineers integrating intake form features
**Status:** Production Ready
**Last Updated:** November 23, 2024

---

## 🚀 Quick Start

### View the Form Live

Navigate to `/services` on your local dev server. Scroll to the **"Ready to Start?"** section to see the intake form.

### API Endpoint

```
POST /api/services/intake
Content-Type: application/json

Body:
{
  "name": string (required),
  "email": string (required),
  "company": string (optional),
  "serviceType": string (required),
  "budget": string (optional),
  "timeline": string (optional),
  "description": string (required, min 20 chars),
  "source": string (optional)
}

Response (201):
{
  "success": true,
  "message": "Services intake form submitted successfully",
  "data": {
    "id": "si_...",
    "email": "...",
    "serviceType": "...",
    "submittedAt": "2024-11-23T..."
  }
}
```

---

## 📁 File Structure

```
app/
├── components/
│   ├── ui/
│   │   ├── FormInput.tsx ✨ NEW
│   │   ├── FormTextarea.tsx ✨ NEW
│   │   └── FormSelect.tsx ✨ NEW
│   └── sections/
│       └── services/
│           ├── ServicesIntakeForm.tsx ✨ NEW
│           └── ServiceIntakeCTA.tsx ✨ NEW
├── api/
│   └── services/
│       └── intake/
│           └── route.ts ✨ NEW
└── services/
    └── page.tsx (UPDATED)

lib/
└── hooks/
    └── useScrollTo.ts ✨ NEW
```

---

## 🧩 Component Usage

### FormInput

```tsx
import { FormInput } from '@/components/ui/FormInput'

<FormInput
  id="email"
  name="email"
  type="email"
  label="Email Address"
  placeholder="your@email.com"
  value={email}
  onChange={handleChange}
  error={errors.email}
  required
  helperText="We'll never share your email"
/>
```

**Props:**
- `label?: string` — Field label
- `error?: string` — Error message
- `required?: boolean` — Show required indicator
- `helperText?: string` — Helper text below field
- All standard HTML input props

### FormTextarea

```tsx
import { FormTextarea } from '@/components/ui/FormTextarea'

<FormTextarea
  id="description"
  name="description"
  label="Project Description"
  value={description}
  onChange={handleChange}
  error={errors.description}
  required
  rows={5}
/>
```

**Props:**
- `label?: string` — Field label
- `error?: string` — Error message
- `required?: boolean` — Show required indicator
- `helperText?: string` — Helper text below field
- All standard HTML textarea props

### FormSelect

```tsx
import { FormSelect } from '@/components/ui/FormSelect'

<FormSelect
  id="serviceType"
  name="serviceType"
  label="Service Type"
  value={serviceType}
  onChange={handleChange}
  error={errors.serviceType}
  required
  placeholder="Select a service"
  options={[
    { value: 'product-development', label: 'AI-Accelerated Product Development' },
    { value: 'consultation', label: 'AI Strategy & Systems Consultation' },
  ]}
/>
```

**Props:**
- `label?: string` — Field label
- `error?: string` — Error message
- `required?: boolean` — Show required indicator
- `helperText?: string` — Helper text below field
- `options: { value: string; label: string }[]` — Select options
- `placeholder?: string` — Placeholder option text
- All standard HTML select props

### useScrollTo Hook

```tsx
import { useScrollTo } from '@/lib/hooks/useScrollTo'

const scrollTo = useScrollTo()

// In event handler:
scrollTo('form-section', {
  behavior: 'smooth',
  block: 'start'
})
```

**Options:**
- `behavior?: 'smooth' | 'auto'` (default: 'smooth')
- `block?: 'start' | 'center' | 'end' | 'nearest'` (default: 'start')
- `inline?: 'start' | 'center' | 'end' | 'nearest'` (default: 'nearest')

---

## 📊 Analytics Events

### Events Fired

| Event | When | Properties |
|-------|------|-----------|
| `services_intake_viewed` | Form section comes into view | `section: 'services_intake'` |
| `services_intake_submitted` | Form submitted successfully | `serviceType`, `source: 'services_page'` |
| `services_intake_error` | Form submission fails | `error: string` |

### Track Custom Event

```typescript
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'event_name', {
    property: 'value'
  })
}
```

---

## ✅ Form Field Validation

### Client-Side Rules

| Field | Required | Rules |
|-------|----------|-------|
| Name | Yes | Non-empty |
| Email | Yes | Valid email pattern |
| Company | No | — |
| Service Type | Yes | Must be selected |
| Budget | No | — |
| Timeline | No | — |
| Description | Yes | Min 20 characters |

### Error Messages

```typescript
const errors = {
  name: 'Name is required',
  email: 'Please enter a valid email address',
  serviceType: 'Please select a service type',
  description: 'Description must be at least 20 characters'
}
```

---

## 🔌 Adding to Your Page

### 1. Import Component

```tsx
import ServiceIntakeCTA from '@/components/sections/services/ServiceIntakeCTA'
```

### 2. Add to Page

```tsx
<ServiceIntakeCTA
  id="my-intake-section" // optional custom ID
/>
```

### 3. Style Section

The component handles its own styling. It includes:
- Full dark mode support
- Responsive padding
- Proper spacing

---

## 🎨 Customization

### Change Form Field Validation

Edit `ServicesIntakeForm.tsx`:

```tsx
const validateForm = (): boolean => {
  const newErrors: FormErrors = {}

  // Add your custom validation here
  if (formData.name.length < 3) {
    newErrors.name = 'Name must be at least 3 characters'
  }

  return Object.keys(newErrors).length === 0
}
```

### Add New Form Field

1. Add to `FormData` interface:
```tsx
interface FormData {
  // ... existing fields
  phone?: string
}
```

2. Add to form JSX:
```tsx
<FormInput
  id="phone"
  name="phone"
  type="tel"
  label="Phone Number"
  value={formData.phone}
  onChange={handleChange}
/>
```

3. Include in API request:
```tsx
body: JSON.stringify({
  ...formData,
  phone: formData.phone,
  source: 'services_page',
})
```

### Change Service Type Options

Edit `ServicesIntakeForm.tsx`:

```tsx
<FormSelect
  id="serviceType"
  options={[
    { value: 'custom-1', label: 'Your Custom Service 1' },
    { value: 'custom-2', label: 'Your Custom Service 2' },
  ]}
  // ... rest of props
/>
```

### Change Budget/Timeline Options

Edit the respective `FormSelect` components in `ServicesIntakeForm.tsx`.

---

## 🧪 Testing

### Manual Testing Checklist

```
✓ Form field visibility on desktop/mobile
✓ Form submission with valid data
✓ Error messages display correctly
✓ Success message shows after submission
✓ Form clears after successful submission
✓ Network error is handled gracefully
✓ Dark mode rendering is correct
✓ Form is keyboard accessible (Tab, Enter)
✓ Analytics events fire correctly
```

### Unit Test Example (Jest + React Testing Library)

```tsx
import { render, screen, userEvent } from '@testing-library/react'
import ServicesIntakeForm from '@/components/sections/services/ServicesIntakeForm'

describe('ServicesIntakeForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<ServicesIntakeForm />)

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.selectOption(screen.getByLabelText(/service type/i), 'product-development')
    await user.type(screen.getByLabelText(/project description/i), 'This is a detailed project description')

    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Assert API call
    expect(fetch).toHaveBeenCalledWith('/api/services/intake', expect.any(Object))
  })
})
```

---

## 🔒 Security Notes

### Input Validation

- ✅ Email regex validation (client & server)
- ✅ Minimum length validation for description
- ✅ Required field checks
- ⚠️ TODO: Add rate limiting to prevent spam

### Data Storage

- ✅ Form data not logged in plaintext
- ⚠️ TODO: Encrypt sensitive fields in database
- ⚠️ TODO: Implement data retention policy

### API Security

- ⚠️ TODO: Add CORS headers
- ⚠️ TODO: Add rate limiting
- ⚠️ TODO: Implement request signing/verification

---

## 🐛 Troubleshooting

### Form Not Appearing

Check that:
1. `/services` page exists
2. `ServiceIntakeCTA` is imported
3. Component is rendered in JSX
4. No CSS conflicts hiding form

### API 400 Error

Check:
- Email format is valid
- Name is not empty
- Service type is selected
- Description is at least 20 characters

### Analytics Not Tracking

Check:
- Google Analytics script is loaded
- `gtag` function exists on window
- Event name is correct
- No ad blockers blocking analytics

### Form Not Submitting

Check:
- Network tab shows POST request
- Form data is being sent
- No JS errors in console
- API endpoint is accessible

---

## 📞 Support

### Common Questions

**Q: How do I customize the form fields?**
A: Edit the form JSX in `ServicesIntakeForm.tsx` and update the API schema accordingly.

**Q: Can I add a phone number field?**
A: Yes, follow the "Add New Form Field" section above.

**Q: How do I integrate with email/CRM?**
A: See the "Production TODOs" section in `SERVICES_INTAKE_ENGINEERING_SPEC.md`.

**Q: Can I reuse FormInput/FormSelect elsewhere?**
A: Absolutely! These are intentionally generic and reusable. Use them in any form on the site.

---

## 📚 Further Reading

- Full spec: `SERVICES_INTAKE_ENGINEERING_SPEC.md`
- Form components: `app/components/ui/Form*.tsx`
- API route: `app/api/services/intake/route.ts`
- Main form component: `app/components/sections/services/ServicesIntakeForm.tsx`

---

**Last Updated:** November 23, 2024
**Status:** Production Ready
**Maintained By:** Engineering Team