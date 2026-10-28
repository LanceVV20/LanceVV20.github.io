// Test cases and bug reports for the SauceDemo case study.
// Every entry here is backed by a Playwright test in automation/tests.

const REPO = 'https://github.com/LanceVV20/LanceVV20.github.io/blob/main/automation/tests/';

const TEST_CASES = [
  { id: 'TC-001', module: 'Login', type: 'Functional', priority: 'High', title: 'Standard user can log in', expected: 'User lands on the Products page', file: 'login.spec.ts' },
  { id: 'TC-002', module: 'Login', type: 'Negative', priority: 'High', title: 'Locked out user sees an error', expected: '"Sorry, this user has been locked out." is shown', file: 'login.spec.ts' },
  { id: 'TC-003', module: 'Login', type: 'Negative', priority: 'High', title: 'Wrong password is rejected', expected: '"Username and password do not match" is shown', file: 'login.spec.ts' },
  { id: 'TC-004', module: 'Login', type: 'Validation', priority: 'Medium', title: 'Username is required', expected: '"Username is required" is shown', file: 'login.spec.ts' },
  { id: 'TC-005', module: 'Login', type: 'Validation', priority: 'Medium', title: 'Password is required', expected: '"Password is required" is shown', file: 'login.spec.ts' },
  { id: 'TC-006', module: 'Login', type: 'Security', priority: 'High', title: 'Inventory is protected when logged out', expected: 'Direct URL access redirects to login with an error', file: 'login.spec.ts' },
  { id: 'TC-007', module: 'Login', type: 'Functional', priority: 'Medium', title: 'User can log out', expected: 'User is returned to the login page', file: 'login.spec.ts' },
  { id: 'TC-008', module: 'Inventory', type: 'Functional', priority: 'High', title: 'Shows six products', expected: 'Six product cards are rendered', file: 'inventory.spec.ts' },
  { id: 'TC-009', module: 'Inventory', type: 'Functional', priority: 'Medium', title: 'Sort by price, low to high', expected: 'Prices are in ascending order', file: 'inventory.spec.ts' },
  { id: 'TC-010', module: 'Inventory', type: 'Functional', priority: 'Medium', title: 'Sort by price, high to low', expected: 'Prices are in descending order', file: 'inventory.spec.ts' },
  { id: 'TC-011', module: 'Inventory', type: 'Functional', priority: 'Medium', title: 'Sort by name, Z to A', expected: 'Names are in reverse alphabetical order', file: 'inventory.spec.ts' },
  { id: 'TC-012', module: 'Inventory', type: 'UI', priority: 'Medium', title: 'Every product has a unique image', expected: 'No two products share an image', file: 'inventory.spec.ts' },
  { id: 'TC-013', module: 'Cart', type: 'Functional', priority: 'High', title: 'Adding items updates the cart badge', expected: 'Badge counts 1, then 2', file: 'cart.spec.ts' },
  { id: 'TC-014', module: 'Cart', type: 'Functional', priority: 'High', title: 'Removing an item updates the cart badge', expected: 'Badge disappears when cart is empty', file: 'cart.spec.ts' },
  { id: 'TC-015', module: 'Cart', type: 'Functional', priority: 'Medium', title: 'Cart keeps items after a page reload', expected: 'Badge still shows 1 after reload', file: 'cart.spec.ts' },
  { id: 'TC-016', module: 'Cart', type: 'Functional', priority: 'High', title: 'Cart page lists added items', expected: 'Both added products are listed', file: 'cart.spec.ts' },
  { id: 'TC-017', module: 'Checkout', type: 'E2E', priority: 'Critical', title: 'Complete a purchase end to end', expected: '"Thank you for your order!" and the cart is emptied', file: 'checkout.spec.ts' },
  { id: 'TC-018', module: 'Checkout', type: 'Functional', priority: 'Critical', title: 'Order total equals subtotal plus tax', expected: 'Subtotal is $45.98 and total = subtotal + tax', file: 'checkout.spec.ts' },
  { id: 'TC-019', module: 'Checkout', type: 'Validation', priority: 'High', title: 'First name is required', expected: '"First Name is required" is shown', file: 'checkout.spec.ts' },
  { id: 'TC-020', module: 'Checkout', type: 'Validation', priority: 'High', title: 'Last name is required', expected: '"Last Name is required" is shown', file: 'checkout.spec.ts' },
  { id: 'TC-021', module: 'Checkout', type: 'Validation', priority: 'High', title: 'Postal code is required', expected: '"Postal Code is required" is shown', file: 'checkout.spec.ts' },
];

