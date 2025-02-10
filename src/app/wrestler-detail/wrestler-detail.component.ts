import { Component } from '@angular/core';
import { Wrestler } from '../wrestler.interface';
import { NgIf, Location, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WrestlerService } from '../wrestler.service';

@Component({
  selector: 'app-wrestler-detail',
  standalone: true,
  imports: [NgIf, UpperCasePipe, FormsModule],
  templateUrl: './wrestler-detail.component.html',
  styleUrl: './wrestler-detail.component.css'
})
export class WrestlerDetailComponent {

  wrestler? : Wrestler

  constructor(
    private route: ActivatedRoute,
    private wrestlerService: WrestlerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWrestler();
  }
  
  getWrestler(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.wrestlerService.getWrestler(id)
      .subscribe(wrestler => this.wrestler = wrestler);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.wrestler) {
      this.wrestlerService.updateWrestler(this.wrestler)
        .subscribe(() => this.goBack());
    }
  }
}
