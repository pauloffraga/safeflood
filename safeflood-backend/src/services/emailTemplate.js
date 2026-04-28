await transporter.sendMail({
    to: email,
    subject: "Recuperação de senha - SafeFlood",
    html: `
    <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
  
        <div style="background: linear-gradient(90deg, #0077ff, #00c6ff); padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">🌊 SafeFlood</h1>
          <p style="margin: 5px 0 0;">Sistema de Monitoramento</p>
        </div>
  
        <div style="padding: 30px; color: #333;">
          <h2>Recuperação de Senha</h2>
          <p>Olá,</p>
          <p>Recebemos uma solicitação para redefinir sua senha.</p>
  
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" 
               style="background: #0077ff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">
               Redefinir Senha
            </a>
          </div>
  
          <p>Se o botão não funcionar:</p>
          <p style="word-break: break-all; color: #0077ff;">${link}</p>
  
          <p>Este link expira em 1 hora.</p>
        </div>
  
        <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>© 2026 SafeFlood</p>
        </div>
  
      </div>
    </div>
    `,
  });