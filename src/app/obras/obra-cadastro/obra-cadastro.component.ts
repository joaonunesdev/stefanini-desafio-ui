import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BR } from 'src/app/app.api';
import { SelectItem, MessageService } from 'primeng/components/common/api';
import { ObraService } from '../obra.service';
import { AutorService } from 'src/app/autores/autor.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { normalizeDate } from 'src/app/shared/util';

@Component({
  selector: 'app-obra-cadastro',
  templateUrl: './obra-cadastro.component.html'
})
export class ObraCadastroComponent implements OnInit {
  @ViewChild('obraForm', { static: true }) form: NgForm;

  @Output() saveEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  locale = BR;

  autores: SelectItem[];
  dataPublicacao: Date;
  dataExposicao: Date;

  obra = {
    codigo: null,
    nome: null,
    descricao: null,
    dataPublicacao: null,
    dataExposicao: null,
    autores: []
  };

  constructor(
    private obraService: ObraService,
    private autorService: AutorService,
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.autorService
      .getAutorAsSelectItem()
      .subscribe(autores => (this.autores = autores));
  }

  onSave() {
    const detailMsg =
      this.obra.codigo == null
        ? `A obra ${this.obra.nome} foi cadastra com sucesso!`
        : `A obra ${this.obra.nome} foi atualizada com sucesso!`;

    this.obra.dataPublicacao = this.dataPublicacao;
    this.obra.dataExposicao = this.dataExposicao;

    this.obraService.save(this.obra).subscribe(obraSalva => {
      this.obra.codigo = obraSalva.codigo;
      this.saveEvent.emit();
      this.onClear();
      this.notificationService.notify({
        severity: 'success',
        summary: 'Sucesso',
        detail: detailMsg
      });
    });
  }

  onObraSelected(obra: any) {
    if (
      obra !== null &&
      (this.obra.codigo === null || obra.codigo !== this.obra.codigo)
    ) {
      this.obra = obra;

      this.obra.autores = obra.autores.map(autor => {
        return { codigo: autor.codigo, nome: autor.nome };
      });

      if (obra.dataPublicacao != null) {
        this.dataPublicacao = normalizeDate(new Date(obra.dataPublicacao));
      }
      if (obra.dataExposicao != null) {
        this.dataExposicao = normalizeDate(new Date(obra.dataExposicao));
      }
    }
  }

  onClear() {
    this.obra = {
      codigo: null,
      nome: null,
      descricao: null,
      dataPublicacao: null,
      dataExposicao: null,
      autores: []
    };
    this.form.reset();
  }

  onDelete() {
    this.messageService.clear('d');
    this.obraService.delete(this.obra.codigo).subscribe(res => {
      this.notificationService.notify({
        severity: 'warn',
        summary: 'Exclusão',
        detail: `A obra ${this.obra.nome} foi excluido com sucesso!`
      });
      this.deleteEvent.emit();
      this.onClear();
    });
  }

  showDeleteConfirmDialog() {
    this.messageService.clear();
    this.messageService.add({
      key: 'd',
      sticky: true,
      severity: 'warn',
      summary: 'Tem certeza?',
      detail:
        'Confirme para excluir o autor ou cancele para manter a obra cadastrado no sistema'
    });
  }

  onReject() {
    this.messageService.clear('d');
    return false;
  }
}
