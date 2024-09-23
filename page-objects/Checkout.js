import { expect } from "@playwright/test"


export class Checkout {
    constructor(page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
}
    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor() // more than one element for first() function
        const itemsBeforeRemoval = await this.basketCards.count() // function to count all 
        await this.basketItemPrice.first().waitFor()

        const allPricesTexts = await this.basketItemPrice.allInnerTexts() 

        // [ '499$', '599$', '320$' ] >> [ 499, 599, 320 ]
        const justNumbers = allPricesTexts.map((element) => {
            const withoutDollarSign = element.replace("$", "") // '499$' >> '499'
            return parseInt(withoutDollarSign, 10)

        })
        // javascript function for math, finding lowest value
        const smallestPrice = Math.min(...justNumbers)  

        // new variable to index the lowest number from smallestPrice, finding WHERE the lowest number is
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice)

        // new variable to simplify script
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIdx)

        // function to click on the smallest index of smallestPriceIdx
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()

        // check to see if basket have less than the basket item after removal
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)

    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()

        // timeout wait for 3 seconds instead of 30 seconds for faster fail results, also use regex101.com to find regular expressions to get direction to right link
        await this.page.waitForURL(/\/login/gm, {timeout: 3000})

    }


}