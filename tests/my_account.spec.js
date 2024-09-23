import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "../data/userDetails.js"

// jenkins, CircleCI, TravisCI, Github Actions


test("My Account using cookie injection and mocking network requests", async ({ page }) => {
    // Make a request to get login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)

    // mock a failed status 500 network request
    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/JSON",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })
    })

    // inject the login token into the browser

    const myAccount = new MyAccountPage(page)
    await myAccount.visit()

    // evaluate solves the variables inside the array, in this case, loginTokenInsideBrowserCode is unsolved, and it will use loginToken variable to solve it
    // this code is to inject the login token cookie 

    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])

    await myAccount.visit()
    await myAccount.waitForPageHeader()
    // proves error message is recieved when mocking.
    await myAccount.waitForErrorMessage()

})