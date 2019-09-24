import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ObraService } from 'src/app/obras/obra.service';
import { AutorService } from '../autor.service';
import { BR, PAISES, SEXO_OPTIONS } from 'src/app/app.api';
import { normalizeDate } from 'src/app/shared/util';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/components/common/api';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-autor-cadastro',
  templateUrl: './autor-cadastro.component.html'
})
export class AutorCadastroComponent implements OnInit {
  @ViewChild('autorForm', { static: true }) form: NgForm;

  @Output() saveEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  paises = PAISES;
  sexoOptions = SEXO_OPTIONS;
  locale = BR;

  obras: SelectItem[];
  data: Date;

  autor = {
    codigo: null,
    nome: null,
    sexo: null,
    email: null,
    dataNascimento: null,
    paisOrigem: null,
    cpf: null,
    obras: []
  };

  constructor(
    private obraService: ObraService,
    private autorService: AutorService,
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.obraService
      .getObrasAsSelectItem()
      .subscribe(obras => (this.obras = obras));
  }

  onSave() {
    const detailMsg =
      this.autor.codigo == null
        ? `O autor ${this.autor.nome} foi cadastro com sucesso!`
        : `O autor ${this.autor.nome} foi atualizado com sucesso!`;

    this.autor.dataNascimento = this.data;

    this.autorService.save(this.autor).subscribe(autorSalvo => {
      this.autor.codigo = autorSalvo.codigo;
      this.saveEvent.emit();
      this.onClear();
      this.notificationService.notify({
        severity: 'success',
        summary: 'Sucesso',
        detail: detailMsg
      });
    });
  }

  onAutorSelected(autor: any) {
    if (
      autor !== null &&
      (this.autor.codigo === null || autor.codigo !== this.autor.codigo)
    ) {
      this.autor = autor;

      this.autor.obras = autor.obras.map(obra => {
        return { codigo: obra.codigo, nome: obra.nome };
      });

      this.data = normalizeDate(new Date(autor.dataNascimento));
    }
  }

  onClear() {
    this.autor = {
      codigo: null,
      nome: null,
      sexo: null,
      email: null,
      dataNascimento: null,
      paisOrigem: null,
      cpf: null,
      obras: []
    };
    this.form.reset();
  }

  onDelete() {
    this.messageService.clear('c');
    this.autorService.delete(this.autor.codigo).subscribe(res => {
      this.notificationService.notify({
        severity: 'warn',
        summary: 'Exclusão',
        detail: `O autor ${this.autor.nome} foi excluido com sucesso!`
      });
      this.deleteEvent.emit();
      this.onClear();
    });
  }

  showDeleteConfirmDialog() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Tem certeza?',
      detail:
        'Confirme para excluir o autor ou cancele para manter o autor cadastrado no sistema'
    });
  }

  onReject() {
    this.messageService.clear('c');
    return false;
  }
}
