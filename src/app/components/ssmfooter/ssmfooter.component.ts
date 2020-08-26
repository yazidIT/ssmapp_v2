import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-ssmfooter',
  templateUrl: './ssmfooter.component.html',
  styleUrls: ['./ssmfooter.component.scss']
})
export class SsmfooterComponent implements OnInit {

  appversion: any
  constructor(private utilsServ: UtilsService) { }

  ngOnInit() {
    this.utilsServ.getAppVersion().then(version => {
      this.appversion = version
    })
  }

}
