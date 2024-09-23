import { test, expect } from "@playwright/test" // Brackets are for importing only test function from playwright
import { ProductsPage } from "../page-objects/ProductsPage.js"

test.skip("Product Page Add to Basket", async ({ page }) => {
    // await page.goto("/")                                                                            // the "/" represents the root of the server

    // const addToBasketButton = page.locator('[data-qa="product-button"]').first()                    // onmly use first () if there is multiple elements of it
    // const basketCounter = page.locator('[data-qa="header-basket-count"]')

    // await addToBasketButton.waitFor()    
                                                            
    // await expect(addToBasketButton).toHaveText("Add to Basket") 
    // await expect(basketCounter).toHaveText("0")

    // await addToBasketButton.click()
    
    // await expect(addToBasketButton).toHaveText("Remove from Basket")  
    // await expect(basketCounter).toHaveText("1")
    
    // const checkoutLink = page.getByRole('link', { name: 'Checkout'})
    // await checkoutLink.waitFor()
    // await checkoutLink.click()
    // await page.waitForURL("/basket")

    const productPage = new ProductsPage(page)
    productPage.visit()
    productPage.sortProductsbyCheapest()
    productPage.addItemToBasket(1)
    navigation.moveToCheckout()
    basketCounter.removeCheapestItem()
})  


