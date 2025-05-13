const isValidCpf = (cpf: string) => {
  const cleanedCpf = cpf.replace(/\D/g, "");

  if (cleanedCpf.length !== 11 || /^(\d)\1+$/.test(cleanedCpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCpf.charAt(i)) * (10 - i);
  }

  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanedCpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCpf.charAt(i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanedCpf.charAt(10))) return false;

  return true;
};

// 65279999000103 cnpj de teste nao existe
// 45648390000149 cnpj de teste existe
// 09108439000107 cnpj de teste baixado
const isValidCnpj = async (cnpj: string) => {
  const cleanedCnpj = cnpj.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos

  const res = await fetch(
    `https://brasilapi.com.br/api/cnpj/v1/${cleanedCnpj}`,
  );

  const data = await res.json();

  if (!data.razao_social) {
    return { valid: false, message: "CNPJ não encontrado!" };
  }

  return { valid: true, razao_social: data.razao_social };
};

export { isValidCnpj, isValidCpf };
