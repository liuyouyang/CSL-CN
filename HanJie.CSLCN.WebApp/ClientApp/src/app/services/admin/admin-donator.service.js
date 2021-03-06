"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AdminDonatorService = /** @class */ (function () {
    function AdminDonatorService(http, drawerService) {
        this.http = http;
        this.drawerService = drawerService;
        this.adminDonatorsUrl = '/api/admin/admindonators';
    }
    AdminDonatorService.prototype.getDonators = function () {
        return this.http.get(this.adminDonatorsUrl);
    };
    AdminDonatorService.prototype.create = function (data) {
        return this.http.post(this.adminDonatorsUrl, data);
    };
    AdminDonatorService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AdminDonatorService);
    return AdminDonatorService;
}());
exports.AdminDonatorService = AdminDonatorService;
//# sourceMappingURL=admin-donator.service.js.map