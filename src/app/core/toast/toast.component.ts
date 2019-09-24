import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit {

  constructor(private notificationService: NotificationService, private messageService: MessageService) { }

  ngOnInit() {
    this.notificationService.notifier.subscribe (message => this.message(message));
  }

  message(message: any) {
    this.messageService.add({severity: message.severity, summary: message.summary, detail: message.detail});
  }

}
