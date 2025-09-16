# Event tracking report

This document lists all PostHog events that have been automatically added to your Next.js application.

## Events by File

### src/components/human-design-form/human-design-form.tsx

- **chart_calculation_submitted**: Fired when a user submits the form to calculate their human design chart.
- **chart_calculation_failed**: Fired when the chart calculation API call fails or another error occurs during form submission.

### src/hooks/use-paddle.tsx

- **paddle_checkout_completed**: Fired when a user successfully completes a Paddle checkout process.

### src/components/pricing/plans.tsx

- **pricing_plan_selected**: Fired when a user selects a different pricing plan from the dropdown.
- **checkout_button_clicked**: Fired when a user clicks the main 'Checkout' button to proceed to payment.

### src/app/checkout_redirect/success/page.tsx

- **return-to-app-clicked**: Fired when a user clicks the 'Return to app' link on the checkout success page.

### src/components/ui/button.tsx

- **ui-button-clicked**: Fired when a user clicks on any instance of the reusable Button component. Captures properties like variant, size, and the button's text.

## Events still awaiting implementation

- (human: you can fill these in)

---

## Next Steps

1. Review the changes made to your files
2. Test that events are being captured correctly
3. Create insights and dashboards in PostHog
4. Make a list of events we missed above. Knock them out yourself, or give this file to an agent.

Learn more about what to measure with PostHog and why: https://posthog.com/docs/new-to-posthog/getting-hogpilled
