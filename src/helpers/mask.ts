const formatCpf = (cpf: string) => {
  const cleanedValue = cpf?.replace(/\D/g, ""); // remove caracteres não numéricos

  return cleanedValue
    ?.replace(/(\d{3})(\d)/, "$1.$2")
    ?.replace(/(\d{3})(\d)/, "$1.$2")
    ?.replace(/(\d{3})(\d{1,2})/, "$1-$2")
    ?.replace(/(-\d{2})\d+?$/, "$1");
};

const formatCnpj = (cnpj: string) => {
  const cleanedValue = cnpj?.replace(/\D/g, ""); // remove caracteres não numéricos

  return cleanedValue
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18);
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatCellPhone = (value: string) => {
  // Remove todos os caracteres que não são dígitos
  value = value.replace(/\D/g, "");

  // Aplica a máscara de celular
  if (value.length > 2 && value.length <= 7) {
    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else if (value.length > 7) {
    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  }

  // Limita o tamanho máximo do input em 11 caracteres
  return value.slice(0, 15);
};

const formatCamelCase = (str: string) => {
  const exceptions = ["da", "de", "do", "das", "dos", "e", "di", "del"];

  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      // Não aplicar exception à primeira palavra
      if (index > 0 && exceptions.includes(word)) {
        return word;
      }
      // Primeira letra maiúscula
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export {
  formatCamelCase,
  formatCellPhone,
  formatCnpj,
  formatCpf,
  formatCurrency,
};
