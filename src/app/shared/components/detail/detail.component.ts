import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    public detail: any;
    public list1 = '';
    public list2 = '';

    constructor(
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.detail = this.route.snapshot.data.detail;
        this.list1 = this.route.snapshot.data.list1;
        this.list2 = this.route.snapshot.data.list2;
    }
}
