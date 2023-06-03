import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DispService } from '../../MemoFile/disp.service';
import { Memo } from '../../MemoFile/memo';
import { MemoService } from '../../MemoFile/memo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public memo: Memo;
  constructor(private memoService: MemoService, private router: Router, private dispService: DispService) { }
  public getMemosById(x: any): void {
    this.memoService.getMemosById(x).subscribe((response: Memo) => {
      this.memo = response;
    },
      (error: HttpErrorResponse) => {
        alert("Sorry the memo you are looking for doesn't exist");
      });


  }

  public gotoletter() {
    this.dispService.setData(this.memo.refnom, this.memo.curdate, this.memo.sendate, this.memo.toTo, this.memo.fromFrom, this.memo.carbonCopy, this.memo.subject, this.memo.body);
    this.router.navigate(['letter']);
  }

}
