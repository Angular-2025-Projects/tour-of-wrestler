import { Component } from '@angular/core';
import { Wrestler } from '../wrestler.interface';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { WrestlerService } from '../wrestler.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wrestler-search',
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe],
  templateUrl: './wrestler-search.component.html',
  styleUrl: './wrestler-search.component.css'
})
export class WrestlerSearchComponent {
  // un observable
  wrestlers$!: Observable<Wrestler[]>;
  //le flux observable.
  private searchTerms = new Subject<string>();

  constructor(private wrestlerService: WrestlerService) {}

 // Poussez un terme de recherche dans le flux observable.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.wrestlers$ = this.searchTerms.pipe(
      // attendre 300 ms après chaque frappe avant de considérer le terme
      debounceTime(300),
      // ignorer le nouveau terme s'il est identique au terme précédent
      distinctUntilChanged(),
      // passer à une nouvelle recherche observable à chaque fois que le terme change
      switchMap((term: string) => this.wrestlerService.searchWrestlers(term)),
    );
  }
}
