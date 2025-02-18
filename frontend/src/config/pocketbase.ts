import PocketBase, { type ListResult } from 'pocketbase';
import { type TemplatesRecord } from '../types/pocketbase-types';

const pb = new PocketBase(`${import.meta.env.VITE_POCKETBASE_URL}`);

export const uploadFileToPocketBase = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const record = await pb.collection('images').create(formData);
    return {
      success: 1,
      file: {
        url: `${pb.baseURL}/api/files/${record.collectionId}/${record.id}/${record.file}`,
      },
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: 0, message: 'Upload failed' };
  }
};

export const uploadImageUrlToPocketBase = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('file', blob, 'remote-image.jpg');

    const record = await pb.collection('images').create(formData);

    return {
      success: 1,
      file: {
        url: `${pb.baseURL}/api/files/${record.collectionId}/${record.id}/${record.file}`,
      },
    };
  } catch (error) {
    console.error('Error uploading image via URL:', error);
    return { success: 0, message: 'URL upload failed' };
  }
};

export const saveTemplate = async (input: TemplatesRecord) => {
  try {
    const record = await pb
      .collection('templates')
      .getFirstListItem(`templateId="${input.templateId}"`);

    if (record?.id) {
      await pb.collection('templates').update(record.id, input);
      console.log(`Template updated: ${record.id}`);
      return record;
    }
  } catch (error: any) {
    if (error.status === 404) {
      try {
        const newRecord = await pb.collection('templates').create(input);
        console.log(`Template created: ${newRecord.id}`);
        return newRecord;
      } catch (creationError) {
        console.error('Error creating new template:', creationError);
        throw creationError;
      }
    } else {
      console.error('Error saving template:', error);
      throw error;
    }
  }
};

export const getTemplate = async (templateId: string) => {
  try {
    const record: TemplatesRecord = await pb
      .collection('templates')
      .getFirstListItem(`templateId="${templateId}"`);
    return record;
  } catch (error) {
    console.error(error);
  }
};

export const getTemplateList = async () => {
  const records: ListResult<TemplatesRecord> = await pb
    .collection('templates')
    .getList(1, 50, { sort: '-updated' });

  return records;
};

export const deleteTemplate = async (templateId: string) => {
  try {
    await pb.collection('templates').delete(templateId);
  } catch (error) {
    console.log(error);
  }
};
