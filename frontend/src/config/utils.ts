import { EditorDocumentType } from '../context/EditorProvider';
import { ulid } from 'ulid';
import { IsoDateString, type DocumentData } from '../types/pocketbase-types';

export const initPage = (pageNum: number): DocumentData => {
  const data = {
    pageNum: pageNum,
    pageData: {
      time: new Date().getTime(),
      blocks: [],
      version: '2.31.0-rc.7',
    },
  };
  return data;
};

export const initDocument = () => {
  const init: EditorDocumentType = {
    id: '',
    data: [initPage(1)],
    templateName: '',
    templateId: ulid(),
    reload: false,
  };

  return init;
};

export const toRegularCase = (str: string): string =>
  str
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const normalizeEvidenceType = (input: string): string =>
  input
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const formatToBrazilianDate = (isoDateStr: IsoDateString) => {
  const date = new Date(isoDateStr);

  return date
    .toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(', ', ' ');
};
