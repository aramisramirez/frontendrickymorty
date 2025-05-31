import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css',
})
export class PersonajesComponent implements OnInit {
  page: number = 1;
  totalPages!: number;
  cargardatos: any = [];
  mensajeerrorcreafavorito: string = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarinformacion(this.page);
  }

  cargarinformacion(page: number) {
    if (page < 1 || (this.totalPages && page > this.totalPages)) {
      alert('Indica una página válida');
      return;
    }

    this.clienteService.cargardatosapi(page).subscribe({
      next: (response: any) => {
        this.cargardatos = response;
        this.totalPages = response.info.pages;
        this.page = page;
      },
      error: () => {
        alert('No se pudo encontrar la página indicada');
      },
    });
  }

  onPageInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);

    if (!isNaN(value)) {
      this.cargarinformacion(value);
    }
  }

  crearfavorito(data: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Estas segur@ que quieres agregar a favoritos este personaje?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Si, agregalo!',
        cancelButtonText: 'No, cancelalo!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const datosobtenidos = {
            id: data.id,
            name: data.name,
            status: data.status,
            species: data.species,
            type: data.species,
            gender: data.gender,
            image: data.image,
            url: data.url,
            created: data.created,
          };

          this.clienteService
            .crearPersonajesfavoritos(datosobtenidos)
            .subscribe({
              next: () => {
                swalWithBootstrapButtons.fire({
                  title: '¡Agregado!',
                  text: 'Tú personaje a sido agregado exitosamente.',
                  icon: 'success',
                });
              },
              error: (error: any) => {
                this.mensajeerrorcreafavorito = error.error.message;
                console.error(this.mensajeerrorcreafavorito);
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
