import { Component, OnInit } from '@angular/core';
import { Wrestler } from '../wrestler.interface';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WrestlerService } from '../wrestler.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wrestlers',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './wrestlers.component.html',
  styleUrl: './wrestlers.component.css'
})
export class WrestlersComponent implements OnInit{

  wrestlers : Wrestler[] =  [];

  constructor(private wrestlerService :WrestlerService){}
  
  ngOnInit(): void {
    this.getWrestlers();
  }

  getWrestlers(): void {
    this.wrestlerService.getWrestlers().subscribe(wrestlers => this.wrestlers = wrestlers);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.wrestlerService.addWrestler({ name } as Wrestler)
      .subscribe(wrestler => {
        this.wrestlers.push(wrestler);
      });
  }

  delete(wrestler: Wrestler): void {
    this.wrestlers = this.wrestlers.filter(w => w !== wrestler);
    this.wrestlerService.deleteWrestler(wrestler.id).subscribe();
  }
}
