export const resetTemplate = `
<!DOCTYPE html>
<html dir="ltr" lang="pt-BR">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Reset de senha</title>
  </head>
  <body style="background-color: #fff; color: #212121; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 16px;">
    <section style="background-color: white; padding: 16px; border-radius: 4px;">
      <header style="margin-bottom: 24px;">
        <a href="https://meucd.vercel.app"><img src="https://res.cloudinary.com/domyxfxko/image/upload/v1743615913/irfacil/pcqmwlodq1vxxa87b1nt.png" alt="Logotipo" style="width: auto; height: 28px;" /></a>
      </header>

      <main style="margin-top: 32px;">
        <h2 style="color: #4A5568; margin-bottom: 16px;">Olá {{name}},</h2>

        <p style="margin-top: 8px; line-height: 1.75; color: #718096;">
          Este é o seu código de verificação:
        </p>

        <div style="display: flex; align-items: center; margin-top: 16px; gap: 16px;">
          <p style="font-size: 24px; font-weight: 500; color: #4299E1; margin: 0;">
            {{token}}
          </p>
        </div>

        <p style="margin-top: 16px; line-height: 1.75; color: #718096;">
          Este código só será válido pelos próximos 2 minutos.
        </p>

        <p style="margin-top: 16px; color: #718096;">
          O Meu.CD nunca enviará e-mails solicitando que você divulgue sua senha, cartão de crédito ou número de conta bancária.
        </p>

        <p style="margin-top: 32px; color: #718096;">
          Atenciosamente, <br />
          Meu.CD
        </p>
      </main>

      <footer style="margin-top: 32px; border-top: 1px solid #E2E8F0; padding-top: 16px;">
        <p style="margin-top: 12px; color: #A0AEC0;">
          © {{currentYear}} Meu.CD. Todos os direitos reservados.
        </p>
      </footer>
    </section>
  </body>
</html>
`;
