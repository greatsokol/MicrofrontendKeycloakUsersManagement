import {Component, Injectable, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalConfig} from './modal.config';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from "@angular/common";

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  imports: [
    NgIf
  ],
  standalone: true
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig!: ModalConfig;
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>;
  private modalRef!: NgbModalRef;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent);
      this.modalRef.result.then(resolve, resolve);
      if (this.modalConfig.onOpen) this.modalConfig.onOpen();
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose());
      this.modalRef.close(result);
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss());
      this.modalRef.dismiss(result);
    }
  }
}
