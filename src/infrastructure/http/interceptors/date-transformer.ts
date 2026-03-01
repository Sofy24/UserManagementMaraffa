import { TransformFnParams } from 'class-transformer';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

export function formatDate(params: TransformFnParams) {
  return format(new Date(params.value), 'dd/MM/yyyy HH:mm:ss', { locale: it });
}
