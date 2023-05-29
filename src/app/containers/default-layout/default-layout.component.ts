import { ChangeDetectorRef, Component } from '@angular/core';

import { navItemsAdminIC, navItemsBranchIC, navItemsDistrictIC, navItemsSuperAdmin, navItemsBM, navItemMenu, navItemsSASVAdmin, navItemsSASVView, navItemsSanctionAdmin, navItemsSanctionView } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = [];


  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
    this.navItems.push(navItemMenu);
    const totalAccessTokens = Number(localStorage.getItem('number_of_access_tokens'))
    for (let i = 0; i < totalAccessTokens; i++) {
      //if (localStorage.getItem("module_" + i) == "true") {
        console.log("i = " + i);
        switch (localStorage.getItem("role_" + i)) {
          case "ROLE_SUPER_ADMIN":
            this.navItems = navItemsSuperAdmin;
            break;
          case "ROLE_IC_ADMIN":
            this.navItems.push(navItemsAdminIC);
            break;
          case "ROLE_DISTRICT_IC":
            this.navItems.push(navItemsDistrictIC);
            break;
          case "ROLE_BRANCH_IC":
            this.navItems.push(navItemsBranchIC);
            break;
          case "ROLE_BRANCH_MANAGER":
            this.navItems.push(navItemsBM);
            break;
          case "ROLE_SASV_ADMIN":
            this.navItems.push(navItemsSASVAdmin);
            break;
            case "ROLE_SASV_ADMIN":
            this.navItems.push(navItemsSASVView);
            break;
          case "ROLE_SANCTION_ADMIN":
            this.navItems.push(navItemsSanctionAdmin);
            break;
          case "ROLE_SANCTION_VIEW":
            this.navItems.push(navItemsSanctionView)
            break;
        }
      //}
    }
  }
}
