
import { expect } from "@playwright/test"


export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.inputFirstName = page.getByPlaceholder('first name')
        this.inputLastName = page.getByPlaceholder('last name')
        this.inputStreetName = page.getByPlaceholder('street')
        this.inputPostCode = page.getByPlaceholder('post code')
        this.inputCityName = page.getByPlaceholder('city')
        this.dropdownCountry = page.locator('[data-qa="country-dropdown"]')
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.saveAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.saveAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.saveAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.saveAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.saveAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.saveAddressCountry = page.locator('[data-qa="saved-address-country"]')

    }

    fillDetails = async (userAddress) => {

        await this.inputFirstName.waitFor()
        await this.inputFirstName.fill(userAddress.firstName)

        await this.inputLastName.waitFor()
        await this.inputLastName.fill(userAddress.lastName)

        await this.inputStreetName.waitFor()
        await this.inputStreetName.fill(userAddress.street)

        await this.inputPostCode.waitFor()
        await this.inputPostCode.fill(userAddress.postcode)

        await this.inputCityName.waitFor()
        await this.inputCityName.fill(userAddress.city)

        await this.dropdownCountry.waitFor()
        await this.dropdownCountry.selectOption(userAddress.country)

        // await this.page.pause()


    }
    
    saveDetails = async () => {
        // count how many saved addresses
        const addressCounterBeforeSaving = await this.saveAddressContainer.count()

        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()

        await expect(this.saveAddressContainer).toHaveCount(addressCounterBeforeSaving + 1)

        await this.saveAddressFirstName.first().waitFor()
        expect(await this.saveAddressFirstName.first().innerText()).toBe(await this.inputFirstName.inputValue())

        await this.saveAddressLastName.first().waitFor()
        expect(await this.saveAddressLastName.first().innerText()).toBe(await this.inputLastName.inputValue())

        await this.saveAddressStreet.first().waitFor()
        expect(await this.saveAddressStreet.first().innerText()).toBe(await this.inputStreetName.inputValue())

        await this.saveAddressPostcode.first().waitFor()
        expect(await this.saveAddressPostcode.first().innerText()).toBe(await this.inputPostCode.inputValue())

        await this.saveAddressCity.first().waitFor()
        expect(await this.saveAddressCity.first().innerText()).toBe(await this.inputCityName.inputValue())

        await this.saveAddressCountry.first().waitFor()
        expect(await this.saveAddressCountry.first().innerText()).toBe(await this.dropdownCountry.inputValue())

        // await this.page.pause()
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000})
        // await this.page.pause()


    }
}

