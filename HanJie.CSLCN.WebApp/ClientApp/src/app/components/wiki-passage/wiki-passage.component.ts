import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { WikiPassageDto } from 'src/app/models/wiki-passage-dto';
import { WikiPassageService } from 'src/app/services/wiki-passage.service';
import { WikiPassagePageStatusEnum } from 'src/app/models/enums/wiki-passage-page-status.enum';
import { UserInfoService } from '../../services/user-info.service';
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

@Component({
    selector: 'wiki-passage',
    templateUrl: './wiki-passage.component.html',
    styleUrls: ['./wiki-passage.component.css']
})
export class WikiPassageComponent implements OnInit {


    /***
     * 从路由信息中抓取的文章路由编号
     ***/
    public routePath: string
    /***
     * 从服务端获取的维基文章对象
     ***/
    public wikiPassage: WikiPassageDto;
    /***
     * 存储旧的维基文档内容，用于比对用户是否确实修改了文章内容
     ***/
    public oldWikiPassageDtoContent: string;



    public color: string = "lightblue";
    /***
     * 页面状态。（处于展示状态，或有权限的用户正在进行编辑时显示md编辑器）
     ***/
    public pageStatus: WikiPassagePageStatusEnum = WikiPassagePageStatusEnum.Displaying;

    public isAdmin: boolean = false;


    constructor(private route: ActivatedRoute,
        private router: Router,
        private wikiPassageService: WikiPassageService
    ) {
    }

    ngOnInit(): void {
        //从路由中抓取文章路由地址
        this.getParamsMapId();

        //查询是否是管理员
        if (UserInfoService.currentUser) {
            this.isAdmin = UserInfoService.currentUser.isAdmin;
        }
    }

    /***
     *从路由中抓取文章路由地址编号。
     * */
    private getParamsMapId(): void {
        let host: WikiPassageComponent = this;
        this.routePath = this.route.snapshot.paramMap.get("id");
        host.getWikiPassage(host.routePath);
        this.router.events.subscribe((event) => {
            if (event.toString().startsWith("NavigationEnd")) {
                if (this.route.snapshot.paramMap.get("id") != host.routePath) {
                    host.routePath = this.route.snapshot.paramMap.get("id");
                    host.getWikiPassage(host.routePath);
                }
            }
        });
    }

    getWikiPassage(routePath: string): void {
        let host: WikiPassageComponent = this;
        this.wikiPassageService.getWikiPassage(routePath).subscribe(response => {
            host.wikiPassage = response;
            host.oldWikiPassageDtoContent = host.wikiPassage.content;
        });
    }

    private edit(): void {
        this.pageStatus = WikiPassagePageStatusEnum.Editing;
    }

    private update(): void {
        if (this.wikiPassage.content != this.oldWikiPassageDtoContent) {
            this.wikiPassageService.postWikiPassage(this.wikiPassage).subscribe(response => {
                //TODO 弹出报错提示弹窗
            });
        }
        this.pageStatus = WikiPassagePageStatusEnum.Displaying;
    }


}


// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.table = (header: string, body: string) => {
        return '<table class="table table-bordered">' + header + body + '</table>';
    };

    return {
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
    };
}