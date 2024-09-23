import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "./../utils/isDesktopViewport.js"

export class ProductsPage {
    // This is using constructor function to pull page function from playwright in main spec script
    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {                   // async requires a promise, like a problem needs to be solved.
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {             // index is whatever the index input is from script
        const specificAddButton = this.addButtons.nth(index)

        // Adds first 3 products to basket, checks button text
        await specificAddButton.waitFor()                   // nth indicates range of index
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        // only desktop viewport
        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount()
        }
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        // only desktop viewport
        if (isDesktopViewport(this.page)) {
        const basketCountAfterAdding = await navigation.getBasketCount()
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
        
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()

        // get order of products
        await this.productTitle.first().waitFor()
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()

        // selectOption takes the values under the drop down and selects it
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)

        // get order of products

        // expect that these lists are different

        // await this.page.pause()
    }

}