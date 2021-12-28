"use strict";
let common = require("../../../../extension/common.js");

module.exports = common({
    name: "HP_MS_DSB_VPI_Dashpart",
    author: "Meghana Chintanboina",
    "@tags": ["hp", "my_stuff", "my_Dashboards", "team11", "Meghana", "happy5", "3.0"],

    before: browser => {
        global.mainPage = browser.page.common.main();
        global.intelligencePage = browser.page.settings.general.intelligence();
        global.rolesPage = browser.page.settings.security.roles();
        global.usersPage = browser.page.settings.security.users();
        global.dashpartPage = browser.page.myStuff.myDashboards();
        global.loginPage = browser.page.common.login();

        /* global mainPage , dashboardPage, LOGGER*/
    },

    "Happy Path - My Stuff - My Dashboards - Vantagepoint Intelligence - Dashpart": client => {
        let randNum = Math.floor(Math.random() * 89999 + 10000).toString();
        let { organizationLevel1sLabel } = databaseData.systemwideData;
        let accessibleItems = ["My Stuff", "Hubs"];
        let vpiRole = {
            name: "VPI_ACCESS_ROLE",
            hasFullAccess: false,
            hasAllTransactionTypes: false,
            dashboardsAndDashparts: "Save For All Roles"
        };
        let vpiUser = {
            username: `VPI_MEGHA_${randNum}`,
            roles: vpiRole.name,
            employeeSearch: "",
            qualifiedStatus: "Qualified Contact"
        };
        let copiedVpiRole = `COPY_VPI_${randNum}`;
        let copiedVpiUser = {
            username: `VPI_MEGHA_COPY_${randNum}`,
            roles: copiedVpiRole,
            employeeSearch: "",
            qualifiedStatus: "Qualified Contact"
        };
        let dashboardObj = { dashboardName: "Vantagepoint Intelligence" };
        let dashpartObj = { dashpartTitle: `VPI_Dashpart_${randNum}`, dashpartBase: "Vantagepoint Intelligence" };
        let dashpartSubTitle = "Vantagepoint Intelligence Dashpart";
        let updatedObj = { dashpartTitle: `MEGHA_VPI_Dashpart_${randNum}` };
        let _controlsArr = ["@detailsView_mainScreen_ServerNameTxtbox", "@detailsView_mainScreen_UserNameTxtbox", "@detailsView_mainScreen_PasswordTxtbox"];
        let _valuesArr = ["herdbt07.deltek.com", "Tableau", "Pa$$word1"];


        // VPI Dashpart Base Option is only Visible When Intelligence Module is Activated.
        LOGGER("Navigate to Settings > General");
        mainPage.navigateTo("GeneralConfiguration").WaitForPageLoad();
        client.element("css selector", "div[data-app-id='Intelligence']", result => {
            if (result.status === 0) {
                LOGGER("Intelligence Module is Enabled, Test Configuration Settings.");

                // Testing the Configuration Settings in Intelligence Module.
                mainPage.navigateTo("Intelligence").WaitForPageLoad();
                intelligencePage.waitForElementPresent("@detailsView_mainScreen_PageTitleLbl");
                _controlsArr.map((_control, i) => {
                    intelligencePage.getAttribute(_control, "class", result => {
                        if (result.value.includes("is-locked") || result.value.includes("disabled")) {
                            mainPage.WaitForPageLoad();
                        }
                        else {
                            intelligencePage.GetTextValue(_control, res => {
                                let _newVal = _valuesArr[i];
                                if (res === '' || res !== _newVal) {
                                    res = _newVal;
                                    intelligencePage.SetText(_control, res);
                                    intelligencePage.click("@detailsView_mainScreen_PageTitleLbl");
                                    intelligencePage.click("@detailsView_mainScreen_SaveBtn");
                                }
                            })
                        }
                    })
                })
                mainPage.navigateTo("main_menu").WaitForPageLoad();
                LOGGER("Navigate to Security > Roles");
                mainPage.navigateTo(["Security", "Roles"]);
                mainPage.WaitForPageLoad();

                LOGGER("Create a New Role and User to Access Vantagepoint Intelligence Dashparts");
                rolesPage.selectRole("Default");
                rolesPage.WaitForPageLoad();
                rolesPage.updateSelectedRecord(() => {
                    rolesPage.SetCheckboxValue("@addEditView_overviewTab_AllowAccessToVIDashpartsChkbox", false);
                });

                // Create a Role to Access Vantagepoint Intelligence Dashpart
                rolesPage.createRole(vpiRole, () => {
                    accessibleItems.map(item => {
                        rolesPage.SetCheckboxInList("@addEditView_overviewTab_ApplicationSlctList", item, true);
                        rolesPage.WaitForPageLoad();
                    });
                    rolesPage.SetCheckboxValue("@addEditView_overviewTab_AllowAccessToVIDashpartsChkbox", true);
                    rolesPage.SelectTab("@detailsView_mainScreen_TabHeader", "tabAccess");
                    rolesPage.waitForElementVisible("@detailsView_accessRightsTab_FunctionalAreaCmbbox");
                    rolesPage.SelectItemDropdown("@detailsView_accessRightsTab_FunctionalAreaCmbbox", organizationLevel1sLabel);
                    rolesPage.SetCheckboxValue("@detailsView_accessRightsTab_FullAccessToAllCompaniesChkbox", true);
                });
                rolesPage.click("@addEditView_mainScreen_SaveBtn").WaitForPageLoad();

                // Copy Created Role and DO NOT Give Access to VPI Dashparts
                rolesPage.copyRole(copiedVpiRole, vpiRole.name);
                rolesPage.WaitForPageLoad();
                rolesPage.updateSelectedRecord(() => {
                    rolesPage.SetCheckboxValue("@addEditView_overviewTab_AllowAccessToVIDashpartsChkbox", false);
                });

                // Create a New User to Access VPI Dashparts.
                mainPage.navigateTo("Users").WaitForPageLoad();
                usersPage.createNewUser(vpiUser);
                mainPage.verifySuccessfullySaved();

                // Create a New User for Copied Role.
                usersPage.createNewUser(copiedVpiUser);
                mainPage.verifySuccessfullySaved();

                // Scenario 1 : Login as User who have Access to VPI Dashpart.
                mainPage.empLoginAsUser(vpiUser.username, "");
                mainPage.WaitForPageLoad();
                LOGGER("Navigate to My Stuff > Dashboards");
                mainPage.navigateTo("MyDashboards").WaitForPageLoad();
                dashpartPage.setDashboardEditMode(true);
                dashpartPage.WaitForPageLoad();

                // Delete If Dashboard(s) with Same Name Exists
                LOGGER("Delete if Dashboard with Same Name Exists")
                client.elements("css selector", `div[title='${dashboardObj.dashboardName}']`, res => {
                    let count = res.value.length
                    if (res.status === 0) {
                        for (let i = 1; i <= count; i++) {
                            dashpartPage.deleteDashboard(dashboardObj);
                            dashpartPage.WaitForPageLoad();
                        }
                    }
                });

                // Create New Dashboard & New VPI Dashpart
                dashpartPage.createDashboard(dashboardObj);
                dashpartPage.createVIDashPart(dashpartObj, res => {
                    if (res === false) {
                        dashpartPage.assert.visible("@addEditView_mainScreen_PageTitleLbl");
                        dashpartPage.SetText("@addEditView_mainScreen_DashpartSubtitleTxtbox", dashpartSubTitle);
                        dashpartPage.click("@addEditView_mainScreen_SaveBtn");
                        mainPage.waitForElementVisible("@dialog_messageBoxYesBtn");
                        mainPage.click("@dialog_messageBoxYesBtn");
                        mainPage.verifySuccessfullySaved();
                        dashpartPage.click(`div[title='${dashboardObj.dashboardName}']`);
                        dashpartPage.WaitForPageLoad();

                        // Verify Refresh, Maximize, Row Tools Icon on Dashpart
                        dashpartPage.getAttribute("div.section-placeholder", "data-section-id", result => {
                            let dashpartGrid = `div.presentation-mode[data-section-id='${result.value}']`;
                            let refreshIcon = `div[data-section-id='${result.value}'] button.dashpart-title-toolbar-button-refresh`;
                            let maximizeIcon = `div[data-section-id='${result.value}'] button.dashpart-title-toolbar-button-maximize`;
                            let rowToolsIcon = `div[data-section-id='${result.value}'] button.dashpart-title-toolbar-button`

                            // Test Refresh Icon on Created VPI Dashpart
                            LOGGER(`Testing Refresh Icon of ${dashpartObj.dashpartTitle}`);
                            dashpartPage.assert.visible(refreshIcon).click(refreshIcon);

                            // Test Maximize Icon on Created VPI Dashpart
                            LOGGER(`Testing Maximize Icon of ${dashpartObj.dashpartTitle}`);
                            dashpartPage.assert.attributeEquals(dashpartGrid, "class", "section-placeholder core_dashpart core-component presentation-mode");
                            dashpartPage.assert.visible(maximizeIcon).click(maximizeIcon);
                            dashpartPage.assert.attributeContains(dashpartGrid, "class", "maximized-in-workbench");
                            dashpartPage.assert.visible(maximizeIcon).click(maximizeIcon)
                            dashpartPage.WaitForPageLoad();


                            // Test Remove Icon on Created VPI Dashpart
                            LOGGER(`Testing RowTools Icon of ${dashpartObj.dashpartTitle}`);
                            dashpartPage.assert.visible(rowToolsIcon);
                            dashpartPage.click(rowToolsIcon).WaitForPageLoad();
                            dashpartPage.waitForElementVisible("li[data-key=delete]");
                            dashpartPage.click("li[data-key=delete]");
                            dashpartPage.ClickIfExist(rowToolsIcon).WaitForPageLoad();
                            dashpartPage.ClickIfExist("li[data-key=delete]");
                        });
                        // Drag Created VPI Dashpart
                        LOGGER(`Drag ${dashpartObj.dashpartTitle}`);
                        dashpartPage.dragDashpart(dashpartObj.dashpartTitle);

                        // Resize Created VPI Dashpart
                        LOGGER(`Resize ${dashpartObj.dashpartTitle}`);
                        dashpartPage.resizeDashpart();

                        // Update created VPI Dashpart
                        LOGGER(`Update ${dashpartObj.dashpartTitle}`);
                        dashpartPage.updateDashpart(dashpartObj, updatedObj);
                        dashpartPage.click(`div[title='${dashboardObj.dashboardName}']`);
                        dashpartPage.WaitForPageLoad();

                        // Share Created Dashpart
                        dashpartPage.click("@detailsView_mainScreen_ShareBtn");
                        dashpartPage.SelectItemDropdown("@dialog_shareDashboard_RolesCmbbox", copiedVpiRole);
                        dashpartPage.click("@dialog_shareDashboard_SaveBtn");

                        // Scenario 2 : Login as Created User who DO NOT have access to VPI Dashparts.
                        LOGGER("Scenario 2 : User Login")
                        mainPage.empLoginAsUser(copiedVpiUser.username, "")
                        LOGGER("Navigate to My Stuff > My Dashboards");
                        mainPage.navigateTo("MyDashboards").WaitForPageLoad();
                        dashpartPage.setDashboardEditMode(true);
                        dashpartPage.click(`div[title='${dashboardObj.dashboardName}']`);
                        dashpartPage.getAttribute("div.section-placeholder", "data-section-id", result => {
                            let dashpartGrid = `div.presentation-mode[data-section-id='${result.value}']`;
                            let vpiDashpart = `${dashpartGrid} span.title-text`;
                            let maximizeIcon = `div[data-section-id='${result.value}'] button.dashpart-title-toolbar-button-maximize`;
                            let rowToolsIcon = `div[data-section-id='${result.value}'] button.dashpart-title-toolbar-button`

                            // Verify if Vantagepoint Intelligence Dashparts are Visible.
                            dashpartPage.expect.element(vpiDashpart).text.to.contain("VPI_Dashpart_");

                            // Test Maximize Icon on Created VPI Dashpart.
                            LOGGER(`Testing Maximize Icon of ${dashpartObj.dashpartTitle}`);
                            dashpartPage.assert.attributeEquals(dashpartGrid, "class", "section-placeholder core_dashpart core-component presentation-mode");
                            dashpartPage.assert.visible(maximizeIcon).click(maximizeIcon);
                            dashpartPage.assert.attributeContains(dashpartGrid, "class", "maximized-in-workbench");
                            dashpartPage.assert.visible(maximizeIcon).click(maximizeIcon).WaitForPageLoad();

                            // Test Remove Icon on Created VPI Dashpart.
                            LOGGER(`Testing RowTools Icon of ${dashpartObj.dashpartTitle}`);
                            dashpartPage.assert.visible(rowToolsIcon).click(rowToolsIcon);
                            dashpartPage.waitForElementVisible("li[data-key='delete']");
                            dashpartPage.click("li[data-key='delete']");
                        });
                        dashpartPage.click("@detailsView_mainScreen_HeaderNewDashpartBtn");
                        mainPage.waitForElementVisible("@dialog_messageBoxYesBtn");
                        mainPage.click("@dialog_messageBoxYesBtn");
                        dashpartPage.assert.ComboboxItemAvailable("@dialog_addNewDashpart_DashpartBaseCmbbox", dashpartObj.dashpartBase, false)
                        dashpartPage.click("@dialog_addNewDashpart_DashpartTitleTxtbox").WaitForPageLoad();
                        dashpartPage.click("@dialog_addNewDashpart_CancelBtn").WaitForPageLoad();

                        // Check if dashpart library is open and Verify VPI Dashparts is Available in Dashpart Library .
                        client.element("css selector", "div.dashboard-settings-add-dashpart", result => {
                            if (result.status !== 0) {
                                dashpartPage.click("@detailsView_mainScreen_DashpartLibraryBtn").WaitForPageLoad();
                                client.useXpath().expect.element(`//div[@class="dashparts-list-used"]//div[contains(text(),'${updatedObj.dashpartTitle}')]`).to.not.be.present;
                                client.useXpath().expect.element(`//div[@class="dashparts-list"]//div[contains(text(),'${updatedObj.dashpartTitle}')]`).to.not.be.present;
                                dashpartPage.WaitForPageLoad();
                            }
                        });
                        dashpartPage.click("@detailsView_mainScreen_SaveBtn");
                        mainPage.logOut();

                        // Scenario 3 : Login as the one who DO NOT have access to VPI Dashparts and NOT shared to this Role.
                        LOGGER("Scenario 3 : Login as Admin")
                        loginPage.doLogin("ADMIN", "")
                        LOGGER("Navigate to My Stuff > My Dashboards");
                        mainPage.navigateTo("MyDashboards").WaitForPageLoad();
                        dashpartPage.setDashboardEditMode(true);

                        // Check if VPI Dashpart is Visible in Dashboard.
                        dashpartPage.click(`div[title='${dashboardObj.dashboardName}']`);
                        dashpartPage.assert.elementNotPresent("div[class*='divsection-placeholder core_dashpart core-component presentation-mode']");
                        dashpartPage.WaitForPageLoad();

                        // Check if Vantagepoint Intelligence is Available in Dashpart Base
                        dashpartPage.click("@detailsView_mainScreen_HeaderNewDashpartBtn");
                        dashpartPage.WaitForPageLoad();
                        dashpartPage.assert.ComboboxItemAvailable("@dialog_addNewDashpart_DashpartBaseCmbbox", dashpartObj.dashpartBase, false)
                        dashpartPage.click("@dialog_addNewDashpart_DashpartTitleTxtbox").WaitForPageLoad();
                        dashpartPage.click("@dialog_addNewDashpart_CancelBtn").WaitForPageLoad();

                        // Check if dashpart library is open and Verify VPI Dashparts is Available in Dashpart Library .
                        client.element("css selector", "div.dashboard-settings-add-dashpart", result => {
                            if (result.status !== 0) {
                                dashpartPage.click("@detailsView_mainScreen_DashpartLibraryBtn");
                                client.useXpath().expect.element(`//div[@class="dashparts-list-used"]//div[contains(text(),'${updatedObj.dashpartTitle}')]`).to.not.be.present;
                                client.useXpath().expect.element(`//div[@class="dashparts-list"]//div[contains(text(),'${updatedObj.dashpartTitle}')]`).to.not.be.present;
                                dashpartPage.WaitForPageLoad();
                            }
                        });

                        // Clean Up : Delete Created Dashboard.
                        LOGGER("Delete Created Dashbaord");
                        dashpartPage.deleteDashboard(dashboardObj.dashboardName);
                        dashpartPage.WaitForPageLoad();
                        dashpartPage.SetToggleValue("@detailsView_mainScreen_EditToggleBtn", false).WaitForPageLoad();

                        // Clean Up : Delete Created Roles
                        mainPage.navigateTo(["main_menu"]);
                        mainPage.navigateTo(["Security", "Roles"]);
                        mainPage.WaitForPageLoad();
                        rolesPage.deleteRole(vpiRole.name);
                        rolesPage.deleteRole(copiedVpiRole);
                    }
                    else {
                        LOGGER("No Workbooks Available in Workbooks Grid");
                    }
                })
            }
            else {
                LOGGER("Intelligence Module is not activated to Proceed Test");
            }

        });
    }
})  