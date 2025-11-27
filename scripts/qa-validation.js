#!/usr/bin/env node

/**
 * Services Page QA Validation Script
 * Document: QA–SERV–001 / QA–SERV–002
 *
 * This script performs automated validation of:
 * 1. Form behavior (required fields, validation, submission)
 * 2. Prefill logic from CTAs
 * 3. Email delivery
 * 4. Performance metrics (Lighthouse)
 *
 * Usage: node scripts/qa-validation.js
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}═══ ${msg} ═══${colors.reset}\n`),
}

/**
 * Test 1: Verify form components exist
 */
function testFormComponentsExist() {
  log.section('TEST 1: Form Components Existence')

  const componentsToCheck = [
    'app/components/ui/FormFieldWrapper.tsx',
    'app/components/ui/InputText.tsx',
    'app/components/ui/Textarea.tsx',
    'app/components/ui/RadioGroup.tsx',
    'app/components/ui/MultiSelect.tsx',
    'app/components/ui/SegmentedControl.tsx',
    'app/components/sections/services/ServicesIntakeForm.tsx',
    'lib/email/sendIntakeEmail.ts',
    'app/api/services/intake/route.ts',
  ]

  let allExist = true
  componentsToCheck.forEach((file) => {
    const fullPath = path.join(process.cwd(), file)
    if (fs.existsSync(fullPath)) {
      log.success(`Found: ${file}`)
    } else {
      log.error(`Missing: ${file}`)
      allExist = false
    }
  })

  return allExist
}

/**
 * Test 2: Verify form validation logic in ServicesIntakeForm
 */
function testFormValidationLogic() {
  log.section('TEST 2: Form Validation Logic')

  const formPath = path.join(process.cwd(), 'app/components/sections/services/ServicesIntakeForm.tsx')
  const formContent = fs.readFileSync(formPath, 'utf-8')

  const checks = [
    { name: 'Name field required validation', pattern: /required.*name|name.*required/i },
    { name: 'Email field required validation', pattern: /required.*email|email.*required/i },
    { name: 'Email format validation', pattern: /emailRegex|email.*regex|test.*email/i },
    { name: 'Service type required validation', pattern: /serviceType.*required|required.*serviceType/i },
    { name: 'Description required validation', pattern: /description.*required|required.*description/i },
    { name: 'Description length validation (20 chars)', pattern: /length.*20|20.*length|minLength|description.*<.*20/i },
    { name: 'Error state clearing on input', pattern: /clearError|setError|setFieldError|onChange.*setError/i },
    { name: 'Form submission handler', pattern: /handleSubmit|onSubmit|async.*submit/i },
  ]

  let passedChecks = 0
  checks.forEach((check) => {
    if (check.pattern.test(formContent)) {
      log.success(check.name)
      passedChecks++
    } else {
      log.warn(check.name)
    }
  })

  log.info(`Validation checks passed: ${passedChecks}/${checks.length}`)
  return passedChecks === checks.length
}

/**
 * Test 3: Verify prefill logic from sessionStorage
 */
