import { Component } from '@angular/core';
import { Wrestler } from '../wrestler.interface';
import { WrestlerService } from '../wrestler.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WrestlerSearchComponent } from '../wrestler-search/wrestler-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink, WrestlerSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  wrestlers: Wrestler[] = [];

  constructor(private wrestlerService: WrestlerService) { }

  ngOnInit(): void {
    this.getWrestlers();
  }

  getWrestlers(): void {
    this.wrestlerService.getWrestlers()
      .subscribe(wrestlers => this.wrestlers = wrestlers.slice(1, 5));
  }
}
