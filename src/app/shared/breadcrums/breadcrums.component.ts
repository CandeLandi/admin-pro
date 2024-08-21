import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrl: './breadcrums.component.css'
})
export class BreadcrumsComponent implements OnDestroy{
  public title!: string;
  public tituloSubs$: Subscription;


  constructor( private router: Router, private route: ActivatedRoute ) {

    this.tituloSubs$ = this.getArgumentsRoute()
                        .subscribe( ({ title: title }) => {
                            this.title = title;
                            document.title = `AdminPro - ${ title }`;
                        });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  getArgumentsRoute() {

    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      );
  }

}
