import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File , coleccion: string, id: string) {
    return new Promise( ( resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append( 'image', archivo, archivo.name );
      xhr.onreadystatechange = () => {
        if( xhr.readyState === 4 ) {
          if( xhr.status === 200 ) {
            console.log('Imagen subida')
            resolve( JSON.parse(xhr.response) )
          } else {
            console.log('Fallo subida')
            reject( JSON.parse(xhr.response) )
          }
        }
      }

      let url = CONFIG.URLSERVICIO + `/upload/${coleccion}/${id}`;
      xhr.open( 'PUT', url, true );
      xhr.send( formData );
    })
  }
}
