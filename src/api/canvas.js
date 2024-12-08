import { canvases } from './http';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

export function getCanvases(params) {
  const payload = Object.assign(
    { _sort: 'lastModified', _order: 'desc' },
    params,
  );
  return canvases.get('/', { params: payload });
}

export function createCanvases() {
  const newCanvas = {
    id: uuidv4().substring(0, 4),
    title: uuidv4().substring(0, 4) + '새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };

  return canvases.post('/', newCanvas);
}
