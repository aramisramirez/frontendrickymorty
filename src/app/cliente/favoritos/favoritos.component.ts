import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css',
})
export class FavoritosComponent implements OnInit {
  mensajeerrorgetall!: string;

  datosPersonajes: any;

  constructor(private clienteService: ClienteService) {}
  ngOnInit(): void {
    this.cargarpesonajesfavoritos();
  }

  cargarpesonajesfavoritos() {
    this.datosPersonajes = [];
    this.clienteService.cargarPersonajesfavoritos().subscribe({
      next: (response: any) => {
        const respuesta: any = response;
        this.datosPersonajes = respuesta.favorite.map((personaje: any) => {
          return {
            ...personaje,
            created: moment(personaje.created_At).format('MM-DD-YYYY'),
          };
        });
      },
      error: (error: any) => {
        const errores: any = error;
        this.mensajeerrorgetall = errores.error.message;
        console.log(this.mensajeerrorgetall);
      },
    });
  }

  eliminarRegistro(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title:
          '¿Estas segur@ que quieres eliminar de favoritos este personaje?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Si, eliminalo!',
        cancelButtonText: 'No, cancelalo!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteService.eliminarPersonajesfavoritos(id).subscribe({
            next: (response: any) => {
              this.cargarpesonajesfavoritos();
              swalWithBootstrapButtons.fire({
                title: '¡Eliminado!',
                text: 'Tú personaje a sido eliminado exitosamente.',
                icon: 'success',
              });
            },
            error: (error: any) => {
              this.cargarpesonajesfavoritos();
              swalWithBootstrapButtons.fire({
                title: '¡Advertencia!',
                text: 'No se pude ver la información.',
                icon: 'success',
              });
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelado',
            text: 'Se ha cancelado la operación.',
            icon: 'error',
          });
        }
      });
  }
}