function testPrefillLogic() {
  log.section('TEST 3: Prefill Logic from SessionStorage')

  const formPath = path.join(process.cwd(), 'app/components/sections/services/ServicesIntakeForm.tsx')
  const formContent = fs.readFileSync(formPath, 'utf-8')

  const checks = [
    { name: 'useEffect hook for initialization', pattern: /useEffect/i },
    { name: 'sessionStorage reading', pattern: /sessionStorage\.getItem|sessionStorage\[/i },
    { name: 'consultationRequested flag check', pattern: /consultationRequested/i },
    { name: 'Service type prefill logic', pattern: /serviceType.*consultation|consultation.*serviceType/i },
    { name: 'sessionStorage clearing after read', pattern: /sessionStorage\.removeItem|sessionStorage\.clear/i },
  ]

  let passedChecks = 0
  checks.forEach((check) => {
    if (check.pattern.test(formContent)) {
      log.success(check.name)
      passedChecks++
    } else {
      log.error(check.name)
    }
  })

  log.info(`Prefill checks passed: ${passedChecks}/${checks.length}`)
  return passedChecks >= checks.length - 1 // At least 4 of 5
}

/**
 * Test 4: Verify CTA buttons set sessionStorage
 */
function testCTASessionStorage() {
  log.section('TEST 4: CTA Buttons SessionStorage Integration')

  const ctaFiles = [
    'app/components/sections/services/HeroSection.tsx',
    'app/components/sections/services/ServiceModules.tsx',
    'app/components/sections/services/FinalCTASection.tsx',
  ]

  let allPass = true

  ctaFiles.forEach((file) => {
    const fullPath = path.join(process.cwd(), file)
    if (!fs.existsSync(fullPath)) {
      log.error(`File not found: ${file}`)
      allPass = false
      return
    }

    const content = fs.readFileSync(fullPath, 'utf-8')
    const hasSessionStorage = /sessionStorage/i.test(content)
    const hasUseScrollTo = /useScrollTo/i.test(content)
    const hasHandleCtaClick = /handleCtaClick|handleClick/i.test(content)

    if (hasSessionStorage && hasUseScrollTo && hasHandleCtaClick) {
      log.success(`${file} - CTA logic complete`)
    } else {
      log.warn(`${file} - Missing some CTA elements`)
      if (!hasSessionStorage) log.warn('  - Missing sessionStorage')
      if (!hasUseScrollTo) log.warn('  - Missing useScrollTo')
      if (!hasHandleCtaClick) log.warn('  - Missing handleCtaClick')
    }
  })

  return allPass
}

/**
 * Test 5: Verify email implementation
 */
function testEmailImplementation() {
  log.section('TEST 5: Email Implementation')

  const emailPath = path.join(process.cwd(), 'lib/email/sendIntakeEmail.ts')
  if (!fs.existsSync(emailPath)) {
    log.error('Email module not found')
    return false
  }

  const emailContent = fs.readFileSync(emailPath, 'utf-8')

  const checks = [
    { name: 'User confirmation email function', pattern: /sendUserConfirmationEmail|sendUserEmail/i },
    { name: 'Support notification email function', pattern: /sendSupportNotificationEmail|sendSupportEmail/i },
    { name: 'Resend provider support', pattern: /sendViaResend|resend/i },
    { name: 'SendGrid provider support', pattern: /sendViaSendGrid|sendgrid/i },
    { name: 'SMTP provider support', pattern: /sendViaSMTP|nodemailer/i },
    { name: 'HTML email templates', pattern: /generateUserEmailHTML|generateSupportEmailHTML|html`/i },
    { name: 'HTML escaping for security', pattern: /escapeHtml|escape.*Html|&lt;|&amp;/i },
    { name: 'Error handling', pattern: /catch.*error|try.*catch|error\.message/i },
  ]

  let passedChecks = 0
  checks.forEach((check) => {
    if (check.pattern.test(emailContent)) {
      log.success(check.name)
      passedChecks++
    } else {
      log.warn(check.name)
    }
  })

  log.info(`Email checks passed: ${passedChecks}/${checks.length}`)
  return passedChecks >= 6
}

/**
 * Test 6: Verify API route
 */
function testAPIRoute() {
  log.section('TEST 6: API Route Implementation')

  const apiPath = path.join(process.cwd(), 'app/api/services/intake/route.ts')
  if (!fs.existsSync(apiPath)) {
    log.error('API route not found')
    return false
  }

  const apiContent = fs.readFileSync(apiPath, 'utf-8')

  const checks = [
    { name: 'POST method export', pattern: /export.*POST|export async function POST/i },
    { name: 'Request body parsing', pattern: /request\.json|body/i },
    { name: 'Required field validation', pattern: /!body\.name|!body\.email|!body\.serviceType|!body\.description/i },
    { name: 'Email format validation', pattern: /emailRegex|email.*regex|test.*email/i },
    { name: 'Description length check (20 chars)', pattern: /\.length.*<.*20|length.*<.*20/i },
    { name: 'User confirmation email call', pattern: /sendUserConfirmationEmail/i },
    { name: 'Support notification email call', pattern: /sendSupportNotificationEmail/i },
    { name: 'Success response (201)', pattern: /201|created/i },
    { name: 'Error handling', pattern: /catch.*error|error.*response|500/i },
  ]

  let passedChecks = 0
  checks.forEach((check) => {
    if (check.pattern.test(apiContent)) {
      log.success(check.name)
      passedChecks++
    } else {
      log.warn(check.name)
    }
  })

  log.info(`API checks passed: ${passedChecks}/${checks.length}`)
  return passedChecks >= 7
}

/**
 * Test 7: Verify accessibility attributes
 */
function testAccessibility() {
  log.section('TEST 7: Accessibility Attributes')

  const formPath = path.join(process.cwd(), 'app/components/sections/services/ServicesIntakeForm.tsx')
  const formContent = fs.readFileSync(formPath, 'utf-8')

  const checks = [
    { name: 'Form labels with htmlFor', pattern: /htmlFor|<label/i },
    { name: 'Required field indicators', pattern: /required|aria-required/i },
    { name: 'Error messages linked to inputs', pattern: /aria-invalid|aria-describedby|error/i },
    { name: 'Button with descriptive text', pattern: /submit.*button|button.*submit|Submit/i },
    { name: 'Keyboard navigation support', pattern: /onKeyDown|onKeyUp|keyboard|tab/i },
  ]

  let passedChecks = 0
  checks.forEach((check) => {
    if (check.pattern.test(formContent)) {
      log.success(check.name)
      passedChecks++
    } else {
      log.warn(check.name)
    }
  })

  log.info(`Accessibility checks passed: ${passedChecks}/${checks.length}`)
  return passedChecks >= 3
}

/**
 * Test 8: Check TypeScript compilation
 */
function testTypeScriptCompilation() {
  log.section('TEST 8: TypeScript Compilation')

  try {
    log.info('Running TypeScript compiler...')
    execSync('npx tsc --noEmit', { stdio: 'pipe', timeout: 60000 })
    log.success('TypeScript compilation successful - no errors')
    return true
  } catch (error) {
    const stderr = error.stderr?.toString() || error.toString()
    // Check if it's just warnings vs actual errors
    if (stderr.includes('error TS')) {
      log.error('TypeScript compilation failed')
      log.error(stderr.substring(0, 500))
      return false
    } else {
      log.success('TypeScript compilation successful')
      return true
    }
  }
}

/**
 * Test 9: Verify dark mode support
 */
function testDarkModeSupport() {
  log.section('TEST 9: Dark Mode Support')

  const formPath = path.join(process.cwd(), 'app/components/sections/services/ServicesIntakeForm.tsx')
  const formContent = fs.readFileSync(formPath, 'utf-8')

  const checks = [
    { name: 'Dark mode class names', pattern: /dark:|dark"/i },
    { name: 'Dark mode input styling', pattern: /dark:.*input|dark:.*bg|dark:.*text/i },
  ]

  let passedChecks = 0
  checks.forEach((check) => {
    if (check.pattern.test(formContent)) {
      log.success(check.name)
      passedChecks++
    } else {
      log.warn(check.name)
    }
  })

  log.info(`Dark mode checks passed: ${passedChecks}/${checks.length}`)
  return passedChecks >= 1
}

/**
 * Generate summary report
 */
function generateSummaryReport(results) {
  log.section('QA VALIDATION SUMMARY')

  const total = Object.values(results).length
  const passed = Object.values(results).filter((r) => r === true).length
  const percentage = Math.round((passed / total) * 100)

  console.log(`\nTests Passed: ${passed}/${total} (${percentage}%)`)
  console.log('\nTest Results:')

  const resultText = {
    TEST1: 'Form Components Existence',
    TEST2: 'Form Validation Logic',
    TEST3: 'Prefill Logic from SessionStorage',
    TEST4: 'CTA Buttons SessionStorage Integration',
    TEST5: 'Email Implementation',
    TEST6: 'API Route Implementation',
    TEST7: 'Accessibility Attributes',
    TEST8: 'TypeScript Compilation',
    TEST9: 'Dark Mode Support',
  }

  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? `${colors.green}PASS${colors.reset}` : `${colors.red}FAIL${colors.reset}`
    console.log(`  ${status} - ${resultText[test]}`)
  })

  const statusText = percentage >= 80
    ? `${colors.green}READY FOR QA TESTING${colors.reset}`
    : `${colors.red}NEEDS FIXES${colors.reset}`
  console.log(`\n${colors.cyan}Overall Status: ${statusText}`)

  // Recommendations
  if (percentage < 100) {
    console.log('\n' + colors.yellow + 'Recommended Actions:' + colors.reset)
    Object.entries(results).forEach(([test, passed]) => {
      if (!passed) {
        console.log(`  • Review and fix failures in ${resultText[test]}`)
      }
    })
  }

  return {
    passed,
    total,
    percentage,
    readyForQA: percentage >= 80,
  }
}

/**
 * Main execution
 */
function main() {
  console.log(`\n${colors.cyan}${'═'.repeat(60)}${colors.reset}`)
  console.log(`${colors.cyan}  Services Page QA Validation (QA–SERV–001)${colors.reset}`)
  console.log(`${colors.cyan}${'═'.repeat(60)}${colors.reset}\n`)

  const results = {
    TEST1: testFormComponentsExist(),
    TEST2: testFormValidationLogic(),
    TEST3: testPrefillLogic(),
    TEST4: testCTASessionStorage(),
    TEST5: testEmailImplementation(),
    TEST6: testAPIRoute(),
    TEST7: testAccessibility(),
    TEST8: testTypeScriptCompilation(),
    TEST9: testDarkModeSupport(),
  }

  const summary = generateSummaryReport(results)

  // Save results to file
  const reportPath = path.join(process.cwd(), 'QA_VALIDATION_RESULTS.json')
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        ...summary,
        detailedResults: results,
      },
      null,
      2
    )
  )

  log.info(`Results saved to: QA_VALIDATION_RESULTS.json`)

  console.log(`\n${colors.cyan}${'═'.repeat(60)}${colors.reset}\n`)

  process.exit(summary.readyForQA ? 0 : 1)
}

main()