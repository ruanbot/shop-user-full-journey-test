

export class RegisterPage {
    constructor(page) {
        this.page = page

        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', { name: 'register'})

    }

    signUpAsNewUser = async (email, password) => {

        // type into email input
        await this.emailInput.waitFor()
        
        // generates random email
        // const emailId = uuidv4()
        // const email = emailId + "@gmail.com" // afec-123c232@gmail.com
        await this.emailInput.fill(email)

        // type into password input
        await this.passwordInput.waitFor()

        // generates random password
        // const password = uuidv4()
        await this.passwordInput.fill(password)

        // click register button
        await this.registerButton.waitFor()
        await this.registerButton.click()


    }
}