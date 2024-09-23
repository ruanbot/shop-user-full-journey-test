import { test } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid';
    // using two dots .. will access other folder from the same directory as this script
import { ProductsPage } from "../page-objects/ProductsPage" 
import { Navigation } from './../page-objects/Navigation.js'
import { Checkout } from './../page-objects/Checkout.js'
import { LoginPage } from '../page-objects/LoginPage.js'
import { RegisterPage } from '../page-objects/RegisterPage.js'
import { DeliveryDetails } from '../page-objects/DeliveryDetails.js'
import { deliveryDetails as userAddress } from '../data/deliveryDetails.js'
import { PaymentPage } from '../page-objects/PaymentPage.js'
import { paymentDetails } from '../data/paymentDetails.js'

test("New user full end-to-end test journey", async ({ page }) => {

    // This is making a new variable to call from ProductPage class
    const productsPage = new ProductsPage(page)
    // This is using the variable to use a method from ProductPage class
    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)

    // Go to checkout page
    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    // Removes cheapest product and continue checkout
    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    // Continue to register for check out
    const login = new LoginPage(page)
    await login.continueToRegister()

    // Fill out register email and password
    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)

    // Fill out delivery information
    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)

    // Save Delivery information
    await deliveryDetails.saveDetails()

    // Continue to Payment
    await deliveryDetails.continueToPayment()

    // payment page
    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()

    // fill payment details
    await paymentPage.fillPaymentDetails(paymentDetails)

})