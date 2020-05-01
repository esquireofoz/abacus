// Empty export forces file to be a module which TS requires with its current
// config. Note: This can be removed once something is being imported.
export {}

jest.setTimeout(60000)

describe('Experiments', () => {
  beforeAll(async () => {
    await page.goto('http://a8c-abacus-local:3000')
  })

  it('should display "Abacus - Testing" text on page from WordPress.com.', async () => {
    // This is because we expect that the user has not authenticated yet and they
    // should be redirected to the WP.com log-in page.
    expect(page.url()).toMatch(/^https:\/\/wordpress.com\/log-in/)
    await expect(page).toMatch('Abacus - Testing')
  })
})
