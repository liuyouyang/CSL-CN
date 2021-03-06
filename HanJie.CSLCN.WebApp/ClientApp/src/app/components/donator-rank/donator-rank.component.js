"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DonatorRankComponent = /** @class */ (function () {
    function DonatorRankComponent(donatorRankService, globalService) {
        this.donatorRankService = donatorRankService;
        this.globalService = globalService;
        this.monthlyRanksLoading = true;
        this.allRanksLoading = true;
    }
    DonatorRankComponent.prototype.ngOnInit = function () {
        this.getMonthlyRank();
    };
    DonatorRankComponent.prototype.getAllRanks = function () {
        var _this = this;
        this.donatorRankService.getAllRanks().subscribe(function (datas) {
            _this.allRanks = datas;
            _this.allRanksLoading = false;
        });
    };
    DonatorRankComponent.prototype.getMonthlyRank = function () {
        var _this = this;
        this.donatorRankService.getMonthlyRanks().subscribe(function (datas) {
            _this.monthlyRanks = datas;
            _this.monthlyRanksLoading = false;
        });
    };
    DonatorRankComponent.prototype.setCustomerHeader = function (file) {
        //file.type = ""
    };
    DonatorRankComponent.prototype.onTabsetChange = function (event) {
        if (event.index == 1 && this.allRanks == null) {
            this.getAllRanks();
        }
    };
    DonatorRankComponent = __decorate([
        core_1.Component({
            selector: 'donator-rank',
            templateUrl: './donator-rank.component.html',
            styleUrls: ['./donator-rank.component.css']
        })
    ], DonatorRankComponent);
    return DonatorRankComponent;
}());
exports.DonatorRankComponent = DonatorRankComponent;
//# sourceMappingURL=donator-rank.component.js.map