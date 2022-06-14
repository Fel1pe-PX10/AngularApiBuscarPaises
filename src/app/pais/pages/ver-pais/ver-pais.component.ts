import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {


  pais!: Country;

  // se inyecta activatedRoute para poder subscribirse a cualquier cambio del url
  constructor( private activatedRoute: ActivatedRoute, private servicePais: PaisService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.servicePais.getPaisCodigo(id)),
        tap( console.log )
      )
      .subscribe( pais => this.pais = pais[0]);

    // Forma de hacerlo concatenando observables
    // this.activatedRoute.params
    //   .subscribe( ({id})=> {
    //     console.log(id);
    //     this.servicePais.getPaisCodigo(id)
    //       .subscribe(pais => {
    //         console.log(pais);
    //       });
        
    //   })
  }

}