const BUGS = [
  {
    id: 'BUG-001', title: 'All products show the same image', severity: 'Major', priority: 'High', module: 'Inventory', user: 'problem_user',
    steps: ['Log in as problem_user', 'Look at the product images on the Products page'],
    expected: 'Each product shows its own photo.',
    actual: 'All six products show the same dog photo, so the images no longer match the products.',
    impact: 'Shoppers can\'t visually confirm what they\'re buying.',
  },
  {
    id: 'BUG-002', title: 'Sorting products has no effect', severity: 'Minor', priority: 'Medium', module: 'Inventory', user: 'problem_user',
    steps: ['Log in as problem_user', 'Open the sort dropdown', 'Choose "Name (Z to A)"'],
    expected: 'Products re-order from Z to A.',
    actual: 'The list stays in its default A to Z order. "Sauce Labs Backpack" is still first.',
    impact: 'Users can\'t browse by name or price.',
  },
  {
    id: 'BUG-003', title: 'Add to cart does nothing for the Bolt T-Shirt', severity: 'Critical', priority: 'High', module: 'Cart', user: 'problem_user',
    steps: ['Log in as problem_user', 'Click "Add to cart" on Sauce Labs Bolt T-Shirt'],
    expected: 'The cart badge shows 1 and the button changes to "Remove".',
    actual: 'Nothing happens. No badge appears and the item is not added.',
    impact: 'Lost sale: the product cannot be purchased.',
  },
  {
    id: 'BUG-004', title: 'Typing a last name overwrites the first name', severity: 'Critical', priority: 'High', module: 'Checkout', user: 'problem_user',
    steps: ['Log in as problem_user and add any item to the cart', 'Go to Cart → Checkout', 'Type "Juntue" in First Name', 'Type "Dela Fuente" in Last Name'],
    expected: 'First Name = "Juntue", Last Name = "Dela Fuente".',
    actual: 'First Name becomes "Dela Fuente" and Last Name stays empty.',
    impact: 'Blocks checkout: the form can never be filled in correctly.',
  },
  {
    id: 'BUG-005', title: 'Login takes over 5 seconds', severity: 'Major', priority: 'Medium', module: 'Login', user: 'performance_glitch_user',
    steps: ['Open the login page', 'Log in as performance_glitch_user', 'Measure time until the Products page renders'],
    expected: 'Products page loads in under 3 seconds.',
    actual: 'Measured about 5.1 seconds from clicking Login to the Products page rendering.',
    impact: 'Slow first impression; likely drop-off and failed timeouts on slow networks.',
  },
  {
    id: 'BUG-006', title: 'Finish button does not complete the order', severity: 'Blocker', priority: 'Highest', module: 'Checkout', user: 'error_user',
    steps: ['Log in as error_user and add any item to the cart', 'Go through Checkout: Your Information → Continue', 'Click "Finish" on the overview page'],
    expected: 'The order is placed and "Thank you for your order!" is shown.',
    actual: 'The page stays on Checkout: Overview. No confirmation is shown.',
    impact: 'No orders can be completed. Revenue-blocking.',
  },
  {
    id: 'BUG-007', title: 'Last name is ignored, yet checkout continues without it', severity: 'Major', priority: 'High', module: 'Checkout', user: 'error_user',
    steps: ['Log in as error_user and add any item to the cart', 'Go to Cart → Checkout', 'Fill in First Name, Last Name and Postal Code', 'Click Continue'],
    expected: 'Last Name keeps the typed value; if empty, "Last Name is required" is shown.',
    actual: 'Last Name stays empty, but the user is still taken to the Overview step.',
    impact: 'Required-field validation is bypassed, and orders are saved with missing customer data.',
  },
];
