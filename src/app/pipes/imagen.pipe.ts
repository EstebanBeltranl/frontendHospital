import { Pipe, PipeTransform } from '@angular/core';
import { CONFIG } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( imagen: string, coleccion: string): string {
    let URLImagenes = CONFIG.URLIMAGES;

    if( !imagen ) {
      return URLImagenes + '/usuarios/xxx'
    }

    if( imagen.includes('https') ) {
      return imagen;
    }
    return URLImagenes + `/${coleccion}/${imagen}`;
  }

}
