import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  closeModalAndSetFlag() {
    // Guarda la bandera en localStorage para que no se muestre de nuevo.
    localStorage.setItem('modalShown', 'true');
  }

}
