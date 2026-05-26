<?php

namespace App\Notifications;

use App\Models\InvestorInvitation;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PartnerInvitationNotification extends Notification
{
    use Queueable;

    public function __construct(
        protected InvestorInvitation $invitation,
        protected string $publicUrl
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage())
            ->subject('Tu invitación a REM Partners')
            ->greeting('REM Partners')
            ->line('Has recibido una invitación privada para completar tu perfil de socio en REM Universe.')
            ->line('Tipo de socio: '.$this->invitation->investor_type)
            ->line('Estado inicial: '.$this->invitation->status)
            ->when(
                filled($this->invitation->notes),
                fn (MailMessage $message) => $message->line('Mensaje: '.$this->invitation->notes)
            )
            ->action('Completar perfil', $this->publicUrl)
            ->line('Este enlace vence el '.$this->invitation->expires_at?->format('Y-m-d H:i').' .')
            ->line('Si no esperabas este correo, puedes ignorarlo.');
    }
}
