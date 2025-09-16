import axios from 'axios';

export async function lookupCep(cep) {
  const cleaned = cep.replace(/\D/g,'');
  const resp = await axios.get(`https://viacep.com.br/ws/${cleaned}/json/`);
  if (resp.data.erro) throw new Error('CEP not found');
  return resp.data;
}
