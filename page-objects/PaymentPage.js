import { expect } from '@playwright/test'


export class PaymentPage {
    constructor(page) {
        this.page = page

        this.inputCreditCardOwner = page.getByPlaceholder('Credit card owner')
        this.inputCreditCardNumber = page.getByPlaceholder('Credit card number')
        this.inputValidation = page.getByPlaceholder('Valid until')
        this.inputCVC = page.getByPlaceholder('Credit card CVC')
        this.payButton = page.getByRole('button', { name: 'Pay' })


        // discount activate message
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')

        // total amount in basket
        this.totalAmount = page.locator('[data-qa="total-value"]')

        // total amount after discount
        this.amountAfterDiscount = page.locator('[data-qa="total-with-discount-value"]')
        
        // frameLocator is how you locate iframe elements
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')

        // element for discount input
        this.inputDiscountCode = page.getByPlaceholder('Discount code')

        // element for discount submit button
        this.submitDiscountButton = page.getByRole('button', { name: 'Submit discount' })
    }

activateDiscount = async () => {

    await this.discountCode.waitFor()

    // inner text is a playwright function which requires await
    const code = await this.discountCode.innerText()

    // need to fil out the discount input
    await this.inputDiscountCode.waitFor()
    await this.inputDiscountCode.fill(code)

    // wait to see that the input contains the value which was entered
    await expect(this.inputDiscountCode).toHaveValue(code)

    // make sure discount activated message is not showing before the click
    expect(await this.amountAfterDiscount.isVisible()).toBe(false)
    expect(await this.discountActivatedMessage.isVisible()).toBe(false)  // can also use isVisible() function

    // hit submit button for discount code
    await this.submitDiscountButton.waitFor()
    await this.submitDiscountButton.click()

    // // option 2 for laggy inputs: slow typing
    // await this.inputDiscountCode.focus()
    // await this.page.keyboard.type(code, {delay: 1000})
    // expect(await this.inputDiscountCode.inputValue()).toBe(code)

    // // // additional keyboard functions
    // await this.page.keyboard.down("Control")
    // await this.page.keyboard.type('c')
    // await this.page.keyboard.up('control')

    // check that if display "discount activated" showing
    await this.discountActivatedMessage.waitFor()
    await expect(this.discountActivatedMessage).toHaveText('Discount activated!')

    // check that there is now a discounted price total showing
    await this.amountAfterDiscount.waitFor()
    const discountValue = await this.amountAfterDiscount.innerText() // "345$"
    // get rid of $ sign
    const discountValueNum = discountValue.replace('$', '')
    // converts numbers to int
    const discountValueNumConverted = parseInt(discountValueNum, 10)


    await this.totalAmount.waitFor()
    const totalAmount = await this.totalAmount.innerText() 
    const totalAmountNum = totalAmount.replace('$', '')
    const actualAmountConvereted = parseInt(totalAmountNum, 10)
    // expect the amount to be discounted for the discounted total amount
    await expect(discountValueNumConverted).toBeLessThan(actualAmountConvereted)


    }

    fillPaymentDetails = async (paymentDetails) => {

        await this.inputCreditCardOwner.waitFor()
        await this.inputCreditCardOwner.fill(paymentDetails.cardName)

        await this.inputCreditCardNumber.waitFor()
        await this.inputCreditCardNumber.fill(paymentDetails.cardNumber)

        await this.inputValidation.waitFor()
        await this.inputValidation.fill(paymentDetails.cardDate)

        await this.inputCVC.waitFor()
        await this.inputCVC.fill(paymentDetails.cardCVC)

        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank/, { timeout: 3000})

    }

}