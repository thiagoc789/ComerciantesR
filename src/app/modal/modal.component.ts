import { Component } from '@angular/core';
import { BeforeInstallPromptService } from '../before-install-prompt.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  showInstallButton = false;

  constructor(private beforeInstallPromptService: BeforeInstallPromptService) {
    beforeInstallPromptService.promptEvent$.subscribe(() => {
      this.showInstallButton = true;
    });
  }

  onInstallButtonClick() {
    this.beforeInstallPromptService.prompt();
    this.showInstallButton = false;
  }

  closeModalAndSetFlag() {
    // Guarda la bandera en localStorage para que no se muestre de nuevo.
    localStorage.setItem('modalShown', 'true');
  }

}
