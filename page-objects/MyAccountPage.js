// implications between manually using login and injecting cookie to login is huge, injecting a cookie allows you to skip many steps to get into the intended page



export class MyAccountPage {
    constructor(page) {
        this.page = page
        this.myAccountHeader = page.getByRole('heading', { name: 'My Account' })

        this.errorMessage = page.locator('[data-qa="error-message"]')

    }

    visit = async () => {
        await this.page.goto("/my-account")
    }

    waitForPageHeader = async () => {
        await this.myAccountHeader.waitFor()
    }

    waitForErrorMessage = async () => {
        await this.errorMessage.waitFor()
    }
}
